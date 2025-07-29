/**
 * Main Application Module
 * Initializes and coordinates all website functionality
 */

import { Utils } from './utils.js';
import { ErrorHandler } from './errorHandler.js';
import { ProfileManager } from '../modules/profileManager.js';
import { GalleryManager } from '../modules/galleryManager.js';
import { AchievementsManager } from '../modules/achievementsManager.js';
import { UIManager } from '../modules/uiManager.js';
import { TourGuideManager } from '../modules/tourGuideManager.js';

/**
 * Main Application Class
 * Manages the initialization and lifecycle of all website modules
 */
class CVApplication {
    constructor() {
        this.modules = new Map();
        this.isInitialized = false;
        this.initializationPromise = null;
    }

    /**
     * Initializes the application
     * @returns {Promise} - Promise that resolves when initialization is complete
     */
    async init() {
        if (this.isInitialized) {
            return this.initializationPromise;
        }

        if (this.initializationPromise) {
            return this.initializationPromise;
        }

        this.initializationPromise = this._performInitialization();
        return this.initializationPromise;
    }

    /**
     * Performs the actual initialization
     * @private
     */
    async _performInitialization() {
        try {
            console.log('🚀 Starting CV Application initialization...');

            // Wait for DOM to be ready
            await this._waitForDOM();

            // Initialize core modules
            await this._initializeModules();

            // Set up global error handlers
            this._setupGlobalErrorHandlers();

            // Mark as initialized
            this.isInitialized = true;

            console.log('✅ CV Application initialization complete');

            // Trigger a custom event for any external listeners
            this._dispatchInitializationEvent();

        } catch (error) {
            ErrorHandler.logError(
                error,
                ErrorHandler.ErrorTypes.RUNTIME_ERROR,
                ErrorHandler.Severity.CRITICAL,
                { context: 'Application initialization failed' }
            );
            throw error;
        }
    }

