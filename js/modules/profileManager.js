/**
 * Profile Manager Module
 * Handles profile image switching, animations, and related functionality
 */

import { Utils } from '../core/utils.js';
import { ErrorHandler } from '../core/errorHandler.js';

export const ProfileManager = {
    // Configuration
    config: {
        switchInterval: 2000, // 2 seconds
        animationDuration: 400, // 0.4 seconds
        companyLogoSrc: 'https://media.githubusercontent.com/media/MKovacik/cv/main/img/DTE.DE-944bd2b4.png'
    },

    // State management
    state: {
        showingProfile: true,
        isAnimating: false,
        imageToggleInterval: null,
        profileImageSrc: null,
        profileImage: null
    },

    /**
     * Initializes the profile manager
     */
    init() {
        return ErrorHandler.wrapFunction(() => {
            this.setupProfileImage();
            this.setupCurrentYear();
            this.handleScreenSizeChange();
            this.setupEventListeners();
            
            // Initial screen size check
            this.handleScreenSizeChange();
        }, 'ProfileManager.init', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Sets up the profile image element and stores references
     */
    setupProfileImage() {
        // Try to find by ID first (index page), then by class (profile page)
        this.state.profileImage = Utils.safeGetElementById('profile-image');
        
        if (!this.state.profileImage) {
            // Try to find by class name if ID doesn't exist
            const profileImages = Utils.safeQuerySelectorAll('.profile-image');
            if (profileImages && profileImages.length > 0) {
                this.state.profileImage = profileImages[0];
            }
        }
        
        if (!this.state.profileImage) {
            // Not critical for profile page, just log and continue
            ErrorHandler.logError(
                'Profile image element not found - this is normal for pages without profile switching functionality',
                ErrorHandler.ErrorTypes.VALIDATION_ERROR,
                ErrorHandler.Severity.LOW,
                { context: 'ProfileManager.setupProfileImage' }
            );
            return; // Exit early, don't throw error
        }

        // Store original image source
        this.state.profileImageSrc = this.state.profileImage.src;
        
        if (!this.state.profileImageSrc) {
            ErrorHandler.logError(
                'Profile image source is empty',
                ErrorHandler.ErrorTypes.VALIDATION_ERROR,
                ErrorHandler.Severity.MEDIUM
            );
        }
    },

    /**
     * Sets the current year in the footer
     */
    setupCurrentYear() {
        const yearElement = Utils.safeGetElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        } else {
            ErrorHandler.logError(
                'Current year element not found',
                ErrorHandler.ErrorTypes.DOM_ERROR,
                ErrorHandler.Severity.LOW
            );
        }
    },

    /**
     * Sets up event listeners for window events
     */
    setupEventListeners() {
        // Window resize listener with debouncing
        const debouncedResize = Utils.debounce(() => {
            this.handleScreenSizeChange();
        }, 250);

        Utils.safeAddEventListener(window, 'resize', debouncedResize);
    },

    /**
     * Handles screen size changes and manages image switching
     */
    handleScreenSizeChange() {
        return ErrorHandler.wrapFunction(() => {
            this.addWhiteBackground();

            if (Utils.isMobileView()) {
                this.startImageToggle();
            } else {
                this.stopImageToggle();
                this.resetToProfileImage();
            }
        }, 'ProfileManager.handleScreenSizeChange', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Adds white background to profile image for better logo visibility on mobile
     */
    addWhiteBackground() {
        if (!this.state.profileImage) return;

        if (Utils.isMobileView()) {
            this.state.profileImage.style.backgroundColor = '#ffffff';
        } else {
            this.state.profileImage.style.backgroundColor = '';
        }
    },

    /**
     * Starts the image toggle interval for mobile view
     */
    startImageToggle() {
        if (this.state.imageToggleInterval) return; // Already running

        this.state.imageToggleInterval = setInterval(() => {
            this.toggleProfileImage();
        }, this.config.switchInterval);
    },

    /**
     * Stops the image toggle interval
     */
    stopImageToggle() {
        if (this.state.imageToggleInterval) {
            clearInterval(this.state.imageToggleInterval);
            this.state.imageToggleInterval = null;
        }
    },

    /**
     * Resets to the original profile image
     */
    resetToProfileImage() {
        if (!this.state.profileImage || !this.state.profileImageSrc) return;

        this.state.profileImage.src = this.state.profileImageSrc;
        this.state.profileImage.alt = "Michal Kováčik";
        this.state.profileImage.classList.remove('company-logo-view');
        this.state.showingProfile = true;
    },

    /**
     * Toggles between profile image and company logo with animation
     */
    toggleProfileImage() {
        return ErrorHandler.wrapFunction(() => {
            if (!Utils.isMobileView() || 
                this.state.isAnimating || 
                !this.state.profileImage) {
                return;
            }

            this.state.isAnimating = true;

            // Fade out
            this.state.profileImage.style.opacity = '0';

            // Change the image when faded out
            Utils.safeTimeout(() => {
                this.switchImageSource();
                
                // Fade in
                Utils.safeTimeout(() => {
                    this.state.profileImage.style.opacity = '1';
                    
                    // Reset animation state after fade completes
                    Utils.safeTimeout(() => {
                        this.state.isAnimating = false;
                        this.state.showingProfile = !this.state.showingProfile;
                    }, this.config.animationDuration, 'ProfileManager.fadeInComplete');
                    
                }, 50, 'ProfileManager.fadeIn');
                
            }, this.config.animationDuration, 'ProfileManager.switchImage');
            
        }, 'ProfileManager.toggleProfileImage', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Switches the image source between profile and company logo
     */
    switchImageSource() {
        if (!this.state.profileImage) return;

        if (this.state.showingProfile) {
            // Switch to company logo
            this.state.profileImage.src = this.config.companyLogoSrc;
            this.state.profileImage.alt = "Deutsche Telekom Logo";
            this.state.profileImage.classList.add('company-logo-view');
        } else {
            // Switch back to profile image
            this.state.profileImage.src = this.state.profileImageSrc;
            this.state.profileImage.alt = "Michal Kováčik";
            this.state.profileImage.classList.remove('company-logo-view');
        }
    },

    /**
     * Gets the current image state
     * @returns {Object} - Current state information
     */
    getState() {
        return {
            showingProfile: this.state.showingProfile,
            isAnimating: this.state.isAnimating,
            isMobile: Utils.isMobileView(),
            intervalActive: !!this.state.imageToggleInterval
        };
    },

    /**
     * Manually triggers image toggle (for external use)
     */
    manualToggle() {
        if (Utils.isMobileView()) {
            this.toggleProfileImage();
        }
    },

    /**
     * Destroys the profile manager and cleans up resources
     */
    destroy() {
        this.stopImageToggle();
        this.resetToProfileImage();
        
        // Clear references
        this.state.profileImage = null;
        this.state.profileImageSrc = null;
    }
};