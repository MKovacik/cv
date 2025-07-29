/**
 * Core utility functions for the CV website
 * Contains common utility methods used across multiple modules
 */

export const Utils = {
    /**
     * Safely gets an element by ID with error handling
     * @param {string} id - Element ID to find
     * @returns {HTMLElement|null} - Found element or null
     */
    safeGetElementById(id) {
        try {
            return document.getElementById(id);
        } catch (error) {
            console.error(`Error getting element by ID "${id}":`, error);
            return null;
        }
    },

    /**
     * Safely queries for elements with error handling
     * @param {string} selector - CSS selector
     * @param {HTMLElement} container - Container to search within (defaults to document)
     * @returns {NodeList|null} - Found elements or null
     */
    safeQuerySelectorAll(selector, container = document) {
        try {
            return container.querySelectorAll(selector);
        } catch (error) {
            console.error(`Error querying selector "${selector}":`, error);
            return null;
        }
    },

    /**
     * Safely queries for a single element with error handling
     * @param {string} selector - CSS selector
     * @param {HTMLElement} container - Container to search within (defaults to document)
     * @returns {HTMLElement|null} - Found element or null
     */
    safeQuerySelector(selector, container = document) {
        try {
            return container.querySelector(selector);
        } catch (error) {
            console.error(`Error querying selector "${selector}":`, error);
            return null;
        }
    },

    /**
     * Safely adds event listener with error handling
     * @param {HTMLElement} element - Element to add listener to
     * @param {string} event - Event type
     * @param {Function} handler - Event handler function
     * @param {Object} options - Event listener options
     * @returns {boolean} - Success status
     */
    safeAddEventListener(element, event, handler, options = {}) {
        try {
            if (!element || typeof handler !== 'function') {
                throw new Error('Invalid element or handler provided');
            }
            element.addEventListener(event, handler, options);
            return true;
        } catch (error) {
            console.error(`Error adding event listener for "${event}":`, error);
            return false;
        }
    },

    /**
     * Checks if device is mobile based on screen width
     * @returns {boolean} - True if mobile view
     */
    isMobileView() {
        return window.innerWidth <= 768;
    },

    /**
     * Checks if device is touch-enabled
     * @returns {boolean} - True if touch device
     */
    isTouchDevice() {
        return ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) || 
               (navigator.msMaxTouchPoints > 0);
    },

    /**
     * Safely executes a function with error handling
     * @param {Function} fn - Function to execute
     * @param {Array} args - Arguments to pass to function
     * @param {string} context - Context description for error logging
     * @returns {*} - Function result or null on error
     */
    safeExecute(fn, args = [], context = 'Unknown') {
        try {
            if (typeof fn !== 'function') {
                throw new Error('Provided parameter is not a function');
            }
            return fn.apply(null, args);
        } catch (error) {
            console.error(`Error executing function in context "${context}":`, error);
            return null;
        }
    },

    /**
     * Debounce function to limit function execution frequency
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @param {boolean} immediate - Execute immediately on first call
     * @returns {Function} - Debounced function
     */
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    },

    /**
     * Creates a safe timeout with error handling
     * @param {Function} callback - Function to execute
     * @param {number} delay - Delay in milliseconds
     * @param {string} context - Context for error logging
     * @returns {number} - Timeout ID
     */
    safeTimeout(callback, delay, context = 'Unknown') {
        return setTimeout(() => {
            this.safeExecute(callback, [], context);
        }, delay);
    },

    /**
     * Validates that required dependencies are available
     * @param {Array<string>} dependencies - Array of dependency names to check
     * @returns {boolean} - True if all dependencies are available
     */
    validateDependencies(dependencies) {
        const missing = dependencies.filter(dep => typeof window[dep] === 'undefined');
        if (missing.length > 0) {
            console.warn('Missing dependencies:', missing);
            return false;
        }
        return true;
    },

    /**
     * Creates an element safely with error handling
     * @param {string} tagName - HTML tag name
     * @param {Object} attributes - Attributes to set
     * @param {string} textContent - Text content for element
     * @returns {HTMLElement|null} - Created element or null on error
     */
    createElement(tagName, attributes = {}, textContent = '') {
        try {
            const element = document.createElement(tagName);
            
            Object.keys(attributes).forEach(key => {
                if (key === 'className') {
                    element.className = attributes[key];
                } else if (key === 'dataset') {
                    Object.keys(attributes[key]).forEach(dataKey => {
                        element.dataset[dataKey] = attributes[key][dataKey];
                    });
                } else {
                    element.setAttribute(key, attributes[key]);
                }
            });

            if (textContent) {
                element.textContent = textContent;
            }

            return element;
        } catch (error) {
            console.error(`Error creating element "${tagName}":`, error);
            return null;
        }
    }
};

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Global error handler for general errors
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});