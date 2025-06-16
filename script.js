document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Configuration
    const galleryConfig = {
        "Techcelerate2024": {
            title: "Conference Presentation on Internal Techcelerate Conference in Kosice and AI Accelarate Conference in Budapest: Chatbot Factory",
            path: "https://media.githubusercontent.com/media/MKovacik/cv/main/img/events/Techcelerate2024/"
        },
        "AllLeadsEssen2024": {
            title: "Conference Presentation on Internal All DTIT Management Conference in Essen: How to code with AI (500 leaders)",
            path: "https://media.githubusercontent.com/media/MKovacik/cv/main/img/events/AllLeadsEssen2024/"
        },
        "WeAreDevelopers": {
            title: "Conference Presentation on WeAreDevelopers Conference in Berlin: How to code for visual impairment people (+workshop)",
            path: "https://media.githubusercontent.com/media/MKovacik/cv/main/img/events/WeAreDevelopers/"
        },
        "Hackathons": {
            title: "Supported local developer communities",
            path: "https://media.githubusercontent.com/media/MKovacik/cv/main/img/events/Hackathons/"
        }
    };
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Image switching functionality for mobile view
    const profileImage = document.getElementById('profile-image');
    
    // Store original image sources
    const profileImageSrc = profileImage.src;
    const companyLogoSrc = 'img/DTE.DE-944bd2b4.png'; // Direct path to company logo
    
    // Function to check if device is mobile
    const isMobileView = () => window.innerWidth <= 768;
    
    // Add a white background to the profile image container for better logo visibility
    const addWhiteBackground = () => {
        if (isMobileView()) {
            profileImage.style.backgroundColor = '#ffffff';
        } else {
            profileImage.style.backgroundColor = '';
        }
    };
    
    // Create a smaller version of the company logo for the profile image
    const createSmallerLogo = () => {
        const canvas = document.createElement('canvas');
        const img = new Image();
        
        return new Promise((resolve) => {
            img.onload = () => {
                // Set canvas size to match profile image dimensions but slightly smaller
                canvas.width = 150;
                canvas.height = 150;
                const ctx = canvas.getContext('2d');
                
                // Fill with white background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Calculate dimensions to maintain aspect ratio and add padding
                const padding = 30; // Padding on each side
                const maxWidth = canvas.width - (padding * 2);
                const maxHeight = canvas.height - (padding * 2);
                
                let newWidth, newHeight;
                
                if (img.width / img.height > maxWidth / maxHeight) {
                    // Image is wider than tall
                    newWidth = maxWidth;
                    newHeight = (img.height * maxWidth) / img.width;
                } else {
                    // Image is taller than wide
                    newHeight = maxHeight;
                    newWidth = (img.width * maxHeight) / img.height;
                }
                
                // Center the image
                const x = (canvas.width - newWidth) / 2;
                const y = (canvas.height - newHeight) / 2;
                
                // Draw the image with the new dimensions
                ctx.drawImage(img, x, y, newWidth, newHeight);
                
                // Get the data URL
                resolve(canvas.toDataURL('image/png'));
            };
            
            img.src = companyLogoSrc;
        });
    };
    
    // Store the smaller logo URL
    let smallerLogoSrc = '';
    createSmallerLogo().then(url => {
        smallerLogoSrc = url;
    });
    
    // Function to toggle between profile image and company logo with simple cross-fade
    let showingProfile = true;
    let isAnimating = false;
    
    const toggleProfileImage = () => {
        if (!isMobileView() || isAnimating) return; // Only run on mobile view and when not already animating
        
        isAnimating = true;
        
        // Fade out
        profileImage.style.opacity = '0';
        
        // Change the image when faded out
        setTimeout(() => {
            if (showingProfile) {
                // Switch to company logo
                if (smallerLogoSrc) {
                    profileImage.src = smallerLogoSrc;
                } else {
                    profileImage.src = companyLogoSrc;
                }
                profileImage.alt = "Deutsche Telekom Logo";
            } else {
                // Switch back to profile image
                profileImage.src = profileImageSrc;
                profileImage.alt = "Michal Kováčik";
            }
            
            // Fade in
            setTimeout(() => {
                profileImage.style.opacity = '1';
                
                // Reset after fade completes
                setTimeout(() => {
                    isAnimating = false;
                    showingProfile = !showingProfile;
                }, 400);
            }, 50);
            
        }, 400); // Match the CSS transition duration
    };
    
    // Set interval for image switching on mobile
    let imageToggleInterval;
    
    // Function to start or stop the image toggle based on screen size
    const handleScreenSizeChange = () => {
        addWhiteBackground(); // Add white background for better logo visibility
        
        if (isMobileView()) {
            if (!imageToggleInterval) {
                imageToggleInterval = setInterval(toggleProfileImage, 2000); // Switch every 2 seconds
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
    
    // Image Gallery functionality
    function createGalleryIcon(galleryId) {
        if (!galleryConfig[galleryId]) return null;
        
        const galleryIcon = document.createElement('span');
        galleryIcon.className = 'gallery-icon';
        galleryIcon.innerHTML = '<i class="fas fa-images"></i><span class="gallery-icon-pulse"></span>';
        
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery-container';
        
        // Remove title element since we don't need text
        
        const galleryImages = document.createElement('div');
        galleryImages.className = 'gallery-images';
        galleryImages.innerHTML = '';
        
        // Use actual images from the directories
        let eventImages = [];
        
        // Set up the actual images based on gallery ID
        if (galleryId === 'Techcelerate2024') {
            eventImages = [
                { src: galleryConfig[galleryId].path + 'IMG_0552.jpeg', alt: 'Techcelerate Conference photo 1' },
                { src: galleryConfig[galleryId].path + 'IMG_1123.jpeg', alt: 'Techcelerate Conference photo 2' }
            ];
        } else if (galleryId === 'AllLeadsEssen2024') {
            eventImages = [
                { src: galleryConfig[galleryId].path + 'IMG_8182.jpeg', alt: 'DTIT Management Conference photo 1' },
                { src: galleryConfig[galleryId].path + 'IMG_8184.jpeg', alt: 'DTIT Management Conference photo 2' }
            ];
        } else if (galleryId === 'WeAreDevelopers') {
            eventImages = [
                { src: galleryConfig[galleryId].path + 'IMG_4641.jpeg', alt: 'WeAreDevelopers Conference photo 1' },
                { src: galleryConfig[galleryId].path + 'IMG_9965.jpeg', alt: 'WeAreDevelopers Conference photo 2' },
                { src: galleryConfig[galleryId].path + 'IMG_9970.jpeg', alt: 'WeAreDevelopers Conference photo 3' }
            ];
        } else if (galleryId === 'Hackathons') {
            eventImages = [
                { src: galleryConfig[galleryId].path + 'IMG_0135.jpeg', alt: 'Hackathon photo 1' },
                { src: galleryConfig[galleryId].path + 'IMG_0137.jpeg', alt: 'Hackathon photo 2' },
                { src: galleryConfig[galleryId].path + 'IMG_0140.jpeg', alt: 'Hackathon photo 3' }
            ];
        }
        
        // Create image elements
        galleryImages.innerHTML = '';
        eventImages.forEach((img, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.alt;
            imgElement.className = 'gallery-image';
            imgElement.dataset.index = index;
            imgElement.dataset.galleryId = galleryId;
            
            // Error handling for images that don't exist yet
            imgElement.onerror = function() {
                // Use a data URL for the placeholder instead of an external service
                this.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22150%22 height%3D%2280%22%3E%3Crect width%3D%22150%22 height%3D%2280%22 fill%3D%22%23f2f2f2%22%2F%3E%3Ctext x%3D%2275%22 y%3D%2240%22 font-family%3D%22Arial%22 font-size%3D%2212%22 text-anchor%3D%22middle%22 fill%3D%22%23999%22%3EImage not available%3C%2Ftext%3E%3C%2Fsvg%3E';
            };
            
            imgElement.addEventListener('click', function() {
                openGalleryModal(galleryId, parseInt(this.dataset.index));
            });
            
            galleryImages.appendChild(imgElement);
        });
        
        // Only append the images container since we removed the title
        galleryContainer.appendChild(galleryImages);
        galleryIcon.appendChild(galleryContainer);
        
        return galleryIcon;
    }
    
    // Create gallery modal for fullscreen viewing
    function createGalleryModal() {
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.id = 'gallery-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'gallery-modal-content';
        
        const modalImage = document.createElement('img');
        modalImage.className = 'gallery-modal-image';
        modalImage.id = 'gallery-modal-image';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'gallery-modal-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.addEventListener('click', closeGalleryModal);
        
        const prevButton = document.createElement('div');
        prevButton.className = 'gallery-modal-nav gallery-modal-prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.addEventListener('click', showPrevImage);
        
        const nextButton = document.createElement('div');
        nextButton.className = 'gallery-modal-nav gallery-modal-next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.addEventListener('click', showNextImage);
        
        modalContent.appendChild(modalImage);
        modalContent.appendChild(closeButton);
        modalContent.appendChild(prevButton);
        modalContent.appendChild(nextButton);
        modal.appendChild(modalContent);
        
        document.body.appendChild(modal);
    }
    
    // Current gallery state
    let currentGallery = '';
    let currentIndex = 0;
    
    // Open gallery modal
    function openGalleryModal(galleryId, index) {
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('gallery-modal-image');
        
        currentGallery = galleryId;
        currentIndex = index;
        
        // Get the image path based on the gallery ID and index
        let imagePath = '';
        if (galleryId === 'Techcelerate2024') {
            imagePath = index === 0 ? galleryConfig[galleryId].path + 'IMG_0552.jpeg' : galleryConfig[galleryId].path + 'IMG_1123.jpeg';
        } else if (galleryId === 'AllLeadsEssen2024') {
            imagePath = index === 0 ? galleryConfig[galleryId].path + 'IMG_8182.jpeg' : galleryConfig[galleryId].path + 'IMG_8184.jpeg';
        } else if (galleryId === 'WeAreDevelopers') {
            if (index === 0) imagePath = galleryConfig[galleryId].path + 'IMG_4641.jpeg';
            else if (index === 1) imagePath = galleryConfig[galleryId].path + 'IMG_9965.jpeg';
            else imagePath = galleryConfig[galleryId].path + 'IMG_9970.jpeg';
        } else if (galleryId === 'Hackathons') {
            if (index === 0) imagePath = galleryConfig[galleryId].path + 'IMG_0135.jpeg';
            else if (index === 1) imagePath = galleryConfig[galleryId].path + 'IMG_0137.jpeg';
            else imagePath = galleryConfig[galleryId].path + 'IMG_0140.jpeg';
        }
        
        modalImage.src = imagePath;
        modalImage.alt = 'Gallery image ' + (index + 1);
        
        // Error handling
        modalImage.onerror = function() {
            // Use a data URL for the placeholder instead of an external service
            this.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22800%22 height%3D%22600%22%3E%3Crect width%3D%22800%22 height%3D%22600%22 fill%3D%22%23f2f2f2%22%2F%3E%3Ctext x%3D%22400%22 y%3D%22300%22 font-family%3D%22Arial%22 font-size%3D%2224%22 text-anchor%3D%22middle%22 fill%3D%22%23999%22%3EImage not available%3C%2Ftext%3E%3C%2Fsvg%3E';
        };
        
        // Show the modal
        modal.classList.add('active');
        
        // Prevent scrolling on the body
        document.body.style.overflow = 'hidden';
    }
    
    // Close gallery modal
    function closeGalleryModal() {
        const modal = document.getElementById('gallery-modal');
        modal.classList.remove('active');
        
        // Re-enable scrolling
        document.body.style.overflow = '';
    }
    
    // Show previous image
    function showPrevImage() {
        if (!currentGallery) return;
        
        // Get the number of images for the current gallery
        let imageCount = getImageCount(currentGallery);
        currentIndex = (currentIndex - 1 + imageCount) % imageCount;
        openGalleryModal(currentGallery, currentIndex);
    }
    
    // Show next image
    function showNextImage() {
        if (!currentGallery) return;
        
        // Get the number of images for the current gallery
        let imageCount = getImageCount(currentGallery);
        currentIndex = (currentIndex + 1) % imageCount;
        openGalleryModal(currentGallery, currentIndex);
    }
    
    // Helper function to get image count for a gallery
    function getImageCount(galleryId) {
        if (galleryId === 'Techcelerate2024') return 2;
        if (galleryId === 'AllLeadsEssen2024') return 2;
        if (galleryId === 'WeAreDevelopers') return 3;
        if (galleryId === 'Hackathons') return 3;
        return 1; // Default fallback
    }
    
    // Add keyboard navigation for gallery
    document.addEventListener('keydown', function(e) {
        if (!document.getElementById('gallery-modal').classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeGalleryModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });

    // Create the gallery modal
    createGalleryModal();

    // Initialize gallery icons that are already in the HTML
    const galleryIcons = {
        'gallery-Techcelerate2024': 'Techcelerate2024',
        'gallery-AllLeadsEssen2024': 'AllLeadsEssen2024',
        'gallery-WeAreDevelopers': 'WeAreDevelopers',
        'gallery-Hackathons': 'Hackathons'
    };

    // Process each gallery icon
    Object.keys(galleryIcons).forEach(iconId => {
        const iconElement = document.getElementById(iconId);
        if (iconElement) {
            const galleryId = galleryIcons[iconId];
            
            // Create gallery container
            const galleryContainer = document.createElement('div');
            galleryContainer.className = 'gallery-container';
            
            // Add gallery title
            const galleryTitle = document.createElement('div');
            galleryTitle.className = 'gallery-title';
            galleryTitle.textContent = galleryConfig[galleryId].title;
            galleryContainer.appendChild(galleryTitle);
            
            // Create images container
            const galleryImages = document.createElement('div');
            galleryImages.className = 'gallery-images';
            
            // Add images based on gallery ID
            let imagesToAdd = [];
            if (galleryId === 'Techcelerate2024') {
                imagesToAdd = ['IMG_0552.jpeg', 'IMG_1123.jpeg'];
            } else if (galleryId === 'AllLeadsEssen2024') {
                imagesToAdd = ['IMG_8182.jpeg', 'IMG_8184.jpeg'];
            } else if (galleryId === 'WeAreDevelopers') {
                imagesToAdd = ['IMG_4641.jpeg', 'IMG_9965.jpeg', 'IMG_9970.jpeg'];
            } else if (galleryId === 'Hackathons') {
                imagesToAdd = ['IMG_0135.jpeg', 'IMG_0137.jpeg', 'IMG_0140.jpeg'];
            }
            
            // Create thumbnail images
            imagesToAdd.forEach((imageName, index) => {
                const img = document.createElement('img');
                img.className = 'gallery-image';
                img.src = galleryConfig[galleryId].path + imageName;
                img.alt = galleryConfig[galleryId].title + ' image ' + (index + 1);
                img.addEventListener('click', () => openGalleryModal(galleryId, index));
                img.addEventListener('error', function() {
                    this.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22150%22 height%3D%2280%22%3E%3Crect width%3D%22150%22 height%3D%2280%22 fill%3D%22%23f2f2f2%22%2F%3E%3Ctext x%3D%2275%22 y%3D%2240%22 font-family%3D%22Arial%22 font-size%3D%2212%22 text-anchor%3D%22middle%22 fill%3D%22%23999%22%3EImage not available%3C%2Ftext%3E%3C%2Fsvg%3E';
                    this.alt = 'Image not available';
                });
                galleryImages.appendChild(img);
            });
            
            galleryContainer.appendChild(galleryImages);
            iconElement.appendChild(galleryContainer);
            
            // Add click event to open the first image in modal
            iconElement.addEventListener('click', () => openGalleryModal(galleryId, 0));
        }
    });
});
