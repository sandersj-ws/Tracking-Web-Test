document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                mobileBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });

        // Close mobile menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // Sticky header styling on scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-lg', 'bg-dark-900/80');
                header.classList.remove('bg-dark-900/50');
                header.style.paddingTop = '0.75rem';
                header.style.paddingBottom = '0.75rem';
            } else {
                header.classList.remove('shadow-lg', 'bg-dark-900/80');
                header.classList.add('bg-dark-900/50');
                header.style.paddingTop = '1rem';
                header.style.paddingBottom = '1rem';
            }
        });
    }

    // Scroll Reveal implementation (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);
        
        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    }

    // Form submission mock for Contact Us
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Success! We will be in touch.';
                btn.classList.add('from-green-500', 'to-green-400');
                btn.classList.remove('from-neon-purple', 'to-neon-cyan');
                
                // Clear inputs
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => input.value = '');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.remove('from-green-500', 'to-green-400');
                    btn.classList.add('from-neon-purple', 'to-neon-cyan');
                }, 4000);
            }, 1500);
        });
    }
});
