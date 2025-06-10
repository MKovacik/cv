document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Animate fact cards
    const factCards = document.querySelectorAll('.fact-card');
    factCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
    
    // Animate timeline items
    const timelineContents = document.querySelectorAll('.timeline-content');
    timelineContents.forEach((content, index) => {
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
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
