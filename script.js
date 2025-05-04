// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const hamburger = this.querySelector('.hamburger');
            hamburger.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                hamburger.style.transform = 'rotate(45deg)';
                hamburger.style.backgroundColor = 'transparent';
                hamburger.style.transition = 'var(--transition)';
                
                hamburger.style.before = {
                    transform: 'rotate(90deg)',
                    top: '0'
                };
                
                hamburger.style.after = {
                    transform: 'rotate(90deg)',
                    bottom: '0'
                };
            } else {
                hamburger.style.transform = 'rotate(0)';
                hamburger.style.backgroundColor = 'var(--text-color)';
            }
        });
    }

    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots-container');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        
        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.slide = i;
            dotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
        });
        
        const dots = document.querySelectorAll('.dot');
        
        function goToSlide(n) {
            slides[currentSlide].classList.remove('current');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('current');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        // Add click events to buttons
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Automatic slider
        let slideInterval = setInterval(nextSlide, 5000);
        
        const sliderContainer = document.querySelector('.slider-container');
        
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // Newsletter form validation
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                newsletterMessage.textContent = 'Please enter a valid email address.';
                newsletterMessage.style.color = 'var(--error-color)';
                return;
            }
            
            // Simulate form submission (would be replaced with actual AJAX call)
            newsletterMessage.textContent = 'Thank you for subscribing!';
            newsletterMessage.style.color = 'var(--success-color)';
            emailInput.value = '';
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                newsletterMessage.textContent = '';
            }, 3000);
        });
    }

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const formRows = contactForm.querySelectorAll('.form-row');
        const formMessage = document.getElementById('form-message');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let hasError = false;
            
            // Validate each input
            formRows.forEach(row => {
                const input = row.querySelector('input, textarea');
                if (!input) return;
                
                const errorElement = row.querySelector('.form-error');
                if (!errorElement) return;
                
                row.classList.remove('error');
                
                if (input.hasAttribute('required') && input.value.trim() === '') {
                    row.classList.add('error');
                    errorElement.textContent = 'This field is required';
                    hasError = true;
                } else if (input.type === 'email' && !isValidEmail(input.value.trim())) {
                    row.classList.add('error');
                    errorElement.textContent = 'Please enter a valid email address';
                    hasError = true;
                }
            });
            
            if (hasError) {
                formMessage.textContent = 'Please correct the errors below.';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Simulate form submission success
            formMessage.textContent = 'Your message has been sent successfully!';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        });
    }
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}