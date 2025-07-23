/**
 * Leadership Script - Handles leadership section functionality
 * - Initializes AOS animations
 * - Manages proof toggle functionality
 * - Implements accessibility features
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize AOS animations if AOS is available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }

        // Set up proof toggles using event delegation for better performance
        const leadershipQualities = document.querySelector('.leadership-qualities');
        
        if (leadershipQualities) {
            // Event delegation for proof checkboxes
            leadershipQualities.addEventListener('change', function(e) {
                if (e.target.classList.contains('proof-checkbox')) {
                    toggleProofContent(e.target);
                }
            });
            
            // Pre-check all proof checkboxes to show they're proven
            const proofCheckboxes = document.querySelectorAll('.proof-checkbox');
            proofCheckboxes.forEach(checkbox => {
                // Set initial state
                checkbox.checked = true;
                
                // Set ARIA attributes for accessibility
                checkbox.setAttribute('aria-expanded', 'true');
                const proofContent = checkbox.parentElement.nextElementSibling;
                if (proofContent) {
                    proofContent.setAttribute('aria-hidden', 'false');
                    // Set initial max-height for the content
                    proofContent.style.maxHeight = proofContent.scrollHeight + 'px';
                }
                
                // Set initial icon rotation
                const icon = checkbox.nextElementSibling.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                    // Use CSS transition for smoother animation
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            // Add hover effects to leadership qualities similar to profile-script.js
            addInteractiveEffects();
        }
    } catch (error) {
        console.error('Error in leadership script:', error);
    }
});

/**
 * Toggles the proof content visibility and accessibility
 * @param {HTMLElement} checkbox - The checkbox that triggers the toggle
 */
function toggleProofContent(checkbox) {
    try {
        const proofContent = checkbox.parentElement.nextElementSibling;
        const icon = checkbox.nextElementSibling.querySelector('i');
        
        if (checkbox.checked) {
            // Expand content
            icon.style.transform = 'rotate(180deg)';
            checkbox.setAttribute('aria-expanded', 'true');
            if (proofContent) {
                proofContent.setAttribute('aria-hidden', 'false');
                proofContent.style.maxHeight = proofContent.scrollHeight + 'px';
            }
        } else {
            // Collapse content
            icon.style.transform = 'rotate(0deg)';
            checkbox.setAttribute('aria-expanded', 'false');
            if (proofContent) {
                proofContent.setAttribute('aria-hidden', 'true');
                proofContent.style.maxHeight = '0';
            }
        }
    } catch (error) {
        console.error('Error toggling proof content:', error);
    }
}

/**
 * Adds interactive effects to leadership quality cards
 * Similar to the effects in profile-script.js for consistency
 */
function addInteractiveEffects() {
    try {
        const leadershipQualities = document.querySelectorAll('.leadership-quality');
        
        leadershipQualities.forEach(quality => {
            // Add subtle hover effect
            quality.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                const icon = this.querySelector('.quality-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                }
            });
            
            quality.addEventListener('mouseleave', function() {
                this.style.transform = '';
                const icon = this.querySelector('.quality-icon');
                if (icon) {
                    icon.style.transform = '';
                }
            });
            
            // Add smooth transitions
            quality.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            
            const icon = quality.querySelector('.quality-icon');
            if (icon) {
                icon.style.transition = 'transform 0.3s ease';
            }
        });
    } catch (error) {
        console.error('Error adding interactive effects:', error);
    }
}
