/**
 * Alternative CV JavaScript - Interactive Features
 * 
 * Features:
 * - Smooth scrolling navigation
 * - Dark mode toggle
 * - Animated skill charts (radial progress)
 * - Scroll-triggered animations
 * - Mobile navigation toggle
 * - Responsive design adaptations
 */

class AltCV {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupThemeToggle();
        this.setupScrollAnimations();
        this.setupSkillCharts();
        this.setupMobileNavigation();
        this.addSVGGradients();
        
        // Initial animations
        this.animateOnLoad();
    }

    setupEventListeners() {
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
        document.addEventListener('DOMContentLoaded', this.handleDOMContentLoaded.bind(this));
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.querySelector('.nav-bar');

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                    this.smoothScrollTo(offsetTop);
                    
                    // Update active link
                    this.updateActiveNavLink(link);
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });

        // Update navbar background on scroll
        this.handleScroll();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            this.setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add click animation
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = document.querySelector('#theme-toggle i');
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Special handling for skill charts
                    if (entry.target.classList.contains('skill-chart')) {
                        this.animateSkillChart(entry.target);
                    }
                    
                    // Special handling for skill bubbles
                    if (entry.target.classList.contains('skill-bubble')) {
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, Math.random() * 300);
                    }
                }
            });
        }, observerOptions);

        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        // Observe skill charts
        document.querySelectorAll('.skill-chart').forEach(chart => {
            observer.observe(chart);
        });

        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });

        // Observe skill bubbles
        document.querySelectorAll('.skill-bubble').forEach((bubble, index) => {
            bubble.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(bubble);
        });
    }

    setupSkillCharts() {
        const charts = document.querySelectorAll('.skill-chart');
        
        charts.forEach(chart => {
            const level = parseInt(chart.getAttribute('data-level'));
            const progressCircle = chart.querySelector('.chart-progress');
            const percentageText = chart.querySelector('.chart-percentage');
            
            // Calculate stroke-dashoffset based on percentage
            const circumference = 2 * Math.PI * 45; // radius = 45
            const offset = circumference - (level / 100) * circumference;
            
            // Store the final values for animation
            chart.dataset.finalOffset = offset;
            chart.dataset.finalPercentage = level;
            
            // Set initial state
            progressCircle.style.strokeDashoffset = circumference;
            percentageText.textContent = '0%';
        });
    }

    animateSkillChart(chart) {
        const progressCircle = chart.querySelector('.chart-progress');
        const percentageText = chart.querySelector('.chart-percentage');
        const finalOffset = parseFloat(chart.dataset.finalOffset);
        const finalPercentage = parseInt(chart.dataset.finalPercentage);
        
        // Animate the progress circle
        setTimeout(() => {
            progressCircle.style.strokeDashoffset = finalOffset;
        }, 300);
        
        // Animate the percentage counter
        this.animateCounter(percentageText, 0, finalPercentage, 2000, '%');
    }

    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }

    addSVGGradients() {
        // Create SVG gradients for skill charts
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.display = 'none';
        svg.innerHTML = `
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                </linearGradient>
            </defs>
        `;
        document.body.appendChild(svg);
    }

    handleScroll() {
        const navbar = document.querySelector('.nav-bar');
        const scrollTop = window.pageYOffset;
        
        // Add/remove scrolled class to navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link based on scroll position
        this.updateActiveNavigation();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollTop = window.pageYOffset;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    handleResize() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    handleDOMContentLoaded() {
        // Add any additional setup that needs to happen after DOM is loaded
        this.preloadImages();
    }

    preloadImages() {
        const images = [
            'https://media.githubusercontent.com/media/MKovacik/cv/main/img/MK_Formal_01.jpg',
            'https://media.githubusercontent.com/media/MKovacik/cv/main/img/DTE.DE-944bd2b4.png'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    animateOnLoad() {
        // Trigger initial animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-text > *');
            heroElements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.2}s`;
            });
        }, 100);
    }

    smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    animateCounter(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const range = end - start;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const value = Math.floor(start + (range * this.easeOutQuad(progress)));
            element.textContent = value + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    easeOutQuad(t) {
        return t * (2 - t);
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Public methods for external access
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80;
            this.smoothScrollTo(offsetTop);
        }
    }

    toggleTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.altCV = new AltCV();
});

// Add some global utility functions
window.scrollToTop = () => {
    window.altCV.smoothScrollTo(0);
};

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('active')) {
            window.altCV.closeMobileMenu();
        }
    }
    
    // Arrow keys for section navigation
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                window.scrollToTop();
                break;
            case 'ArrowDown':
                e.preventDefault();
                window.altCV.scrollToSection('contact');
                break;
        }
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swiped up - could trigger some action
            console.log('Swiped up');
        } else {
            // Swiped down - could trigger some action
            console.log('Swiped down');
        }
    }
}

// Performance monitoring (optional - for development)
if (window.performance && window.performance.mark) {
    window.performance.mark('alt-cv-script-loaded');
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Alt CV Error:', e.error);
});

// Debug information (remove in production)
console.log('Alternative CV loaded successfully');
console.log('Features available: Navigation, Theme Toggle, Animations, Mobile Support');

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AltCV;
}