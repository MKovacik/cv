document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.textContent = 'Print CV';
    printButton.id = 'print-button';
    printButton.classList.add('print-button');
    printButton.addEventListener('click', () => {
        window.print();
    });
    document.body.appendChild(printButton);
    
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
    
    // Achievements toggle functionality
    const achievementToggles = document.querySelectorAll('.achievements-toggle');
    
    achievementToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Find the achievements section that follows this button
            const achievementsSection = this.nextElementSibling;
            
            // Toggle the active class on the achievements section
            achievementsSection.classList.toggle('active');
            
            // Update button text
            if (this.classList.contains('active')) {
                this.innerHTML = 'Hide Achievements <i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = 'View Achievements <i class="fas fa-chevron-down"></i>';
            }
        });
    });
});
