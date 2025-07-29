/**
 * CV Application Entry Point
 * Loads the modular system with fallback for older browsers
 */

// Check if ES6 modules are supported
function supportsModules() {
    try {
        new Function('import("")');
        return true;
    } catch (e) {
        return false;
    }
}

// Load the modular system
async function loadModularSystem() {
    try {
        const { default: cvApp } = await import('./js/core/main.js');
        console.log('✅ CV Application loaded successfully');
        return true;
    } catch (error) {
        console.warn('⚠️ Failed to load modular system:', error);
        return false;
    }
}

// Check if CSS loaded properly
function checkCSSLoaded() {
    try {
        // Create a test element to check if CSS variables are working
        const testElement = document.createElement('div');
        testElement.style.position = 'absolute';
        testElement.style.visibility = 'hidden';
        testElement.className = 'container';
        document.body.appendChild(testElement);
        
        const styles = window.getComputedStyle(testElement);
        const maxWidth = styles.maxWidth;
        const padding = styles.padding || styles.paddingLeft;
        
        document.body.removeChild(testElement);
        
        // Check if the container styles are applied (max-width should be 900px from container.css)
        const hasContainerStyles = maxWidth && maxWidth !== 'none' && maxWidth !== 'auto';
        const hasPadding = padding && padding !== '0px';
        
        console.log('CSS Check - maxWidth:', maxWidth, 'padding:', padding, 'hasStyles:', hasContainerStyles || hasPadding);
        
        return hasContainerStyles || hasPadding;
    } catch (error) {
        console.warn('CSS check failed:', error);
        return false;
    }
}

