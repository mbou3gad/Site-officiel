document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in, .slide-up, .image-reveal');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                // Automatically add staggers to children if it's a grid/list
                const staggerChildren = entry.target.querySelectorAll('.stagger-child');
                staggerChildren.forEach((child, index) => {
                    child.style.transitionDelay = `${(index + 1) * 100}ms`;
                    child.classList.add('appear');
                });
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