    /**
     * Waits for the DOM to be ready
     * @private
     * @returns {Promise} - Promise that resolves when DOM is ready
     */
    _waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve, { once: true });
            } else {
                resolve();
            }
        });
    }

    /**
     * Initializes all application modules
     * @private
     */
    async _initializeModules() {
        const moduleInitializers = [
            { name: 'ProfileManager', instance: ProfileManager, dependencies: [] },
            { name: 'UIManager', instance: UIManager, dependencies: [] },
            { name: 'AchievementsManager', instance: AchievementsManager, dependencies: [] },
            { name: 'GalleryManager', instance: GalleryManager, dependencies: [] },
            { name: 'TourGuideManager', instance: TourGuideManager, dependencies: [] }
        ];

        for (const { name, instance, dependencies } of moduleInitializers) {
            try {
                // Check dependencies
                if (dependencies.length > 0 && !Utils.validateDependencies(dependencies)) {
                    throw new Error(`Missing dependencies for ${name}: ${dependencies.join(', ')}`);
                }

                // Initialize module
                console.log(`🔧 Initializing ${name}...`);
                
                const result = instance.init();
                
                // Handle both sync and async initialization
                if (result instanceof Promise) {
                    await result;
                }

                this.modules.set(name, instance);
                console.log(`✅ ${name} initialized successfully`);

            } catch (error) {
                ErrorHandler.logError(
                    error,
                    ErrorHandler.ErrorTypes.RUNTIME_ERROR,
                    ErrorHandler.Severity.HIGH,
                    { context: `${name} initialization failed` }
                );
                
                // Continue with other modules even if one fails
                console.warn(`⚠️ ${name} initialization failed, continuing with other modules`);
            }
        }
    }

    /**
     * Sets up global error handlers
     * @private
     */
    _setupGlobalErrorHandlers() {
        // Module-specific error recovery
        window.addEventListener('error', (event) => {
            // Check if any modules need to be recovered
            this._attemptModuleRecovery(event.error);
        });

        // Network error handler
        window.addEventListener('online', () => {
            console.log('🌐 Network connection restored');
            this._onNetworkRestore();
        });

        window.addEventListener('offline', () => {
            console.log('🌐 Network connection lost');
            this._onNetworkLoss();
        });
    }

    /**
     * Attempts to recover failed modules
     * @private
     * @param {Error} error - The error that occurred
     */
    _attemptModuleRecovery(error) {
        // Simple recovery strategy: reinitialize modules if they seem to have failed
        const errorMessage = error.message.toLowerCase();
        
        if (errorMessage.includes('gallery') && this.modules.has('GalleryManager')) {
            this._recoverModule('GalleryManager', GalleryManager);
        } else if (errorMessage.includes('profile') && this.modules.has('ProfileManager')) {
            this._recoverModule('ProfileManager', ProfileManager);
        } else if (errorMessage.includes('achievement') && this.modules.has('AchievementsManager')) {
            this._recoverModule('AchievementsManager', AchievementsManager);
        }
    }

    /**
     * Recovers a specific module
     * @private
     * @param {string} moduleName - Name of the module to recover
     * @param {Object} moduleInstance - Module instance to recover
     */
    _recoverModule(moduleName, moduleInstance) {
        ErrorHandler.retryFunction(
            () => moduleInstance.init(),
            2, // max retries
            1000, // delay
            `${moduleName} recovery`
        ).catch(error => {
            ErrorHandler.logError(
                error,
                ErrorHandler.ErrorTypes.RUNTIME_ERROR,
                ErrorHandler.Severity.HIGH,
                { context: `${moduleName} recovery failed` }
            );
        });
    }

    /**
     * Handles network restoration
     * @private
     */
    _onNetworkRestore() {
        // Refresh any network-dependent modules
        this.modules.forEach((module, name) => {
            if (module.onNetworkRestore && typeof module.onNetworkRestore === 'function') {
                Utils.safeExecute(module.onNetworkRestore, [], `${name}.onNetworkRestore`);
            }
        });
    }

    /**
     * Handles network loss
     * @private
     */
    _onNetworkLoss() {
        // Notify modules of network loss
        this.modules.forEach((module, name) => {
            if (module.onNetworkLoss && typeof module.onNetworkLoss === 'function') {
                Utils.safeExecute(module.onNetworkLoss, [], `${name}.onNetworkLoss`);
            }
        });
    }

    /**
     * Dispatches initialization complete event
     * @private
     */
    _dispatchInitializationEvent() {
        const event = new CustomEvent('cvApplicationReady', {
            detail: {
                modules: Array.from(this.modules.keys()),
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(event);
    }

    /**
     * Gets a specific module instance
     * @param {string} moduleName - Name of the module
     * @returns {Object|null} - Module instance or null if not found
     */
    getModule(moduleName) {
        return this.modules.get(moduleName) || null;
    }

    /**
     * Gets all initialized modules
     * @returns {Map} - Map of all modules
     */
    getAllModules() {
        return new Map(this.modules);
    }

    /**
     * Gets application status
     * @returns {Object} - Application status information
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            moduleCount: this.modules.size,
            modules: Array.from(this.modules.keys()),
            errors: ErrorHandler.getStoredErrors()
        };
    }

    /**
     * Reinitializes a specific module
     * @param {string} moduleName - Name of the module to reinitialize
     * @returns {Promise} - Promise that resolves when reinitialization is complete
     */
    async reinitializeModule(moduleName) {
        const moduleInstance = this.modules.get(moduleName);
        if (!moduleInstance) {
            throw new Error(`Module ${moduleName} not found`);
        }

        try {
            // Destroy if possible
            if (moduleInstance.destroy && typeof moduleInstance.destroy === 'function') {
                await moduleInstance.destroy();
            }

            // Reinitialize
            const result = moduleInstance.init();
            if (result instanceof Promise) {
                await result;
            }

            console.log(`🔄 ${moduleName} reinitialized successfully`);
            return true;

        } catch (error) {
            ErrorHandler.logError(
                error,
                ErrorHandler.ErrorTypes.RUNTIME_ERROR,
                ErrorHandler.Severity.HIGH,
                { context: `${moduleName} reinitialization failed` }
            );
            throw error;
        }
    }

    /**
     * Destroys the application and cleans up all modules
     */
    async destroy() {
        console.log('🔄 Destroying CV Application...');

        // Destroy all modules
        for (const [name, module] of this.modules) {
            try {
                if (module.destroy && typeof module.destroy === 'function') {
                    await module.destroy();
                }
                console.log(`✅ ${name} destroyed`);
            } catch (error) {
                console.warn(`⚠️ Error destroying ${name}:`, error);
            }
        }

        // Clear modules
        this.modules.clear();
        this.isInitialized = false;
        this.initializationPromise = null;

        console.log('✅ CV Application destroyed');
    }
}

// Create and initialize the application
const cvApp = new CVApplication();

// Initialize when DOM is ready
cvApp.init().catch(error => {
    console.error('Failed to initialize CV Application:', error);
});

// Make the app instance available globally for debugging
window.cvApp = cvApp;

// Export for module usage
export default cvApp;