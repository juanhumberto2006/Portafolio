// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(230, 57, 70, 0.1)';
        navbar.style.borderBottom = '1px solid rgba(230, 57, 70, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                // Get the width from the inline style or a data attribute if we used one
                // In the HTML I set style="width: 90%", so we don't strictly need this animation logic 
                // unless we want to start from 0 and animate to the value.
                // Let's make it robust by reading the style width and resetting it to animate
                const targetWidth = skillProgress.style.width;
                skillProgress.style.width = '0';
                setTimeout(() => {
                    skillProgress.style.width = targetWidth;
                }, 100);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('¡Mensaje enviado exitosamente! Te contactaré pronto. 🚀');
        this.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 2000);
});

// Navbar highlight active section
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});