// Comprehensive fallback for when modular system fails
function basicFallback() {
    console.log('🔄 Using comprehensive fallback for essential functionality');
    
    // Apply basic styles if modular CSS fails
    function applyBasicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Force correct colors */
            *, *::before, *::after {
                box-sizing: border-box;
            }
            
            html {
                background-color: #ffffff !important;
            }
            
            body {
                font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
                background-color: #ffffff !important;
                color: #333333 !important;
                line-height: 1.6 !important;
                margin: 0 !important;
                padding: 0 !important;
                min-height: 100vh !important;
            }
            
            .container {
                max-width: 900px !important;
                margin: 0 auto !important;
                padding: 20px !important;
                background-color: #ffffff !important;
                color: #333333 !important;
            }
            
            header, main, footer {
                background-color: #ffffff !important;
                color: #333333 !important;
            }
            
            header {
                padding: 20px 0 !important;
                border-bottom: 1px solid #eeeeee !important;
                margin-bottom: 30px !important;
            }
            
            .header-content {
                display: flex !important;
                flex-direction: column !important;
                gap: 20px !important;
            }
            
            .header-main-content {
                display: flex !important;
                align-items: center !important;
                gap: 20px !important;
            }
            
            .profile-photo img {
                width: 120px !important;
                height: 120px !important;
                border-radius: 50% !important;
                object-fit: cover !important;
            }
            
            .contact-info {
                background: #f9f9f9 !important;
                padding: 15px !important;
                border-radius: 8px !important;
                color: #333333 !important;
            }
            
            .contact-info p {
                margin: 5px 0 !important;
                color: #333333 !important;
            }
            
            .section {
                margin-bottom: 40px !important;
                padding-bottom: 30px !important;
                border-bottom: 1px solid #eeeeee !important;
                background-color: #ffffff !important;
                color: #333333 !important;
            }
            
            .section:last-child {
                border-bottom: none !important;
            }
            
            h1, h2, h3, h4, h5, h6 {
                color: #333333 !important;
                margin-bottom: 16px !important;
                font-weight: 600 !important;
            }
            
            h1 {
                font-size: 2.5rem !important;
                color: #e20074 !important;
            }
            
            h2 {
                font-size: 1.8rem !important;
                color: #e20074 !important;
            }
            
            h3 {
                font-size: 1.5rem !important;
                color: #e20074 !important;
                border-bottom: 2px solid #e20074 !important;
                padding-bottom: 8px !important;
            }
            
            p, li {
                color: #333333 !important;
                line-height: 1.6 !important;
                margin-bottom: 12px !important;
            }
            
            .experience-item {
                margin-bottom: 30px !important;
                background: #f9f9f9 !important;
                padding: 20px !important;
                border-radius: 8px !important;
                color: #333333 !important;
            }
            
            .company-header {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                margin-bottom: 15px !important;
                color: #333333 !important;
            }
            
            .position {
                margin-bottom: 20px !important;
                color: #333333 !important;
            }
            
            .achievements-section {
                max-height: 0 !important;
                overflow: hidden !important;
                transition: max-height 0.4s ease !important;
                background-color: #ffffff !important;
                color: #333333 !important;
                opacity: 0 !important;
            }
            
            .achievements-section.expanded {
                max-height: 2000px !important;
                margin-top: 20px !important;
                opacity: 1 !important;
                padding: 20px !important;
                background: #f5f5f5 !important;
                border-radius: 8px !important;
            }
            
            .achievements-toggle {
                background: #e20074 !important;
                color: white !important;
                border: none !important;
                padding: 12px 24px !important;
                border-radius: 25px !important;
                cursor: pointer !important;
                margin-top: 16px !important;
                font-size: 14px !important;
                font-weight: 500 !important;
                transition: all 0.3s ease !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 8px !important;
            }
            
            .achievements-toggle:hover {
                background: #990050 !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 4px 12px rgba(226, 0, 116, 0.3) !important;
            }
            
            .achievements-list {
                list-style: none !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            
            .achievements-list li {
                margin-bottom: 12px !important;
                padding-left: 20px !important;
                position: relative !important;
                color: #333333 !important;
                line-height: 1.6 !important;
            }
            
            .achievements-list li::before {
                content: "★" !important;
                position: absolute !important;
                left: 0 !important;
                color: #e20074 !important;
                font-weight: bold !important;
            }
            
            .gallery-icon {
                color: #e20074 !important;
                cursor: pointer !important;
                text-decoration: underline !important;
                font-weight: 500 !important;
            }
            
            .gallery-icon:hover {
                color: #990050 !important;
            }
            
            .skills-grid {
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 8px !important;
                margin-bottom: 20px !important;
            }
            
            .skill-tag {
                display: inline-flex !important;
                align-items: center !important;
                gap: 8px !important;
                padding: 8px 16px !important;
                background: #f5f5f5 !important;
                color: #333333 !important;
                border: 1px solid #e0e0e0 !important;
                border-radius: 20px !important;
                font-size: 14px !important;
                font-weight: 500 !important;
                transition: all 0.2s ease !important;
            }
            
            .skill-tag:hover {
                transform: translateY(-2px) scale(1.05) !important;
                background: #e20074 !important;
                color: white !important;
                box-shadow: 0 4px 12px rgba(226, 0, 116, 0.3) !important;
            }
            
            a {
                color: #e20074 !important;
                text-decoration: none !important;
            }
            
            a:hover {
                color: #990050 !important;
                text-decoration: underline !important;
            }
            
            footer {
                text-align: center !important;
                padding: 30px 0 !important;
                border-top: 1px solid #eeeeee !important;
                margin-top: 50px !important;
                background-color: #ffffff !important;
                color: #666666 !important;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .container {
                    padding: 15px !important;
                }
                
                .header-main-content {
                    flex-direction: column !important;
                    text-align: center !important;
                }
                
                .profile-photo img {
                    width: 100px !important;
                    height: 100px !important;
                }
                
                h1 {
                    font-size: 2rem !important;
                }
                
                .skills-grid {
                    justify-content: center !important;
                }
            }
        `;
        document.head.appendChild(style);
        console.log('✅ Comprehensive fallback styles applied');
    }
    
    // Apply basic styles immediately
    applyBasicStyles();
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Achievement toggles functionality
    function initAchievements() {
        const achievementButtons = document.querySelectorAll('.achievements-toggle');
        achievementButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const achievementSection = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                if (achievementSection && achievementSection.classList.contains('achievements-section')) {
                    achievementSection.classList.toggle('expanded');
                    if (icon) {
                        icon.classList.toggle('fa-chevron-down');
                        icon.classList.toggle('fa-chevron-up');
                    }
                }
            });
        });
    }
    
    // Gallery functionality
    function initGallery() {
        const galleryIcons = document.querySelectorAll('.gallery-icon');
        galleryIcons.forEach(icon => {
            icon.style.cursor = 'pointer';
            icon.style.textDecoration = 'underline';
            icon.style.color = '#e20074';
            icon.innerHTML = '📸 View Gallery';
            
            icon.addEventListener('click', function() {
                const galleryId = this.id.replace('gallery-', '');
                alert(`Gallery: ${galleryId}\n\nThis would show images from the ${galleryId} gallery.`);
            });
        });
    }
    
    // Profile functionality
    function initProfile() {
        const profileImages = document.querySelectorAll('.profile-image');
        profileImages.forEach(img => {
            img.addEventListener('error', function() {
                console.warn('Profile image failed to load');
            });
        });
    }
    
    // Proof toggle functionality for leadership qualities (profile page)
    function initProofToggles() {
        // Simple approach: find all proof-status buttons and make them clickable
        const provenButtons = document.querySelectorAll('.proof-status');
        console.log('Found proven buttons:', provenButtons.length);
        
        provenButtons.forEach((button, index) => {
            button.style.cursor = 'pointer';
            button.style.transition = 'all 0.3s ease';
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Find the proof content - it's in the same .quality-proof container
                const qualityProof = this.closest('.quality-proof');
                const proofContent = qualityProof.querySelector('.proof-content');
                const chevronIcon = qualityProof.querySelector('.fa-chevron-down, .fa-chevron-up');
                
                if (proofContent) {
                    const isVisible = proofContent.style.display === 'block';
                    
                    if (!isVisible) {
                        // Show content
                        proofContent.style.display = 'block';
                        proofContent.style.maxHeight = 'none';
                        proofContent.style.opacity = '1';
                        proofContent.style.padding = '16px';
                        proofContent.style.backgroundColor = '#f9f9f9';
                        proofContent.style.borderRadius = '8px';
                        proofContent.style.marginTop = '12px';
                        proofContent.style.border = '1px solid #e0e0e0';
                        
                        if (chevronIcon) {
                            chevronIcon.classList.remove('fa-chevron-down');
                            chevronIcon.classList.add('fa-chevron-up');
                        }
                        
                        this.style.backgroundColor = '#990050';
                    } else {
                        // Hide content
                        proofContent.style.display = 'none';
                        proofContent.style.maxHeight = '0';
                        proofContent.style.opacity = '0';
                        proofContent.style.padding = '0';
                        
                        if (chevronIcon) {
                            chevronIcon.classList.remove('fa-chevron-up');
                            chevronIcon.classList.add('fa-chevron-down');
                        }
                        
                        this.style.backgroundColor = '#e20074';
                    }
                    
                    console.log('Toggled proof content for button', index);
                }
            });
        });
        
        // Also try checkbox approach as backup
        const checkboxes = document.querySelectorAll('.proof-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const qualityProof = this.closest('.quality-proof');
                const proofContent = qualityProof.querySelector('.proof-content');
                
                if (proofContent) {
                    if (this.checked) {
                        proofContent.style.display = 'block';
                        proofContent.style.padding = '16px';
                        proofContent.style.backgroundColor = '#f9f9f9';
                        proofContent.style.borderRadius = '8px';
                        proofContent.style.marginTop = '12px';
                    } else {
                        proofContent.style.display = 'none';
                        proofContent.style.padding = '0';
                    }
                }
            });
        });
        
        console.log('✅ Proof toggles setup complete');
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Basic animations for skill tags
    function initSkillAnimations() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Download functionality (if any download buttons exist)
    function initDownloads() {
        const downloadButtons = document.querySelectorAll('[data-download], .download-btn');
        downloadButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const downloadUrl = this.getAttribute('data-download') || this.href;
                if (downloadUrl) {
                    window.open(downloadUrl, '_blank');
                } else {
                    alert('Download functionality requires the full modular system.');
                }
            });
        });
    }
    
    // External link handling and back button
    function initExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add security attributes if missing
                if (!this.getAttribute('rel')) {
                    this.setAttribute('rel', 'noopener noreferrer');
                }
            });
        });
        
        // Handle back button specifically
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            console.log('Back button found:', backButton);
            // Make sure the link works
            backButton.style.color = '#e20074';
            backButton.style.textDecoration = 'none';
            backButton.style.cursor = 'pointer';
            
            // Add click handler as backup
            backButton.addEventListener('click', function(e) {
                console.log('Back button clicked - navigating to index.html');
                // Try both approaches
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 100);
            });
        }
    }
    
    // Basic tour guide functionality
    function initTourGuide() {
        // Skip tour guide on profile page
        if (window.isProfilePage) {
            console.log('Skipping fallback tour guide - profile page has its own');
            return;
        }
        
        // Create help button
        const helpButton = document.createElement('button');
        helpButton.innerHTML = '<i class="fas fa-question"></i>';
        helpButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #e20074 0%, #990050 100%);
            color: white;
            border: none;
            box-shadow: 0 4px 15px rgba(226, 0, 116, 0.3);
            cursor: pointer;
            font-size: 18px;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        helpButton.addEventListener('click', function() {
            alert('Welcome to Michal\'s Interactive CV!\n\n✨ Interactive Features:\n\n1️⃣ Achievement Details:\nClick "View Achievements" buttons to expand detailed accomplishments\n\n2️⃣ Photo Galleries:\nHover over 📸 camera icons to see event photos\n\n3️⃣ Interactive Skills:\nHover over skill tags for animations\n\n4️⃣ Download/Print:\nUse the Download button to save or print the CV\n\nExplore these numbered features throughout the page!');
        });
        
        helpButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        helpButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(helpButton);
    }

    // Initialize all fallback functionality
    function initializeFallbacks() {
        try {
            initAchievements();
            initGallery();
            initProfile();
            initProofToggles();
            initSmoothScrolling();
            initSkillAnimations();
            initDownloads();
            initExternalLinks();
            initTourGuide();
            console.log('✅ Fallback functionality initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing fallback functionality:', error);
        }
    }
    
    // Wait for DOM to be ready then initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFallbacks);
    } else {
        initializeFallbacks();
    }
    
    // Basic error handling
    window.addEventListener('error', function(e) {
        console.error('Page error:', e.error);
    });
    
    // Show message for very old browsers
    const isVeryOldBrowser = !window.fetch || !window.Promise;
    if (isVeryOldBrowser) {
        console.warn('This browser is very old. Some features may not work correctly.');
    }
}

// Initialize the application
(async function() {
    try {
        if (supportsModules()) {
            const success = await loadModularSystem();
            if (!success) {
                console.log('🔄 Modular system failed, using fallback');
                basicFallback();
            } else {
                console.log('✅ Modular system loaded successfully - CSS should be working');
                // Modules loaded successfully, trust that CSS will load too
                // No need for fallback when modular system is working
            }
        } else {
            console.log('🔄 ES6 modules not supported, using basic fallback');
            basicFallback();
        }
    } catch (error) {
        console.error('❌ Application initialization failed:', error);
        basicFallback();
    }
})();