/**
 * UI Manager Module
 * Handles general UI functionality like animations, scroll indicators, and download buttons
 */

import { Utils } from '../core/utils.js';
import { ErrorHandler } from '../core/errorHandler.js';

export const UIManager = {
    // Configuration
    config: {
        animationDelays: {
            skillTags: 100,
            skillTagsStagger: 50,
            experienceItems: 300,
            experienceStagger: 150,
            positions: 400,
            positionStagger: 100
        },
        scrollIndicatorHeight: 3
    },

    // State management
    state: {
        scrollIndicator: null,
        downloadButton: null,
        animationsInitialized: false
    },

    /**
     * Initializes the UI manager
     */
    init() {
        return ErrorHandler.wrapFunction(() => {
            this.createScrollIndicator();
            this.createDownloadButton();
            this.setupAnimations();
            this.setupScrollEvents();
            this.injectStyles();
        }, 'UIManager.init', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Creates and sets up the scroll progress indicator
     */
    createScrollIndicator() {
        this.state.scrollIndicator = Utils.createElement('div', {
            className: 'scroll-indicator'
        });

        if (!this.state.scrollIndicator) {
            throw new Error('Failed to create scroll indicator');
        }

        document.body.appendChild(this.state.scrollIndicator);
    },

    /**
     * Creates and sets up the download CV button
     */
    createDownloadButton() {
        this.state.downloadButton = Utils.createElement('button', {
            id: 'download-button',
            className: 'download-button'
        }, 'Download CV');

        if (!this.state.downloadButton) {
            throw new Error('Failed to create download button');
        }

        Utils.safeAddEventListener(this.state.downloadButton, 'click', () => {
            this.handleDownloadClick();
        });

        document.body.appendChild(this.state.downloadButton);
    },

    /**
     * Handles the download button click event
     */
    handleDownloadClick() {
        return ErrorHandler.wrapFunction(() => {
            // Import achievements manager to handle printing
            import('./achievementsManager.js').then(({ AchievementsManager }) => {
                // Temporarily show all achievements sections for printing
                const originalStates = AchievementsManager.showAllAchievements();
                
                // Print the document
                window.print();
                
                // Restore original states after printing
                Utils.safeTimeout(() => {
                    AchievementsManager.restoreAchievementStates(originalStates);
                }, 1000, 'UIManager.restoreAfterPrint');
            }).catch(error => {
                ErrorHandler.logError(
                    error,
                    ErrorHandler.ErrorTypes.RUNTIME_ERROR,
                    ErrorHandler.Severity.MEDIUM,
                    { context: 'Dynamic import of AchievementsManager failed' }
                );
                
                // Fallback: just print
                window.print();
            });
        }, 'UIManager.handleDownloadClick', ErrorHandler.ErrorTypes.RUNTIME_ERROR)();
    },

    /**
     * Sets up scroll-related event handlers
     */
    setupScrollEvents() {
        const updateScrollIndicator = Utils.debounce(() => {
            this.updateScrollIndicator();
        }, 16); // ~60fps

        Utils.safeAddEventListener(window, 'scroll', updateScrollIndicator);
    },

    /**
     * Updates the scroll progress indicator
     */
    updateScrollIndicator() {
        if (!this.state.scrollIndicator) return;

        return ErrorHandler.wrapFunction(() => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
            
            this.state.scrollIndicator.style.width = `${Math.min(scrolled, 100)}%`;
            this.state.scrollIndicator.style.background = 'var(--primary-color)';
        }, 'UIManager.updateScrollIndicator', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Sets up page animations for various elements
     */
    setupAnimations() {
        if (this.state.animationsInitialized) return;

        this.animateSkillTags();
        this.animateExperienceItems();
        this.animatePositions();
        
        this.state.animationsInitialized = true;
    },

    /**
     * Animates skill tags with staggered entrance
     */
    animateSkillTags() {
        const skillTags = Utils.safeQuerySelectorAll('.skill-tag');
        
        if (!skillTags) return;

        skillTags.forEach((tag, index) => {
            // Set initial state
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            // Animate with delay
            Utils.safeTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, this.config.animationDelays.skillTags + (index * this.config.animationDelays.skillTagsStagger),
            'UIManager.animateSkillTag');
        });
    },

    /**
     * Animates experience items
     */
    animateExperienceItems() {
        const experienceItems = Utils.safeQuerySelectorAll('.experience-item');
        
        if (!experienceItems) return;

        experienceItems.forEach((item, index) => {
            // Set initial state
            item.style.opacity = '0';
            item.style.transition = 'opacity 0.5s ease';
            
            // Animate with delay
            Utils.safeTimeout(() => {
                item.style.opacity = '1';
            }, this.config.animationDelays.experienceItems + (index * this.config.animationDelays.experienceStagger),
            'UIManager.animateExperienceItem');
        });
    },

    /**
     * Animates position elements within experience items
     */
    animatePositions() {
        const positions = Utils.safeQuerySelectorAll('.position');
        
        if (!positions) return;

        positions.forEach((position, index) => {
            // Set initial state
            position.style.opacity = '0';
            position.style.transition = 'opacity 0.4s ease';
            
            // Animate with delay
            Utils.safeTimeout(() => {
                position.style.opacity = '1';
            }, this.config.animationDelays.positions + (index * this.config.animationDelays.positionStagger),
            'UIManager.animatePosition');
        });
    },

    /**
     * Injects required CSS styles
     */
    injectStyles() {
        const styleElement = Utils.createElement('style');
        if (!styleElement) return;

        styleElement.textContent = `
            .scroll-indicator {
                position: fixed;
                top: 0;
                left: 0;
                height: ${this.config.scrollIndicatorHeight}px;
                width: 0;
                z-index: 9999;
            }
            
            .print-button, .download-button {
                position: fixed;
                z-index: 1000;
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                font-weight: 500;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 14px;
            }
            
            .print-button {
                bottom: 20px;
                right: 20px;
                background-color: var(--primary-color);
                color: white;
            }
            
            .download-button {
                bottom: 20px;
                right: 130px;
                background: white;
                color: var(--primary-color);
                border: 1px solid var(--primary-color);
            }
            
            .print-button:hover, .download-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(226, 0, 116, 0.2);
            }
            
            @media print {
                .print-button, .download-button, .scroll-indicator {
                    display: none !important;
                }
            }
        `;

        document.head.appendChild(styleElement);
    },

    /**
     * Gets current UI state
     * @returns {Object} - Current UI state
     */
    getState() {
        return {
            scrollIndicatorExists: !!this.state.scrollIndicator,
            downloadButtonExists: !!this.state.downloadButton,
            animationsInitialized: this.state.animationsInitialized,
            currentScrollPercentage: this.getCurrentScrollPercentage()
        };
    },

    /**
     * Gets current scroll percentage
     * @returns {number} - Scroll percentage (0-100)
     */
    getCurrentScrollPercentage() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return windowHeight > 0 ? Math.min((window.scrollY / windowHeight) * 100, 100) : 0;
    },

    /**
     * Manually triggers animations (useful for dynamic content)
     */
    triggerAnimations() {
        this.setupAnimations();
    },

    /**
     * Resets all animations
     */
    resetAnimations() {
        this.state.animationsInitialized = false;
        
        // Reset skill tags
        const skillTags = Utils.safeQuerySelectorAll('.skill-tag');
        if (skillTags) {
            skillTags.forEach(tag => {
                tag.style.opacity = '';
                tag.style.transform = '';
                tag.style.transition = '';
            });
        }

        // Reset experience items
        const experienceItems = Utils.safeQuerySelectorAll('.experience-item');
        if (experienceItems) {
            experienceItems.forEach(item => {
                item.style.opacity = '';
                item.style.transition = '';
            });
        }

        // Reset positions
        const positions = Utils.safeQuerySelectorAll('.position');
        if (positions) {
            positions.forEach(position => {
                position.style.opacity = '';
                position.style.transition = '';
            });
        }
    },

    /**
     * Destroys the UI manager and cleans up resources
     */
    destroy() {
        // Remove created elements
        if (this.state.scrollIndicator && this.state.scrollIndicator.parentNode) {
            this.state.scrollIndicator.parentNode.removeChild(this.state.scrollIndicator);
        }
        
        if (this.state.downloadButton && this.state.downloadButton.parentNode) {
            this.state.downloadButton.parentNode.removeChild(this.state.downloadButton);
        }

        // Clear references
        this.state.scrollIndicator = null;
        this.state.downloadButton = null;
        this.state.animationsInitialized = false;
    }
};