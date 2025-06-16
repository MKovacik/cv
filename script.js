document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Image switching functionality for mobile view
    const profileImage = document.getElementById('profile-image');
    const headerCompanyLogo = document.getElementById('header-company-logo');
    
    // Store original image sources
    const profileImageSrc = profileImage.src;
    const companyLogoSrc = headerCompanyLogo.src;
    
    // Function to check if device is mobile
    const isMobileView = () => window.innerWidth <= 768;
    
    // Function to toggle between profile image and company logo
    let showingProfile = true;
    const toggleProfileImage = () => {
        if (!isMobileView()) return; // Only run on mobile view
        
        if (showingProfile) {
            // Switch to company logo
            profileImage.src = companyLogoSrc;
            profileImage.alt = "Deutsche Telekom Logo";
        } else {
            // Switch back to profile image
            profileImage.src = profileImageSrc;
            profileImage.alt = "Michal Kováčik";
        }
        showingProfile = !showingProfile;
    };
    
    // Set interval for image switching on mobile
    let imageToggleInterval;
    
    // Function to start or stop the image toggle based on screen size
    const handleScreenSizeChange = () => {
        if (isMobileView()) {
            if (!imageToggleInterval) {
                imageToggleInterval = setInterval(toggleProfileImage, 3000); // Switch every 3 seconds
            }
        } else {
            // Reset to original images when not in mobile view
            if (imageToggleInterval) {
                clearInterval(imageToggleInterval);
                imageToggleInterval = null;
                profileImage.src = profileImageSrc;
                profileImage.alt = "Michal Kováčik";
            }
        }
    };
    
    // Initial check
    handleScreenSizeChange();
    
    // Listen for window resize events
    window.addEventListener('resize', handleScreenSizeChange);
    
    // Print functionality removed as it's redundant with Download CV
    
    // Add animation to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
    
    // Add animation to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
        }, 300 + (index * 150));
    });
    
    // Add animation to positions within experience items
    const positions = document.querySelectorAll('.position');
    positions.forEach((position, index) => {
        position.style.opacity = '0';
        position.style.transition = 'opacity 0.4s ease';
        
        setTimeout(() => {
            position.style.opacity = '1';
        }, 400 + (index * 100));
    });
    
    // Add Telekom-themed scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollIndicator.style.width = scrolled + '%';
        scrollIndicator.style.background = `var(--primary-color)`;
    });
    
    // Add download CV as PDF button
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download CV';
    downloadButton.id = 'download-button';
    downloadButton.classList.add('download-button');
    downloadButton.addEventListener('click', () => {
        // Temporarily show all achievements sections for printing
        const achievementsSections = document.querySelectorAll('.achievements-section');
        const achievementToggles = document.querySelectorAll('.achievements-toggle');
        
        // Store original states to restore after printing
        const originalStates = [];
        achievementsSections.forEach((section, index) => {
            originalStates.push({
                sectionHasActiveClass: section.classList.contains('active'),
                toggleHasActiveClass: achievementToggles[index] ? achievementToggles[index].classList.contains('active') : false,
                toggleHTML: achievementToggles[index] ? achievementToggles[index].innerHTML : ''
            });
            
            // Make all achievements visible for printing
            section.classList.add('print-visible');
        });
        
        // Print the document
        window.print();
        
        // Restore original states after printing
        setTimeout(() => {
            achievementsSections.forEach((section, index) => {
                section.classList.remove('print-visible');
                
                // Restore original state
                if (!originalStates[index].sectionHasActiveClass) {
                    section.classList.remove('active');
                }
                
                if (achievementToggles[index]) {
                    if (!originalStates[index].toggleHasActiveClass) {
                        achievementToggles[index].classList.remove('active');
                    }
                    achievementToggles[index].innerHTML = originalStates[index].toggleHTML;
                }
            });
        }, 1000); // Small delay to ensure print dialog has opened
    });
    document.body.appendChild(downloadButton);
    
    // Add all styles in one style element
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .scroll-indicator {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
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
    
    // Enhanced Achievements toggle functionality with hover and click behavior, optimized for both desktop and mobile
    const achievementToggles = document.querySelectorAll('.achievements-toggle');
    
    // Detect if device is mobile/touch
    const isTouchDevice = () => {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    };
    
    const isTouch = isTouchDevice();
    
    achievementToggles.forEach(toggle => {
        const achievementsSection = toggle.nextElementSibling;
        let isPinned = false;
        
        // Animation function for achievement items
        const animateAchievements = () => {
            const achievementItems = achievementsSection.querySelectorAll('.achievements-list li');
            achievementItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-10px)';
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 50 + (index * 80));
            });
        };
        
        if (!isTouch) {
            // Desktop behavior - hover and click
            
            // Show on hover
            toggle.addEventListener('mouseenter', function() {
                if (!isPinned) {
                    achievementsSection.classList.add('active');
                    this.innerHTML = '<i class="fas fa-thumbtack"></i> Pin View';
                    animateAchievements();
                }
            });
            
            // Hide on mouse leave if not pinned
            toggle.addEventListener('mouseleave', function() {
                if (!isPinned) {
                    achievementsSection.classList.remove('active');
                    this.innerHTML = '<i class="fas fa-trophy"></i> Achievements';
                }
            });
        }
        
        // Pin/unpin on click (works for both desktop and mobile)
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            isPinned = !isPinned;
            
            if (isPinned) {
                // Pin it open
                this.classList.add('active');
                achievementsSection.classList.add('active');
                this.innerHTML = '<i class="fas fa-thumbtack"></i> Unpin';
                animateAchievements();
            } else {
                // Unpin it
                this.classList.remove('active');
                achievementsSection.classList.remove('active');
                this.innerHTML = '<i class="fas fa-trophy"></i> Achievements';
            }
        });
    });
    
    // Initialize all achievement toggles with the trophy icon
    achievementToggles.forEach(toggle => {
        toggle.innerHTML = '<i class="fas fa-trophy"></i> Achievements';
    });
});
