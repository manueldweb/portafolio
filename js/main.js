/**
 * Main JavaScript for Manuel Fernández Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    // In a full implementation, you'd expand the menu visually. 
    // Here we console log for demonstration or create a simple toggle logic.
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Very simple mobile toggle (needs CSS update if it were fully fleshed out, 
            // but keeps logic clear here)
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
            if(navList.style.display === 'flex') {
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '70px';
                navList.style.left = '0';
                navList.style.width = '100%';
                navList.style.background = '#fff';
                navList.style.padding = '2rem';
                navList.style.boxShadow = '0 10px 15px rgba(0,0,0,0.05)';
            }
        });
    }

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // close mobile menu if opened
                if (window.innerWidth <= 768 && navList) {
                    navList.style.display = 'none';
                }
            }
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.fade-in-up, .reveal-left, .reveal-right, .reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Contact Form to WhatsApp
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            const baseText = `Hola Manuel, me interesa iniciar un proyecto web.\n\n*Nombre:* ${name}\n*Correo:* ${email}\n\n*Detalles:* ${message}`;
            const encodedText = encodeURIComponent(baseText);
            const whatsappUrl = `https://wa.me/584128888352?text=${encodedText}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
});
