/**
 * Achievements Manager Module
 * Handles achievements toggle functionality with hover and click behavior
 */

import { Utils } from '../core/utils.js';
import { ErrorHandler } from '../core/errorHandler.js';

export const AchievementsManager = {
    // Configuration
    config: {
        animationDelay: 50,
        animationStagger: 80,
        icons: {
            default: '<i class="fas fa-trophy"></i> Achievements',
            pin: '<i class="fas fa-thumbtack"></i> Pin View',
            unpin: '<i class="fas fa-thumbtack"></i> Unpin'
        }
    },

    // State management
    state: {
        toggles: new Map(),
        isTouch: false
    },

    /**
     * Initializes the achievements manager
     */
    init() {
        return ErrorHandler.wrapFunction(() => {
            this.detectTouchDevice();
            this.setupAchievementToggles();
            this.initializeToggleStates();
        }, 'AchievementsManager.init', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Detects if the device is touch-enabled
     */
    detectTouchDevice() {
        this.state.isTouch = Utils.isTouchDevice();
    },

    /**
     * Sets up all achievement toggles found in the document
     */
    setupAchievementToggles() {
        const achievementToggles = Utils.safeQuerySelectorAll('.achievements-toggle');
        
        if (!achievementToggles || achievementToggles.length === 0) {
            ErrorHandler.logError(
                'No achievement toggles found',
                ErrorHandler.ErrorTypes.DOM_ERROR,
                ErrorHandler.Severity.LOW
            );
            return;
        }

        achievementToggles.forEach(toggle => {
            this.setupSingleToggle(toggle);
        });
    },

    /**
     * Sets up a single achievement toggle
     * @param {HTMLElement} toggle - The toggle element
     */
    setupSingleToggle(toggle) {
        const achievementsSection = toggle.nextElementSibling;
        
        if (!achievementsSection) {
            ErrorHandler.logError(
                'Achievement section not found for toggle',
                ErrorHandler.ErrorTypes.DOM_ERROR,
                ErrorHandler.Severity.MEDIUM
            );
            return;
        }

        // Initialize toggle state
        const toggleState = {
            element: toggle,
            section: achievementsSection,
            isPinned: false
        };

        this.state.toggles.set(toggle, toggleState);

        // Set up event listeners based on device type
        if (!this.state.isTouch) {
            this.setupDesktopBehavior(toggleState);
        }

        // Set up click behavior (works for both desktop and mobile)
        this.setupClickBehavior(toggleState);
    },

    /**
     * Sets up desktop-specific hover behavior
     * @param {Object} toggleState - Toggle state object
     */
    setupDesktopBehavior(toggleState) {
        const { element: toggle, section: achievementsSection } = toggleState;

        // Show on hover
        Utils.safeAddEventListener(toggle, 'mouseenter', () => {
            if (!toggleState.isPinned) {
                this.showAchievements(toggleState, false);
            }
        });

        // Hide on mouse leave if not pinned
        Utils.safeAddEventListener(toggle, 'mouseleave', () => {
            if (!toggleState.isPinned) {
                this.hideAchievements(toggleState);
            }
        });
    },

    /**
     * Sets up click behavior for pin/unpin functionality
     * @param {Object} toggleState - Toggle state object
     */
    setupClickBehavior(toggleState) {
        Utils.safeAddEventListener(toggleState.element, 'click', (e) => {
            e.preventDefault();
            this.togglePin(toggleState);
        });
    },

    /**
     * Shows achievements with animation
     * @param {Object} toggleState - Toggle state object
     * @param {boolean} isPinning - Whether this is a pinning action
     */
    showAchievements(toggleState, isPinning = false) {
        return ErrorHandler.wrapFunction(() => {
            const { element: toggle, section: achievementsSection } = toggleState;

            achievementsSection.classList.add('active');
            
            if (isPinning) {
                toggle.classList.add('active');
                toggle.innerHTML = this.config.icons.unpin;
            } else {
                toggle.innerHTML = this.config.icons.pin;
            }

            this.animateAchievements(achievementsSection);
        }, 'AchievementsManager.showAchievements', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Hides achievements
     * @param {Object} toggleState - Toggle state object
     */
    hideAchievements(toggleState) {
        return ErrorHandler.wrapFunction(() => {
            const { element: toggle, section: achievementsSection } = toggleState;

            achievementsSection.classList.remove('active');
            toggle.classList.remove('active');
            toggle.innerHTML = this.config.icons.default;
        }, 'AchievementsManager.hideAchievements', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Toggles the pin state of achievements
     * @param {Object} toggleState - Toggle state object
     */
    togglePin(toggleState) {
        return ErrorHandler.wrapFunction(() => {
            toggleState.isPinned = !toggleState.isPinned;

            if (toggleState.isPinned) {
                this.showAchievements(toggleState, true);
            } else {
                this.hideAchievements(toggleState);
            }
        }, 'AchievementsManager.togglePin', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Animates individual achievement items
     * @param {HTMLElement} achievementsSection - The achievements section
     */
    animateAchievements(achievementsSection) {
        return ErrorHandler.wrapFunction(() => {
            const achievementItems = Utils.safeQuerySelectorAll('.achievements-list li', achievementsSection);
            
            if (!achievementItems) return;

            achievementItems.forEach((item, index) => {
                // Reset styles
                item.style.opacity = '0';
                item.style.transform = 'translateX(-10px)';
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

                // Animate with stagger
                Utils.safeTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, this.config.animationDelay + (index * this.config.animationStagger), 
                'AchievementsManager.animateItem');
            });
        }, 'AchievementsManager.animateAchievements', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Initializes all toggles with default state
     */
    initializeToggleStates() {
        this.state.toggles.forEach((toggleState) => {
            toggleState.element.innerHTML = this.config.icons.default;
        });
    },

    /**
     * Shows all achievements (for printing)
     */
    showAllAchievements() {
        return ErrorHandler.wrapFunction(() => {
            const achievementsSections = Utils.safeQuerySelectorAll('.achievements-section');
            const achievementToggles = Utils.safeQuerySelectorAll('.achievements-toggle');
            
            // Store original states
            const originalStates = [];
            
            if (achievementsSections) {
                achievementsSections.forEach((section, index) => {
                    const toggle = achievementToggles && achievementToggles[index];
                    
                    originalStates.push({
                        sectionHasActiveClass: section.classList.contains('active'),
                        toggleHasActiveClass: toggle ? toggle.classList.contains('active') : false,
                        toggleHTML: toggle ? toggle.innerHTML : ''
                    });
                    
                    // Make all achievements visible
                    section.classList.add('print-visible');
                });
            }
            
            return originalStates;
        }, 'AchievementsManager.showAllAchievements', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Restores achievement states after showing all
     * @param {Array} originalStates - Array of original states
     */
    restoreAchievementStates(originalStates) {
        return ErrorHandler.wrapFunction(() => {
            const achievementsSections = Utils.safeQuerySelectorAll('.achievements-section');
            const achievementToggles = Utils.safeQuerySelectorAll('.achievements-toggle');
            
            if (achievementsSections && originalStates) {
                achievementsSections.forEach((section, index) => {
                    section.classList.remove('print-visible');
                    
                    const state = originalStates[index];
                    if (!state) return;
                    
                    // Restore original state
                    if (!state.sectionHasActiveClass) {
                        section.classList.remove('active');
                    }
                    
                    const toggle = achievementToggles && achievementToggles[index];
                    if (toggle) {
                        if (!state.toggleHasActiveClass) {
                            toggle.classList.remove('active');
                        }
                        toggle.innerHTML = state.toggleHTML;
                    }
                });
            }
        }, 'AchievementsManager.restoreAchievementStates', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Gets the current state of all toggles
     * @returns {Array} - Array of toggle states
     */
    getAllStates() {
        const states = [];
        this.state.toggles.forEach((toggleState, toggle) => {
            states.push({
                element: toggle,
                isPinned: toggleState.isPinned,
                isActive: toggleState.section.classList.contains('active')
            });
        });
        return states;
    },

    /**
     * Resets all toggles to their default state
     */
    resetAllToggles() {
        this.state.toggles.forEach((toggleState) => {
            toggleState.isPinned = false;
            this.hideAchievements(toggleState);
        });
    },

    /**
     * Destroys the achievements manager and cleans up resources
     */
    destroy() {
        this.state.toggles.clear();
        this.state.isTouch = false;
    }
};