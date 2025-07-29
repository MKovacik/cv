/**
 * Tour Guide Manager Module
 * Provides interactive guidance for website features
 */

import { Utils } from '../core/utils.js';
import { ErrorHandler } from '../core/errorHandler.js';

export const TourGuideManager = {
    // Configuration
    config: {
        features: [
            {
                id: 'achievements',
                selector: '.achievements-toggle',
                title: 'View Achievements',
                description: 'Click these buttons to expand detailed achievements for each position.',
                position: 'top-left'
            },
            {
                id: 'gallery',
                selector: '.gallery-icon',
                title: 'Photo Galleries',
                description: 'Hover over these icons to see photos from conferences and events.',
                position: 'top-right'
            },
            {
                id: 'skills',
                selector: '#skills .skill-tag',
                title: 'Interactive Skills',
                description: 'Hover over skill tags to see animations and interactions.',
                position: 'bottom'
            },
            {
                id: 'download',
                selector: '.download-button',
                title: 'Download CV',
                description: 'Click to print or save the CV as PDF.',
                position: 'left'
            }
        ]
    },

    // State management
    state: {
        isActive: false,
        currentStep: 0,
        helpButton: null,
        tooltipContainer: null,
        indicators: [],
        hasBeenShown: false
    },

    /**
     * Initializes the tour guide system
     */
    init() {
        return ErrorHandler.wrapFunction(() => {
            this.createHelpButton();
            this.checkFirstVisit();
        }, 'TourGuideManager.init', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Creates the help button
     */
    createHelpButton() {
        // Create tour container
        const tourContainer = Utils.createElement('div', {
            className: 'tour-container'
        });

        // Create help button
        this.state.helpButton = Utils.createElement('button', {
            className: 'help-button',
            title: 'Get help and tour the page'
        });
        this.state.helpButton.innerHTML = '<i class="fas fa-question"></i>';

        // Add click event
        Utils.safeAddEventListener(this.state.helpButton, 'click', () => {
            this.toggleTour();
        });

        // Create tooltip container (initially hidden)
        this.state.tooltipContainer = Utils.createElement('div', {
            className: 'tooltip-container',
            style: 'display: none;'
        });

        // Assemble components
        tourContainer.appendChild(this.state.helpButton);
        tourContainer.appendChild(this.state.tooltipContainer);
        document.body.appendChild(tourContainer);
    },

    /**
     * Checks if this is the user's first visit and shows tour
     */
    checkFirstVisit() {
        try {
            const hasVisited = localStorage.getItem('cv-tour-shown');
            if (!hasVisited && !this.state.hasBeenShown) {
                // Show tour after a short delay for first-time visitors
                Utils.safeTimeout(() => {
                    this.startTour();
                }, 2000, 'TourGuideManager.firstVisitTour');
            }
        } catch (error) {
            // If localStorage is not available, just continue
            console.log('localStorage not available for tour guide');
        }
    },

    /**
     * Toggles the tour on/off
     */
    toggleTour() {
        if (this.state.isActive) {
            this.endTour();
        } else {
            this.startTour();
        }
    },

    /**
     * Starts the guided tour
     */
    startTour() {
        return ErrorHandler.wrapFunction(() => {
            this.state.isActive = true;
            this.state.currentStep = 0;
            this.state.hasBeenShown = true;

            this.showWelcomeTooltip();
            this.createFeatureIndicators();

            // Mark as shown in localStorage
            try {
                localStorage.setItem('cv-tour-shown', 'true');
            } catch (error) {
                // Continue if localStorage is not available
            }
        }, 'TourGuideManager.startTour', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Shows the welcome tooltip
     */
    showWelcomeTooltip() {
        const tooltipContent = `
            <div class="tooltip-header">
                <h3 class="tooltip-title">Welcome to Michal's CV!</h3>
                <button class="tooltip-close" aria-label="Close tour">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="tooltip-content">
                <p>This interactive CV has several features to enhance your experience:</p>
                <ul>
                    <li><strong><span class="feature-number">1</span> Achievement Details:</strong> Click "View Achievements" buttons to expand detailed accomplishments</li>
                    <li><strong><span class="feature-number">2</span> Photo Galleries:</strong> Hover over 📸 camera icons to see event photos</li>
                    <li><strong><span class="feature-number">3</span> Interactive Skills:</strong> Hover over skill tags for animations</li>
                    <li><strong><span class="feature-number">4</span> Download/Print:</strong> Save or print the CV easily</li>
                </ul>
                <p>Click on the numbered indicators (<span class="inline-indicator">1</span> <span class="inline-indicator">2</span> <span class="inline-indicator">3</span> <span class="inline-indicator">4</span>) to learn more about each feature!</p>
            </div>
            <div class="tooltip-actions">
                <button class="tooltip-button secondary">Skip Tour</button>
                <button class="tooltip-button">Got it!</button>
            </div>
        `;

        this.state.tooltipContainer.innerHTML = tooltipContent;
        this.state.tooltipContainer.style.display = 'block';

        // Add event listeners
        const closeButton = this.state.tooltipContainer.querySelector('.tooltip-close');
        const skipButton = this.state.tooltipContainer.querySelector('.tooltip-button.secondary');
        const gotItButton = this.state.tooltipContainer.querySelector('.tooltip-button:not(.secondary)');

        Utils.safeAddEventListener(closeButton, 'click', () => this.endTour());
        Utils.safeAddEventListener(skipButton, 'click', () => this.endTour());
        Utils.safeAddEventListener(gotItButton, 'click', () => this.hideTooltip());
    },

    /**
     * Creates feature indicators on the page
     */
    createFeatureIndicators() {
        this.config.features.forEach((feature, index) => {
            const targetElements = Utils.safeQuerySelectorAll(feature.selector);
            if (!targetElements || targetElements.length === 0) return;

            // Create indicator for the first matching element
            const targetElement = targetElements[0];
            const indicator = this.createIndicator(index + 1, feature);
            
            this.positionIndicator(indicator, targetElement, feature.position);
            this.state.indicators.push(indicator);
            
            document.body.appendChild(indicator);
        });
    },

    /**
     * Creates a single feature indicator
     * @param {number} number - The indicator number
     * @param {Object} feature - Feature configuration
     * @returns {HTMLElement} - The indicator element
     */
    createIndicator(number, feature) {
        const indicator = Utils.createElement('div', {
            className: 'feature-indicator',
            style: 'cursor: pointer;'
        }, number.toString());

        // Add click event to show feature tooltip
        Utils.safeAddEventListener(indicator, 'click', () => {
            this.showFeatureTooltip(feature, indicator);
        });

        return indicator;
    },

    /**
     * Positions an indicator relative to its target element
     * @param {HTMLElement} indicator - The indicator element
     * @param {HTMLElement} target - The target element
     * @param {string} position - Position preference
     */
    positionIndicator(indicator, target, position) {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let left, top;

        switch (position) {
            case 'top-left':
                left = rect.left + scrollLeft - 30;
                top = rect.top + scrollTop - 10;
                break;
            case 'top-right':
                left = rect.right + scrollLeft + 10;
                top = rect.top + scrollTop - 10;
                break;
            case 'bottom':
                left = rect.left + scrollLeft + (rect.width / 2) - 10;
                top = rect.bottom + scrollTop + 10;
                break;
            case 'left':
                left = rect.left + scrollLeft - 30;
                top = rect.top + scrollTop + (rect.height / 2) - 10;
                break;
            default:
                left = rect.right + scrollLeft + 10;
                top = rect.top + scrollTop + (rect.height / 2) - 10;
        }

        indicator.style.position = 'absolute';
        indicator.style.left = `${Math.max(10, left)}px`;
        indicator.style.top = `${Math.max(10, top)}px`;
    },

    /**
     * Shows a feature-specific tooltip
     * @param {Object} feature - Feature configuration
     * @param {HTMLElement} indicator - The clicked indicator
     */
    showFeatureTooltip(feature, indicator) {
        const tooltipContent = `
            <div class="tooltip-header">
                <h3 class="tooltip-title">${feature.title}</h3>
                <button class="tooltip-close" aria-label="Close tooltip">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="tooltip-content">
                <p>${feature.description}</p>
            </div>
            <div class="tooltip-actions">
                <button class="tooltip-button">Close</button>
            </div>
        `;

        this.state.tooltipContainer.innerHTML = tooltipContent;
        this.state.tooltipContainer.style.display = 'block';

        // Add event listeners
        const closeButton = this.state.tooltipContainer.querySelector('.tooltip-close');
        const closeActionButton = this.state.tooltipContainer.querySelector('.tooltip-button');

        Utils.safeAddEventListener(closeButton, 'click', () => this.hideTooltip());
        Utils.safeAddEventListener(closeActionButton, 'click', () => this.hideTooltip());

        // Highlight the feature temporarily
        this.highlightFeature(feature.selector);
    },

    /**
     * Highlights a feature temporarily
     * @param {string} selector - CSS selector for the feature
     */
    highlightFeature(selector) {
        const elements = Utils.safeQuerySelectorAll(selector);
        if (!elements) return;

        elements.forEach(element => {
            element.style.transition = 'all 0.3s ease';
            element.style.transform = 'scale(1.05)';
            element.style.boxShadow = '0 0 0 3px rgba(226, 0, 116, 0.3)';
            element.style.borderRadius = '4px';

            // Remove highlight after 2 seconds
            Utils.safeTimeout(() => {
                element.style.transform = '';
                element.style.boxShadow = '';
                element.style.borderRadius = '';
            }, 2000, 'TourGuideManager.removeHighlight');
        });
    },

    /**
     * Hides the tooltip
     */
    hideTooltip() {
        this.state.tooltipContainer.style.display = 'none';
        this.state.tooltipContainer.innerHTML = '';
    },

    /**
     * Ends the tour and cleans up
     */
    endTour() {
        this.state.isActive = false;
        this.hideTooltip();
        this.removeIndicators();
    },

    /**
     * Removes all feature indicators
     */
    removeIndicators() {
        this.state.indicators.forEach(indicator => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        });
        this.state.indicators = [];
    },

    /**
     * Gets tour state
     * @returns {Object} - Current tour state
     */
    getState() {
        return {
            isActive: this.state.isActive,
            currentStep: this.state.currentStep,
            hasBeenShown: this.state.hasBeenShown,
            indicatorCount: this.state.indicators.length
        };
    },

    /**
     * Manually show tour (for testing or user request)
     */
    showTour() {
        this.startTour();
    },

    /**
     * Reset tour state (clear localStorage flag)
     */
    resetTourState() {
        try {
            localStorage.removeItem('cv-tour-shown');
            this.state.hasBeenShown = false;
        } catch (error) {
            console.log('Could not reset tour state');
        }
    },

    /**
     * Destroys the tour guide and cleans up
     */
    destroy() {
        this.endTour();
        
        if (this.state.helpButton && this.state.helpButton.parentNode) {
            this.state.helpButton.parentNode.parentNode.removeChild(this.state.helpButton.parentNode);
        }

        this.state.helpButton = null;
        this.state.tooltipContainer = null;
    }
};