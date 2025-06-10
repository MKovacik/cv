document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Add interactive hover effects for fact cards
    const factCards = document.querySelectorAll('.fact-card');
    factCards.forEach((card, index) => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX * 5; // Max tilt of 5 degrees
            const deltaY = (y - centerY) / centerY * 5;
            
            this.style.transform = `translateY(-10px) scale(1.02) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Animate fact cards
    factCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }
        }, 300 * index);
        
        // Add magnetic effect to timeline dots
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
            item.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = dot.getBoundingClientRect().top - rect.top;
                
                const deltaX = (x - centerX) / 30;
                
                if (Math.abs(y - centerY) < 50 && Math.abs(x - centerX) < 100) {
                    dot.style.transform = `translateX(calc(-50% + ${deltaX}px)) scale(1.5)`;
                } else {
                    dot.style.transform = 'translateX(-50%)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                dot.style.transform = 'translateX(-50%)';
            });
        }
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate skill bars when they come into view
    function animateSkillBars() {
        skillBars.forEach(bar => {
            if (isInViewport(bar) && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }
    
    // Initial check for elements in viewport
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
    });
    
    // Add hover effect to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseover', () => {
            profileImage.style.transform = 'scale(1.05) rotate(3deg)';
        });
        
        profileImage.addEventListener('mouseout', () => {
            profileImage.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollIndicator.style.width = scrolled + '%';
    });
    
    // Add styles for scroll indicator
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .scroll-indicator {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            width: 0;
            background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
            z-index: 9999;
        }
    `;
    document.head.appendChild(styleElement);
});
