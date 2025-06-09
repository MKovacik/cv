document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('#navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('#navbar').offsetHeight,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('#navbar a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = document.querySelector('#navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 10;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Add active class styling
    const style = document.createElement('style');
    style.textContent = `
        #navbar a.active {
            color: var(--primary-color);
            background-color: var(--accent-color);
            border-bottom: 3px solid var(--primary-color);
        }
    `;
    document.head.appendChild(style);
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.textContent = 'Print CV';
    printButton.id = 'print-button';
    printButton.classList.add('print-button');
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    // Add button styles
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
        .print-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 16px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: all 0.3s;
            z-index: 100;
        }
        
        .print-button:hover {
            background-color: var(--secondary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        @media print {
            .print-button {
                display: none;
            }
        }
    `;
    document.head.appendChild(buttonStyle);
    document.body.appendChild(printButton);
});
