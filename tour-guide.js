/**
 * Tour Guide - Interactive guidance system for website features
 * Highlights key functionality including:
 * - Toggling proof content
 * - Gallery features
 * - Profile page navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tour system after a short delay to ensure all elements are loaded
    setTimeout(initTourSystem, 1500);
    
    // Set up event listeners for tour-related elements
    setupTourEventListeners();
});

/**
 * Initialize the tour guidance system
 */
function initTourSystem() {
    try {
        // Create the tour guide container
        createTourGuideElements();
        
        // Check if this is the first visit (using localStorage)
        const isFirstVisit = !localStorage.getItem('mk_tour_shown');
        
        // Show welcome tooltip on first visit
        if (isFirstVisit) {
            showWelcomeMessage();
            localStorage.setItem('mk_tour_shown', 'true');
        } else {
            // For returning visitors, just show the help button
            showHelpButton();
        }
        
        // Add feature indicators
        addFeatureIndicators();
        
    } catch (error) {
        console.error('Error initializing tour system:', error);
    }
}

/**
 * Create the tour guide UI elements
 */
function createTourGuideElements() {
    // Create main container for tour elements
    const tourContainer = document.createElement('div');
    tourContainer.className = 'tour-container';
    document.body.appendChild(tourContainer);
    
    // Create help button that's always accessible
    const helpButton = document.createElement('button');
    helpButton.className = 'help-button';
    helpButton.innerHTML = '<i class="fas fa-info-circle"></i>';
    helpButton.setAttribute('title', 'Show site guide');
    helpButton.setAttribute('aria-label', 'Show site guide');
    tourContainer.appendChild(helpButton);
    
    // Create tooltip container
    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'tooltip-container';
    tooltipContainer.style.display = 'none';
    tourContainer.appendChild(tooltipContainer);
    
    // Add styles for tour elements
    addTourStyles();
}

/**
 * Add CSS styles for tour elements
 */
function addTourStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .tour-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: 'Roboto', 'Poppins', sans-serif;
        }
        
        .help-button {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
            color: white;
            border: none;
            box-shadow: 0 4px 10px rgba(226, 0, 116, 0.3);
            cursor: pointer;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .help-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 15px rgba(226, 0, 116, 0.4);
        }
        
        .tooltip-container {
            position: absolute;
            bottom: 70px;
            right: 0;
            width: 300px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            padding: 20px;
            transition: all 0.3s ease;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .tooltip-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        
        .tooltip-title {
            font-weight: 600;
            color: var(--primary-color);
            margin: 0;
            font-size: 1.2rem;
        }
        
        .tooltip-close {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-size: 1.2rem;
            padding: 0;
            transition: color 0.3s ease;
        }
        
        .tooltip-close:hover {
            color: var(--primary-color);
        }
        
        .tooltip-content {
            margin-bottom: 15px;
        }
        
        .tooltip-content p {
            margin: 0 0 10px;
            line-height: 1.5;
            color: #555;
        }
        
        .tooltip-actions {
            display: flex;
            justify-content: space-between;
        }
        
        .tooltip-button {
            padding: 8px 15px;
            border-radius: 20px;
            border: none;
            background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .tooltip-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(226, 0, 116, 0.2);
        }
        
        .tooltip-button.secondary {
            background: #f0f0f0;
            color: #666;
        }
        
        .feature-indicator {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(226, 0, 116, 0.3);
            cursor: pointer;
            animation: pulse 2s infinite;
            z-index: 100;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(226, 0, 116, 0.5);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(226, 0, 116, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(226, 0, 116, 0);
            }
        }
        
        .feature-tooltip {
            position: absolute;
            background-color: white;
            border-radius: 5px;
            padding: 10px 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            font-size: 14px;
            color: #555;
            max-width: 250px;
            z-index: 101;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .feature-tooltip.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .tour-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9990;
            display: none;
        }
        
        .highlight-element {
            position: relative;
            z-index: 9995;
            animation: highlight-pulse 2s infinite;
        }
        
        @keyframes highlight-pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(226, 0, 116, 0.5);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(226, 0, 116, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(226, 0, 116, 0);
            }
        }
    `;
    document.head.appendChild(styleElement);
}

/**
 * Set up event listeners for tour elements
 */
function setupTourEventListeners() {
    document.addEventListener('click', function(e) {
        // Help button click
        if (e.target.closest('.help-button')) {
            toggleTooltipContainer();
        }
        
        // Close button click
        if (e.target.closest('.tooltip-close')) {
            hideTooltipContainer();
        }
        
        // Start tour button click
        if (e.target.closest('.start-tour-button')) {
            startGuidedTour();
            hideTooltipContainer();
        }
        
        // Feature indicator click
        if (e.target.closest('.feature-indicator')) {
            const indicator = e.target.closest('.feature-indicator');
            showFeatureTooltip(indicator);
        }
    });
}

/**
 * Show the welcome message for first-time visitors
 */
function showWelcomeMessage() {
    const tooltipContainer = document.querySelector('.tooltip-container');
    if (!tooltipContainer) return;
    
    tooltipContainer.style.display = 'block';
    tooltipContainer.innerHTML = `
        <div class="tooltip-header">
            <h3 class="tooltip-title">Welcome to My CV!</h3>
            <button class="tooltip-close" aria-label="Close"><i class="fas fa-times"></i></button>
        </div>
        <div class="tooltip-content">
            <p>Thanks for visiting my interactive CV! Would you like a quick tour of the site's features?</p>
        </div>
        <div class="tooltip-actions">
            <button class="tooltip-button start-tour-button">Take the Tour</button>
            <button class="tooltip-button secondary tooltip-close">Maybe Later</button>
        </div>
    `;
}

/**
 * Show just the help button for returning visitors
 */
function showHelpButton() {
    const helpButton = document.querySelector('.help-button');
    if (helpButton) {
        helpButton.style.display = 'flex';
    }
}

/**
 * Updates the Site Guide content based on available features
 */
function updateSiteGuideContent() {
    // Feature descriptions for the guide
    const featureDescriptions = {
        'profile': 'Explore my detailed professional profile',
        'achievements': 'Click "View Achievements" to see detailed accomplishments',
        'gallery': 'View images from my presentations and events',
        'toggle': 'Click on "Proven" to toggle proof details'
    };
    
    // Feature titles for the guide
    const featureTitles = {
        'profile': 'Profile Page',
        'achievements': 'Achievements',
        'gallery': 'Photo Gallery',
        'toggle': 'Leadership Qualities'
    };
    
    // Store the dynamic content for later use
    window.siteGuideContent = '';
    
    // Only proceed if we have the feature map
    if (window.tourFeatureMap) {
        let listItems = '';
        
        // Sort features by their assigned number
        const sortedFeatures = Array.from(window.tourFeatureMap.entries())
            .sort((a, b) => a[1].number - b[1].number);
        
        // Generate list items for each available feature
        sortedFeatures.forEach(([key, feature]) => {
            listItems += `<li><strong>${feature.number}. ${featureTitles[key]}</strong>: ${featureDescriptions[key]}</li>\n`;
        });
        
        // Store the complete HTML content
        window.siteGuideContent = `
            <div class="tooltip-header">
                <h3 class="tooltip-title"><i class="fas fa-info-circle"></i> Site Guide</h3>
                <button class="tooltip-close" aria-label="Close"><i class="fas fa-times"></i></button>
            </div>
            <div class="tooltip-content">
                <p>Discover the interactive features of my CV:</p>
                <ul>
                    ${listItems}
                </ul>
            </div>
            <div class="tooltip-actions">
                <button class="tooltip-button start-tour-button">Start Guided Tour</button>
            </div>
        `;
    }
}

/**
 * Toggle the tooltip container visibility
 */
function toggleTooltipContainer() {
    const tooltipContainer = document.querySelector('.tooltip-container');
    if (!tooltipContainer) return;
    
    if (tooltipContainer.style.display === 'none') {
        tooltipContainer.style.display = 'block';
        
        // Use dynamic content if available, otherwise use fallback
        if (window.siteGuideContent) {
            tooltipContainer.innerHTML = window.siteGuideContent;
        } else {
            tooltipContainer.innerHTML = `
                <div class="tooltip-header">
                    <h3 class="tooltip-title"><i class="fas fa-info-circle"></i> Site Guide</h3>
                    <button class="tooltip-close" aria-label="Close"><i class="fas fa-times"></i></button>
                </div>
                <div class="tooltip-content">
                    <p>Discover the interactive features of my CV:</p>
                    <p>Loading available features...</p>
                </div>
                <div class="tooltip-actions">
                    <button class="tooltip-button start-tour-button">Start Guided Tour</button>
                </div>
            `;
        }
    } else {
        tooltipContainer.style.display = 'none';
    }
}

/**
 * Hide the tooltip container
 */
function hideTooltipContainer() {
    const tooltipContainer = document.querySelector('.tooltip-container');
    if (tooltipContainer) {
        tooltipContainer.style.display = 'none';
    }
}

/**
 * Add indicators for key features
 */
function addFeatureIndicators() {
    // Wait for DOM to be fully loaded with all elements
    setTimeout(() => {
        try {
            // Initialize feature tracking
            const featureMap = new Map();
            let currentNumber = 1;
            
            // Check for profile page links (priority 1)
            const profileLinks = document.querySelectorAll('.profile-photo a, a[href="profile.html"]');
            if (profileLinks.length > 0) {
                featureMap.set('profile', {
                    number: currentNumber++,
                    elements: profileLinks,
                    tooltip: 'Click to view my detailed profile page'
                });
            }
            
            // Check for achievements toggles (priority 2)
            const achievementToggles = document.querySelectorAll('.achievements-toggle');
            if (achievementToggles.length > 0) {
                featureMap.set('achievements', {
                    number: currentNumber++,
                    elements: achievementToggles,
                    tooltip: 'Click to view achievements. Try it!'
                });
            }
            
            // Check for gallery icons (priority 3)
            const galleryIcons = document.querySelectorAll('#gallery-Techcelerate2024, #gallery-AllLeadsEssen2024, #gallery-WeAreDevelopers, #gallery-Hackathons');
            if (galleryIcons.length > 0) {
                featureMap.set('gallery', {
                    number: currentNumber++,
                    elements: galleryIcons,
                    tooltip: 'Click to view photo gallery from events'
                });
            }
            
            // Check for proof toggles (priority 4)
            const proofToggles = document.querySelectorAll('.proof-label');
            if (proofToggles.length > 0) {
                featureMap.set('toggle', {
                    number: currentNumber++,
                    elements: proofToggles,
                    tooltip: 'Click to toggle proof details. Try it!'
                });
            }
            
            // Add indicators for all found features
            featureMap.forEach((feature, key) => {
                feature.elements.forEach(element => {
                    const indicator = createIndicator(feature.number.toString());
                    positionIndicatorNear(indicator, element);
                    indicator.setAttribute('data-feature', key);
                    indicator.setAttribute('data-tooltip', feature.tooltip);
                });
            });
            
            // Store feature map for use in other functions
            window.tourFeatureMap = featureMap;
            
            // Update the site guide with dynamic features
            updateSiteGuideContent();
            
        } catch (error) {
            console.error('Error adding feature indicators:', error);
        }
    }, 1000);
}

/**
 * Add indicator for proof toggle functionality
 */
function addProofToggleIndicator() {
    const proofToggles = document.querySelectorAll('.proof-label');
    if (proofToggles.length > 0) {
        proofToggles.forEach((toggle, index) => {
            const indicator = createIndicator('4');
            positionIndicatorNear(indicator, toggle);
            
            indicator.setAttribute('data-feature', 'toggle');
            indicator.setAttribute('data-tooltip', 'Click to toggle proof details. Try it!');
        });
    }
}

/**
 * Add indicator for achievements toggle functionality
 */
function addAchievementsToggleIndicator() {
    const achievementToggles = document.querySelectorAll('.achievements-toggle');
    if (achievementToggles.length > 0) {
        achievementToggles.forEach((toggle, index) => {
            const indicator = createIndicator('2');
            positionIndicatorNear(indicator, toggle);
            
            indicator.setAttribute('data-feature', 'achievements');
            indicator.setAttribute('data-tooltip', 'Click to view achievements. Try it!');
        });
    }
}

/**
 * Add indicator for gallery functionality
 */
function addGalleryIndicator() {
    const galleryIcons = document.querySelectorAll('#gallery-Techcelerate2024, #gallery-AllLeadsEssen2024, #gallery-WeAreDevelopers, #gallery-Hackathons');
    if (galleryIcons.length > 0) {
        galleryIcons.forEach((icon, index) => {
            const indicator = createIndicator('3');
            positionIndicatorNear(indicator, icon);
            
            indicator.setAttribute('data-feature', 'gallery');
            indicator.setAttribute('data-tooltip', 'Click to view photo gallery from events');
        });
    }
}

/**
 * Add indicator for profile page link
 */
function addProfilePageIndicator() {
    const profileLinks = document.querySelectorAll('.profile-photo a, a[href="profile.html"]');
    if (profileLinks.length > 0) {
        profileLinks.forEach((link, index) => {
            const indicator = createIndicator('1');
            positionIndicatorNear(indicator, link);
            
            indicator.setAttribute('data-feature', 'profile');
            indicator.setAttribute('data-tooltip', 'Click to view my detailed profile page');
        });
    }
}

/**
 * Create a feature indicator element
 * @param {string} number - The number to display in the indicator
 * @returns {HTMLElement} - The created indicator element
 */
function createIndicator(number) {
    const indicator = document.createElement('div');
    indicator.className = 'feature-indicator';
    indicator.textContent = number;
    document.body.appendChild(indicator);
    return indicator;
}

/**
 * Position an indicator near a target element
 * @param {HTMLElement} indicator - The indicator element
 * @param {HTMLElement} target - The target element to position near
 */
function positionIndicatorNear(indicator, target) {
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    indicator.style.top = (rect.top + scrollTop - 10) + 'px';
    indicator.style.left = (rect.right + scrollLeft + 5) + 'px';
}

/**
 * Show tooltip for a feature indicator
 * @param {HTMLElement} indicator - The indicator element
 */
function showFeatureTooltip(indicator) {
    // Remove any existing tooltips
    const existingTooltip = document.querySelector('.feature-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // Create new tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'feature-tooltip';
    tooltip.textContent = indicator.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = indicator.getBoundingClientRect();
    tooltip.style.top = rect.top + 'px';
    tooltip.style.left = (rect.right + 10) + 'px';
    
    // Show tooltip
    setTimeout(() => {
        tooltip.classList.add('visible');
    }, 10);
    
    // Hide tooltip after a delay
    setTimeout(() => {
        tooltip.classList.remove('visible');
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }, 5000);
}

/**
 * Start the guided tour
 */
function startGuidedTour() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'tour-overlay';
    document.body.appendChild(overlay);
    overlay.style.display = 'block';
    
    // Define tour steps
    const tourSteps = [
        {
            element: '.proof-label',
            title: 'Toggle Proof Details',
            content: 'Click on "Proven" to expand and see detailed proof of each leadership quality.',
            position: 'right'
        },
        {
            element: '.achievements-toggle',
            title: 'View Achievements',
            content: 'Click on "View Achievements" to see detailed accomplishments for each position.',
            position: 'right'
        },
        {
            element: '#gallery-Techcelerate2024, #gallery-AllLeadsEssen2024, #gallery-WeAreDevelopers, #gallery-Hackathons',
            title: 'Photo Gallery',
            content: 'Click on gallery icons to view photos from presentations and events.',
            position: 'top'
        },
        {
            element: '.profile-photo a, a[href="profile.html"]',
            title: 'Profile Page',
            content: 'Click on my profile photo to visit my detailed profile page with additional information.',
            position: 'bottom'
        }
    ];
    
    // Start the tour with the first step
    showTourStep(tourSteps, 0, overlay);
}

/**
 * Show a specific tour step
 * @param {Array} steps - Array of tour step objects
 * @param {number} index - Current step index
 * @param {HTMLElement} overlay - Tour overlay element
 */
function showTourStep(steps, index, overlay) {
    // Remove previous highlights
    const previousHighlight = document.querySelector('.highlight-element');
    if (previousHighlight) {
        previousHighlight.classList.remove('highlight-element');
    }
    
    // If we've gone through all steps, end the tour
    if (index >= steps.length) {
        overlay.style.display = 'none';
        setTimeout(() => {
            overlay.remove();
        }, 300);
        return;
    }
    
    const step = steps[index];
    const element = document.querySelector(step.element);
    
    if (!element) {
        // Skip this step if element not found
        showTourStep(steps, index + 1, overlay);
        return;
    }
    
    // Highlight the current element
    element.classList.add('highlight-element');
    
    // Create tooltip for this step
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-container';
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'block';
    tooltip.style.width = '280px';
    document.body.appendChild(tooltip);
    
    // Position tooltip based on specified position
    positionTooltip(tooltip, element, step.position);
    
    // Set tooltip content
    tooltip.innerHTML = `
        <div class="tooltip-header">
            <h3 class="tooltip-title">${step.title}</h3>
        </div>
        <div class="tooltip-content">
            <p>${step.content}</p>
        </div>
        <div class="tooltip-actions">
            <button class="tooltip-button next-step-button">
                ${index === steps.length - 1 ? 'Finish Tour' : 'Next'}
            </button>
        </div>
    `;
    
    // Add event listener for next button
    const nextButton = tooltip.querySelector('.next-step-button');
    nextButton.addEventListener('click', function() {
        tooltip.remove();
        showTourStep(steps, index + 1, overlay);
    });
}

/**
 * Position a tooltip near an element
 * @param {HTMLElement} tooltip - The tooltip element
 * @param {HTMLElement} element - The target element
 * @param {string} position - Position relative to element (top, right, bottom, left)
 */
function positionTooltip(tooltip, element, position) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    switch (position) {
        case 'top':
            tooltip.style.top = (rect.top + scrollTop - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + scrollLeft + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
            break;
        case 'right':
            tooltip.style.top = (rect.top + scrollTop + (rect.height / 2) - (tooltip.offsetHeight / 2)) + 'px';
            tooltip.style.left = (rect.right + scrollLeft + 10) + 'px';
            break;
        case 'bottom':
            tooltip.style.top = (rect.bottom + scrollTop + 10) + 'px';
            tooltip.style.left = (rect.left + scrollLeft + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
            break;
        case 'left':
            tooltip.style.top = (rect.top + scrollTop + (rect.height / 2) - (tooltip.offsetHeight / 2)) + 'px';
            tooltip.style.left = (rect.left + scrollLeft - tooltip.offsetWidth - 10) + 'px';
            break;
        default:
            tooltip.style.top = (rect.bottom + scrollTop + 10) + 'px';
            tooltip.style.left = (rect.left + scrollLeft) + 'px';
    }
    
    // Ensure tooltip is within viewport
    const tooltipRect = tooltip.getBoundingClientRect();
    
    if (tooltipRect.left < 0) {
        tooltip.style.left = '10px';
    } else if (tooltipRect.right > window.innerWidth) {
        tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px';
    }
    
    if (tooltipRect.top < 0) {
        tooltip.style.top = '10px';
    } else if (tooltipRect.bottom > window.innerHeight) {
        tooltip.style.top = (window.innerHeight - tooltipRect.height - 10) + 'px';
    }
}
