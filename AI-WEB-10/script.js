// Custom script for dynamic features and responsive behavior

// 1. Toggle Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. Dynamic interaction for hero button
function exploreMore() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 3. Contact form handling with animation
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // UI Feedback for processing
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    
    // Simulate network request asynchronously
    setTimeout(() => {
        const formStatus = document.getElementById('formStatus');
        formStatus.style.display = 'block';
        
        event.target.reset(); // Clear form fields
        
        // Reset Button UI
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }, 1500);
}

// 4. Scroll animation (Intersection Observer) for elements
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: Stop observing once faded in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial state and observe
    const animatedElements = document.querySelectorAll('.service-card, .glass-card');
    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
