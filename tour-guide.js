/**
 * Tour Guide - Interactive guidance system for website features
 * Highlights key functionality including:
 * - Toggling proof content
 * - Gallery features
 * - Profile page navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tour system immediately
    initTourSystem();
    
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
        'achievements': 'Click "Achievements" to see detailed accomplishments',
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
                <h3 class="tooltip-title"><i class="fas fa-info-circle" style="color: var(--primary-color);"></i> Site Guide</h3>
                <button class="tooltip-close" aria-label="Close"><i class="fas fa-times"></i></button>
            </div>
            <div class="tooltip-content">
                <p>Discover the interactive features of my CV:</p>
                <ul>
                    ${listItems}
                </ul>

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
                    <h3 class="tooltip-title"><i class="fas fa-info-circle" style="color: var(--primary-color);"></i> Site Guide</h3>
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
    // Add feature indicators immediately
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
            
            // Create a map to track element types for unique numbering
            const elementTypeMap = new Map();
            
            // First, identify unique element types
            featureMap.forEach((feature, key) => {
                // For each feature type, get all unique element types
                feature.elements.forEach(element => {
                    // Create a unique identifier for this element type
                    // Based on its tag name, classes, and position in the document
                    const elementType = element.tagName + 
                                       Array.from(element.classList).join('') + 
                                       (element.getAttribute('id') || '');
                    
                    // If we haven't seen this element type before, assign it a number
                    if (!elementTypeMap.has(elementType)) {
                        elementTypeMap.set(elementType, {
                            featureKey: key,
                            number: feature.number
                        });
                    }
                });
            });
            
            // Now add indicators with unique numbers for each element type
            featureMap.forEach((feature, key) => {
                feature.elements.forEach(element => {
                    // Get the element type identifier
                    const elementType = element.tagName + 
                                       Array.from(element.classList).join('') + 
                                       (element.getAttribute('id') || '');
                    
                    // Use the unique number for this element type
                    const uniqueNumber = elementTypeMap.get(elementType).number;
                    const indicator = createIndicator(uniqueNumber.toString());
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
    // Make the indicator an inline element by appending it to the target
    // This ensures it moves with the target when content expands/collapses
    indicator.style.position = 'relative';
    indicator.style.top = '0';
    indicator.style.left = '0';
    indicator.style.marginLeft = '8px';
    indicator.style.display = 'inline-flex';
    indicator.style.pointerEvents = 'none'; // Prevent indicator from interfering with clicks
    
    // Special handling for gallery icons - place indicator before the icon
    if (target.classList.contains('gallery-icon')) {
        // Create a wrapper span to hold the indicator
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.pointerEvents = 'none';
        wrapper.appendChild(indicator);
        
        // Insert before the gallery icon
        target.parentNode.insertBefore(wrapper, target);
        
        // Adjust position to be vertically aligned
        wrapper.style.verticalAlign = 'middle';
        wrapper.style.marginRight = '5px';
    }
    // Special handling for achievement buttons to prevent indicator from disappearing
    else if (target.classList.contains('achievements-toggle')) {
        // For achievement buttons, create a wrapper span to hold the indicator
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.pointerEvents = 'none';
        wrapper.appendChild(indicator);
        
        // Insert before the button instead of inside it
        target.parentNode.insertBefore(wrapper, target);
        
        // Adjust position to be vertically aligned
        wrapper.style.verticalAlign = 'middle';
        wrapper.style.marginRight = '5px';
    } 
    // For other buttons or links
    else if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        target.appendChild(indicator);
    } 
    // For other elements
    else {
        target.parentNode.insertBefore(indicator, target.nextSibling);
    }
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
