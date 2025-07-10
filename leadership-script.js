document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations if AOS is available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Set up proof toggles
    const proofCheckboxes = document.querySelectorAll('.proof-checkbox');
    
    proofCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const proofContent = this.parentElement.nextElementSibling;
            const icon = this.nextElementSibling.querySelector('i');
            
            if (this.checked) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Pre-check all proof checkboxes to show they're proven
    proofCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
        const event = new Event('change');
        checkbox.dispatchEvent(event);
    });
});
