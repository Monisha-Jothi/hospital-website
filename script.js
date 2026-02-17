// ============================================================
// MEDIPORTAL — ENHANCED JAVASCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== SCROLL REVEAL =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-text').forEach(el => observer.observe(el));

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 80);
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 20;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // ===== ANIMATED COUNTER =====
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const suffix = target >= 10000 ? 'K+' : target >= 100 ? '+' : '%';
        const displayTarget = target >= 10000 ? Math.floor(target / 1000) : target;
        let current = 0;
        const duration = 2000;
        const step = (displayTarget / duration) * 16;
        const timer = setInterval(() => {
            current += step;
            if (current >= displayTarget) {
                el.textContent = displayTarget + suffix;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ===== HERO SLIDER =====
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let sliderInterval;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // expose globally
    window.goToSlide = (i) => { clearInterval(sliderInterval); goToSlide(i); sliderInterval = setInterval(nextSlide, 5000); };

    if (slides.length > 0) {
        sliderInterval = setInterval(nextSlide, 5000);
    }

    // ===== TESTIMONIALS SLIDER =====
    const track = document.querySelector('.testimonials-track');
    const tDots = document.querySelectorAll('.t-dot');
    let currentTest = 0;
    const totalTests = document.querySelectorAll('.testimonial-card').length;
    const isMobile = () => window.innerWidth <= 650;

    function updateTestSlider() {
        const visibleCount = isMobile() ? 1 : 2;
        const cardWidth = track.parentElement.offsetWidth;
        const gapSize = isMobile() ? 0 : 24;
        const moveBy = (cardWidth + gapSize) / visibleCount;
        track.style.transform = `translateX(-${currentTest * moveBy}px)`;
        tDots.forEach((d, i) => d.classList.toggle('active', i === currentTest));
    }

    window.nextTest = () => {
        const max = isMobile() ? totalTests - 1 : totalTests - 2;
        currentTest = (currentTest + 1) % (max + 1);
        updateTestSlider();
    };
    window.prevTest = () => {
        const max = isMobile() ? totalTests - 1 : totalTests - 2;
        currentTest = (currentTest - 1 + (max + 1)) % (max + 1);
        updateTestSlider();
    };

    tDots.forEach((d, i) => d.addEventListener('click', () => { currentTest = i; updateTestSlider(); }));

    // Auto-rotate testimonials
    setInterval(window.nextTest, 6000);
    window.addEventListener('resize', updateTestSlider);

    // ===== SCROLL TO TOP =====
    const scrollBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        scrollBtn?.classList.toggle('visible', window.pageYOffset > 500);
    });

    window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // ===== MOBILE HAMBURGER =====
    window.toggleMenu = () => {
        const btn = document.getElementById('hamburger');
        const links = document.getElementById('navLinks');
        btn.classList.toggle('active');
        links.classList.toggle('mobile-open');
    };

    // Close mobile nav on outside click
    document.addEventListener('click', (e) => {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (navLinks?.classList.contains('mobile-open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
            hamburger.classList.remove('active');
        }
    });

    // Mobile dropdown toggle
    document.querySelectorAll('.nav-links.mobile-open .dropdown > a, #navLinks .dropdown > a').forEach(a => {
        a.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                this.parentElement.classList.toggle('open');
            }
        });
    });

    // ===== APPOINTMENT MODAL =====
    window.openModal = () => {
        document.getElementById('appointmentModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = () => {
        document.getElementById('appointmentModal').classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close on backdrop click
    document.getElementById('appointmentModal')?.addEventListener('click', function (e) {
        if (e.target === this) window.closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.closeModal();
    });

    // ===== FORM SUBMIT =====
    window.submitForm = (e) => {
        e.preventDefault();
        window.closeModal();
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    };

    // ===== RIPPLE EFFECT =====
    document.querySelectorAll('.btn-primary, .btn-outline, .btn-white, .btn-outline-white').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            ripple.style.cssText = `
                position:absolute; border-radius:50%; pointer-events:none;
                width:${size}px; height:${size}px;
                left:${e.clientX - rect.left - size / 2}px;
                top:${e.clientY - rect.top - size / 2}px;
                background:rgba(255,255,255,0.3);
                animation:rippleAnim 0.6s ease-out forwards;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ===== NAVBAR ACTIVE LINK =====
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = '#' + entry.target.id;
                navAnchors.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(s => sectionObserver.observe(s));

    // ===== PARALLAX ON HERO =====
    window.addEventListener('scroll', () => {
        const y = window.pageYOffset;
        const slider = document.querySelector('.hero-slider');
        if (slider && y < window.innerHeight) {
            slider.style.transform = `translateY(${y * 0.25}px)`;
        }
    });

    // Add ripple keyframe style
    const s = document.createElement('style');
    s.textContent = `@keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }`;
    document.head.appendChild(s);

    // Set min date for appointment form
    const dateInput = document.querySelector('.modal-form input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

});