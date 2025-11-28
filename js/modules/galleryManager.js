/**
 * Gallery Manager Module
 * Handles all gallery-related functionality including image display, modal, and navigation
 */

import { Utils } from '../core/utils.js';
import { ErrorHandler } from '../core/errorHandler.js';

export const GalleryManager = {
    // Configuration
    config: {
        galleries: {
            "ExplorationDay2025": {
                title: "Conference Presentation on Exploration Day 2025: Exploring new solutions with your data and AI",
                path: "img/events/ExplorationDay2025/",
                images: ['04c2d248-be5e-451b-8307-b2f670a00983.jpeg', '20251118_EXPLO_0059.jpeg', '40ac7bec-1627-4fa0-874d-9a7332223119.jpeg']
            },
            "Techcelerate2025": {
                title: "Conference Presentation on Internal Techcelerate 2025 Conference in Budapest, Kosice, Valencia, Thessaloniki and Bonn: Update on AI@DTIT. New tools state of the art and ready to use",
                path: "https://media.githubusercontent.com/media/MKovacik/cv/main/img/events/Techcelerate2025/",
                images: ['IMG_0071.jpeg', 'IMG_6251.jpeg', 'TechCelerate2025_Map.png']
            },
            "Techcelerate2024": {
                title: "Conference Presentation on Internal Techcelerate Conference in Kosice and AI Accelarate Conference in Budapest: Chatbot Factory",
                path: "https://media.githubusercontent.com/media/MKovacik/cv/main/img/events/Techcelerate2024/",
                images: ['IMG_0552.jpeg', 'IMG_1123.jpeg']
            },
            "AllLeadsEssen2024": {
                title: "Conference Presentation on Internal All DTIT Management Conference in Essen: How to code with AI (500 leaders)",
                path: "https://media.githubusercontent.com/media/MKovacik/cv/main/img/events/AllLeadsEssen2024/",
                images: ['IMG_8182.jpeg', 'IMG_8184.jpeg']
            },
            "WeAreDevelopers": {
                title: "Conference Presentation on WeAreDevelopers Conference in Berlin: How to code for visual impairment people (+workshop)",
                path: "https://media.githubusercontent.com/media/MKovacik/cv/main/img/events/WeAreDevelopers/",
                images: ['IMG_4641.jpeg', 'IMG_9965.jpeg', 'IMG_9970.jpeg']
            },
            "Hackathons": {
                title: "Supported local developer communities",
                path: "https://media.githubusercontent.com/media/MKovacik/cv/main/img/events/Hackathons/",
                images: ['IMG_0047.jpeg', 'IMG_0135.jpeg', 'IMG_0137.jpeg', 'IMG_0140.jpeg']
            },
            "HackathonKosice": {
                title: "Organizing hackathons in Kosice (400+ participants - biggest hackathon in Eastern Europe)",
                path: "https://media.githubusercontent.com/media/MKovacik/cv/main/img/events/HackathonKosice/",
                images: ['Hack-121.jpg', 'Hack2.jpeg', 'Hack3.JPG']
            }
        }
    },

    // State management
    state: {
        currentGallery: '',
        currentIndex: 0,
        isModalOpen: false
    },

    /**
     * Initializes the gallery system
     */
    init() {
        return ErrorHandler.wrapFunction(() => {
            this.createGalleryModal();
            this.initializeGalleryIcons();
            this.setupKeyboardNavigation();
        }, 'GalleryManager.init', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Creates the gallery modal structure
     */
    createGalleryModal() {
        const modal = Utils.createElement('div', {
            className: 'gallery-modal',
            id: 'gallery-modal'
        });

        if (!modal) {
            throw new Error('Failed to create gallery modal');
        }

        const modalContent = Utils.createElement('div', {
            className: 'gallery-modal-content'
        });

        const modalImage = Utils.createElement('img', {
            className: 'gallery-modal-image',
            id: 'gallery-modal-image'
        });

        const closeButton = Utils.createElement('button', {
            className: 'gallery-modal-close'
        });
        closeButton.innerHTML = '<i class="fas fa-times"></i>';

        const prevButton = Utils.createElement('div', {
            className: 'gallery-modal-nav gallery-modal-prev'
        });
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';

        const nextButton = Utils.createElement('div', {
            className: 'gallery-modal-nav gallery-modal-next'
        });
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';

        // Assemble modal
        modalContent.appendChild(modalImage);
        modalContent.appendChild(closeButton);
        modalContent.appendChild(prevButton);
        modalContent.appendChild(nextButton);
        modal.appendChild(modalContent);

        // Add event listeners
        Utils.safeAddEventListener(closeButton, 'click', () => this.closeGalleryModal());
        Utils.safeAddEventListener(prevButton, 'click', () => this.showPrevImage());
        Utils.safeAddEventListener(nextButton, 'click', () => this.showNextImage());

        document.body.appendChild(modal);
    },

    /**
     * Initializes gallery icons that are already in the HTML
     */
    initializeGalleryIcons() {
        const galleryIcons = {
            'gallery-ExplorationDay2025': 'ExplorationDay2025',
            'gallery-Techcelerate2025': 'Techcelerate2025',
            'gallery-Techcelerate2024': 'Techcelerate2024',
            'gallery-AllLeadsEssen2024': 'AllLeadsEssen2024',
            'gallery-WeAreDevelopers': 'WeAreDevelopers',
            'gallery-Hackathons': 'Hackathons',
            'gallery-HackathonKosice': 'HackathonKosice'
        };

        Object.keys(galleryIcons).forEach(iconId => {
            const iconElement = Utils.safeGetElementById(iconId);
            if (iconElement) {
                const galleryId = galleryIcons[iconId];
                this.setupGalleryIcon(iconElement, galleryId);
            }
        });
    },

    /**
     * Sets up a specific gallery icon
     * @param {HTMLElement} iconElement - The gallery icon element
     * @param {string} galleryId - The gallery ID
     */
    setupGalleryIcon(iconElement, galleryId) {
        const galleryConfig = this.config.galleries[galleryId];
        if (!galleryConfig) {
            ErrorHandler.logError(
                `Gallery configuration not found for: ${galleryId}`,
                ErrorHandler.ErrorTypes.VALIDATION_ERROR,
                ErrorHandler.Severity.MEDIUM
            );
            return;
        }

        // Create gallery container
        const galleryContainer = Utils.createElement('div', {
            className: 'gallery-container'
        });

        // Add gallery title
        const galleryTitle = Utils.createElement('div', {
            className: 'gallery-title'
        }, galleryConfig.title);
        galleryContainer.appendChild(galleryTitle);

        // Create images container
        const galleryImages = Utils.createElement('div', {
            className: 'gallery-images'
        });

        // Create thumbnail images
        galleryConfig.images.forEach((imageName, index) => {
            const img = Utils.createElement('img', {
                className: 'gallery-image',
                src: galleryConfig.path + imageName,
                alt: `${galleryConfig.title} image ${index + 1}`
            });

            // Add click event to open modal
            Utils.safeAddEventListener(img, 'click', () => 
                this.openGalleryModal(galleryId, index)
            );

            // Add error handling for missing images
            Utils.safeAddEventListener(img, 'error', function() {
                this.src = this.createPlaceholderImage();
                this.alt = 'Image not available';
            }.bind(this));

            galleryImages.appendChild(img);
        });

        galleryContainer.appendChild(galleryImages);
        iconElement.appendChild(galleryContainer);

        // Add click event to open the first image in modal
        Utils.safeAddEventListener(iconElement, 'click', () => 
            this.openGalleryModal(galleryId, 0)
        );
    },

    /**
     * Opens the gallery modal with specified image
     * @param {string} galleryId - Gallery ID
     * @param {number} index - Image index
     */
    openGalleryModal(galleryId, index) {
        return ErrorHandler.wrapFunction(() => {
            const modal = Utils.safeGetElementById('gallery-modal');
            const modalImage = Utils.safeGetElementById('gallery-modal-image');

            if (!modal || !modalImage) {
                throw new Error('Gallery modal elements not found');
            }

            const galleryConfig = this.config.galleries[galleryId];
            if (!galleryConfig || !galleryConfig.images[index]) {
                throw new Error(`Invalid gallery or image index: ${galleryId}[${index}]`);
            }

            this.state.currentGallery = galleryId;
            this.state.currentIndex = index;
            this.state.isModalOpen = true;

            const imagePath = galleryConfig.path + galleryConfig.images[index];
            modalImage.src = imagePath;
            modalImage.alt = `Gallery image ${index + 1}`;

            // Error handling for modal image
            Utils.safeAddEventListener(modalImage, 'error', function() {
                this.src = this.createPlaceholderImage(800, 600);
            }.bind(this), { once: true });

            // Show the modal
            modal.classList.add('active');

            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden';
        }, 'GalleryManager.openGalleryModal', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Closes the gallery modal
     */
    closeGalleryModal() {
        return ErrorHandler.wrapFunction(() => {
            const modal = Utils.safeGetElementById('gallery-modal');
            if (!modal) {
                throw new Error('Gallery modal not found');
            }

            modal.classList.remove('active');
            this.state.isModalOpen = false;

            // Re-enable scrolling
            document.body.style.overflow = '';
        }, 'GalleryManager.closeGalleryModal', ErrorHandler.ErrorTypes.DOM_ERROR)();
    },

    /**
     * Shows the previous image in the current gallery
     */
    showPrevImage() {
        if (!this.state.currentGallery) return;

        const imageCount = this.getImageCount(this.state.currentGallery);
        this.state.currentIndex = (this.state.currentIndex - 1 + imageCount) % imageCount;
        this.openGalleryModal(this.state.currentGallery, this.state.currentIndex);
    },

    /**
     * Shows the next image in the current gallery
     */
    showNextImage() {
        if (!this.state.currentGallery) return;

        const imageCount = this.getImageCount(this.state.currentGallery);
        this.state.currentIndex = (this.state.currentIndex + 1) % imageCount;
        this.openGalleryModal(this.state.currentGallery, this.state.currentIndex);
    },

    /**
     * Gets the number of images in a gallery
     * @param {string} galleryId - Gallery ID
     * @returns {number} - Number of images
     */
    getImageCount(galleryId) {
        const gallery = this.config.galleries[galleryId];
        return gallery ? gallery.images.length : 0;
    },

    /**
     * Sets up keyboard navigation for the gallery
     */
    setupKeyboardNavigation() {
        Utils.safeAddEventListener(document, 'keydown', (e) => {
            if (!this.state.isModalOpen) return;

            switch (e.key) {
                case 'Escape':
                    this.closeGalleryModal();
                    break;
                case 'ArrowLeft':
                    this.showPrevImage();
                    break;
                case 'ArrowRight':
                    this.showNextImage();
                    break;
            }
        });
    },

    /**
     * Creates a placeholder image data URL
     * @param {number} width - Image width
     * @param {number} height - Image height
     * @returns {string} - Data URL for placeholder image
     */
    createPlaceholderImage(width = 150, height = 80) {
        return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22${width}%22 height%3D%22${height}%22%3E%3Crect width%3D%22${width}%22 height%3D%22${height}%22 fill%3D%22%23f2f2f2%22%2F%3E%3Ctext x%3D%22${width/2}%22 y%3D%22${height/2}%22 font-family%3D%22Arial%22 font-size%3D%2212%22 text-anchor%3D%22middle%22 fill%3D%22%23999%22%3EImage not available%3C%2Ftext%3E%3C%2Fsvg%3E`;
    }
};