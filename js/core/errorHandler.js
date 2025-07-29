/**
 * Centralized error handling system for the CV website
 * Provides consistent error logging and user feedback
 */

export const ErrorHandler = {
    /**
     * Error types for categorization
     */
    ErrorTypes: {
        DOM_ERROR: 'DOM_ERROR',
        NETWORK_ERROR: 'NETWORK_ERROR',
        VALIDATION_ERROR: 'VALIDATION_ERROR',
        RUNTIME_ERROR: 'RUNTIME_ERROR',
        USER_ERROR: 'USER_ERROR'
    },

    /**
     * Error severity levels
     */
    Severity: {
        LOW: 'low',
        MEDIUM: 'medium',
        HIGH: 'high',
        CRITICAL: 'critical'
    },

    /**
     * Configuration for error handling
     */
    config: {
        enableConsoleLogging: true,
        enableUserNotification: false, // Set to true if you want user notifications
        maxRetries: 3,
        retryDelay: 1000
    },

    /**
     * Logs an error with context information
     * @param {Error|string} error - Error object or message
     * @param {string} type - Error type from ErrorTypes
     * @param {string} severity - Error severity from Severity
     * @param {Object} context - Additional context information
     */
    logError(error, type = this.ErrorTypes.RUNTIME_ERROR, severity = this.Severity.MEDIUM, context = {}) {
        const errorData = {
            timestamp: new Date().toISOString(),
            type,
            severity,
            message: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : null,
            context,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        if (this.config.enableConsoleLogging) {
            const logMethod = this._getLogMethod(severity);
            console[logMethod]('CV Error:', errorData);
        }

        // Store error for potential analytics or debugging
        this._storeError(errorData);

        // Show user notification if enabled and severity is high
        if (this.config.enableUserNotification && 
            (severity === this.Severity.HIGH || severity === this.Severity.CRITICAL)) {
            this._showUserNotification(errorData);
        }
    },

    /**
     * Wraps a function with error handling
     * @param {Function} fn - Function to wrap
     * @param {string} context - Context description
     * @param {string} errorType - Error type for categorization
     * @returns {Function} - Wrapped function
     */
    wrapFunction(fn, context = 'Unknown', errorType = this.ErrorTypes.RUNTIME_ERROR) {
        return (...args) => {
            try {
                return fn.apply(this, args);
            } catch (error) {
                this.logError(error, errorType, this.Severity.MEDIUM, { 
                    context, 
                    functionName: fn.name || 'anonymous',
                    arguments: args 
                });
                return null;
            }
        };
    },

    /**
     * Wraps an async function with error handling
     * @param {Function} fn - Async function to wrap
     * @param {string} context - Context description
     * @param {string} errorType - Error type for categorization
     * @returns {Function} - Wrapped async function
     */
    wrapAsyncFunction(fn, context = 'Unknown', errorType = this.ErrorTypes.RUNTIME_ERROR) {
        return async (...args) => {
            try {
                return await fn.apply(this, args);
            } catch (error) {
                this.logError(error, errorType, this.Severity.MEDIUM, { 
                    context, 
                    functionName: fn.name || 'anonymous',
                    arguments: args 
                });
                return null;
            }
        };
    },

    /**
     * Retries a function with exponential backoff
     * @param {Function} fn - Function to retry
     * @param {number} maxRetries - Maximum number of retries
     * @param {number} delay - Initial delay between retries
     * @param {string} context - Context for error logging
     * @returns {Promise} - Promise that resolves with function result
     */
    async retryFunction(fn, maxRetries = this.config.maxRetries, delay = this.config.retryDelay, context = 'Unknown') {
        let lastError;
        
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                
                if (attempt === maxRetries) {
                    this.logError(error, this.ErrorTypes.RUNTIME_ERROR, this.Severity.HIGH, {
                        context,
                        attempt: attempt + 1,
                        totalAttempts: maxRetries + 1
                    });
                    throw error;
                }

                // Wait before retrying with exponential backoff
                await this._delay(delay * Math.pow(2, attempt));
                
                this.logError(error, this.ErrorTypes.RUNTIME_ERROR, this.Severity.LOW, {
                    context,
                    attempt: attempt + 1,
                    retrying: true
                });
            }
        }
        
        throw lastError;
    },

    /**
     * Validates function parameters
     * @param {Array} params - Parameters to validate
     * @param {Array} validators - Array of validator objects
     * @throws {Error} - Throws validation error if parameters are invalid
     */
    validateParameters(params, validators) {
        validators.forEach((validator, index) => {
            const param = params[index];
            const { name, type, required = false, validator: customValidator } = validator;

            if (required && (param === undefined || param === null)) {
                throw new Error(`Required parameter "${name}" is missing`);
            }

            if (param !== undefined && param !== null) {
                if (type && typeof param !== type) {
                    throw new Error(`Parameter "${name}" must be of type ${type}, got ${typeof param}`);
                }

                if (customValidator && !customValidator(param)) {
                    throw new Error(`Parameter "${name}" failed custom validation`);
                }
            }
        });
    },

    /**
     * Creates a safe DOM operation wrapper
     * @param {Function} operation - DOM operation to perform
     * @param {string} context - Context description
     * @returns {*} - Operation result or null on error
     */
    safeDOMOperation(operation, context = 'DOM Operation') {
        try {
            if (document.readyState === 'loading') {
                throw new Error('DOM not ready for operation');
            }
            return operation();
        } catch (error) {
            this.logError(error, this.ErrorTypes.DOM_ERROR, this.Severity.MEDIUM, { context });
            return null;
        }
    },

    /**
     * Gets appropriate log method based on severity
     * @param {string} severity - Error severity
     * @returns {string} - Console method name
     */
    _getLogMethod(severity) {
        switch (severity) {
            case this.Severity.CRITICAL:
            case this.Severity.HIGH:
                return 'error';
            case this.Severity.MEDIUM:
                return 'warn';
            case this.Severity.LOW:
            default:
                return 'log';
        }
    },

    /**
     * Stores error data for debugging purposes
     * @param {Object} errorData - Error data to store
     */
    _storeError(errorData) {
        try {
            // Store in sessionStorage for debugging (max 10 errors)
            const stored = JSON.parse(sessionStorage.getItem('cv_errors') || '[]');
            stored.push(errorData);
            
            // Keep only the last 10 errors
            if (stored.length > 10) {
                stored.shift();
            }
            
            sessionStorage.setItem('cv_errors', JSON.stringify(stored));
        } catch (e) {
            // Ignore storage errors
            console.warn('Could not store error data:', e);
        }
    },

    /**
     * Shows user notification for critical errors
     * @param {Object} errorData - Error data
     */
    _showUserNotification(errorData) {
        // Simple user notification - could be enhanced with a toast system
        console.info('User notification would be shown for:', errorData.message);
    },

    /**
     * Creates a delay promise
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} - Promise that resolves after delay
     */
    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Gets stored errors for debugging
     * @returns {Array} - Array of stored errors
     */
    getStoredErrors() {
        try {
            return JSON.parse(sessionStorage.getItem('cv_errors') || '[]');
        } catch (e) {
            return [];
        }
    },

    /**
     * Clears stored errors
     */
    clearStoredErrors() {
        try {
            sessionStorage.removeItem('cv_errors');
        } catch (e) {
            // Ignore storage errors
        }
    }
};