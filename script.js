// Counter Animation
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
};

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

counters.forEach(counter => counterObserver.observe(counter));

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });

});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Appointment Form Handling
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender')?.value || 'Not specified',
            phone: document.getElementById('phone')?.value || 'Not provided',
            department: document.getElementById('department').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message')?.value || 'None'
        };
        
        // Show success modal
        showSuccessModal(formData);
        
        // Reset form
        this.reset();
        
        // Log to console
        console.log('Appointment Booked:', formData);
    });
}

// Success Modal
function showSuccessModal(data) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="modalOverlay">
            <div class="success-modal" id="successModal">
                <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                <h2 style="color: var(--primary); margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Appointment Confirmed!</h2>
                <p style="color: var(--text-light); margin-bottom: 2rem;">Your appointment has been successfully booked.</p>
                
                <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; text-align: left; margin-bottom: 2rem;">
                    <div style="margin-bottom: 0.75rem;"><strong>Name:</strong> ${data.name}</div>
                    <div style="margin-bottom: 0.75rem;"><strong>Department:</strong> ${data.department}</div>
                    <div style="margin-bottom: 0.75rem;"><strong>Date:</strong> ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    ${data.phone !== 'Not provided' ? `<div><strong>Contact:</strong> ${data.phone}</div>` : ''}
                </div>
                
                <p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 1.5rem;">
                    A confirmation message will be sent to your contact details shortly.
                </p>
                
                <button onclick="closeSuccessModal()" style="background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white; border: none; padding: 1rem 2rem; border-radius: 50px; font-weight: 600; cursor: pointer; font-size: 1rem;">
                    Close
                </button>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal with animation
    setTimeout(() => {
        document.getElementById('modalOverlay').classList.add('show');
        document.getElementById('successModal').classList.add('show');
    }, 10);
}

function closeSuccessModal() {
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('successModal');
    
    if (overlay && modal) {
        overlay.classList.remove('show');
        modal.classList.remove('show');
        
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') {
        closeSuccessModal();
    }
});

// Set minimum date for appointment to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .dept-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Run animation on load
window.addEventListener('load', animateOnScroll);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }
    }
});

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Add loading animation to submit button
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('click', function() {
        if (appointmentForm && appointmentForm.checkValidity()) {
            const originalText = this.innerHTML;
            this.innerHTML = '<span>Processing...</span>';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 1000);
        }
    });
}

// Easter egg: Console message
console.log('%c🏥 City Hospital', 'color: #0A4D68; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with ❤️ for better healthcare', 'color: #666; font-size: 12px;');

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const floatingElements = document.querySelector('.floating-elements');
    
    if (heroContent && window.innerWidth > 768) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.002);
    }
    
    if (floatingElements && window.innerWidth > 768) {
        floatingElements.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
>>>>>>> 0f3d668e73e2cd0259fe2671cf38b41c6d6ad52f
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Appointment Form Handling
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender')?.value || 'Not specified',
            phone: document.getElementById('phone')?.value || 'Not provided',
            department: document.getElementById('department').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message')?.value || 'None'
        };
        
        // Show success modal
        showSuccessModal(formData);
        
        // Reset form
        this.reset();
        
        // Log to console
        console.log('Appointment Booked:', formData);
    });
}

// Success Modal
function showSuccessModal(data) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="modalOverlay">
            <div class="success-modal" id="successModal">
                <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                <h2 style="color: var(--primary); margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Appointment Confirmed!</h2>
                <p style="color: var(--text-light); margin-bottom: 2rem;">Your appointment has been successfully booked.</p>
                
                <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; text-align: left; margin-bottom: 2rem;">
                    <div style="margin-bottom: 0.75rem;"><strong>Name:</strong> ${data.name}</div>
                    <div style="margin-bottom: 0.75rem;"><strong>Department:</strong> ${data.department}</div>
                    <div style="margin-bottom: 0.75rem;"><strong>Date:</strong> ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    ${data.phone !== 'Not provided' ? `<div><strong>Contact:</strong> ${data.phone}</div>` : ''}
                </div>
                
                <p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 1.5rem;">
                    A confirmation message will be sent to your contact details shortly.
                </p>
                
                <button onclick="closeSuccessModal()" style="background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white; border: none; padding: 1rem 2rem; border-radius: 50px; font-weight: 600; cursor: pointer; font-size: 1rem;">
                    Close
                </button>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal with animation
    setTimeout(() => {
        document.getElementById('modalOverlay').classList.add('show');
        document.getElementById('successModal').classList.add('show');
    }, 10);
}

function closeSuccessModal() {
    const overlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('successModal');
    
    if (overlay && modal) {
        overlay.classList.remove('show');
        modal.classList.remove('show');
        
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') {
        closeSuccessModal();
    }
});

// Set minimum date for appointment to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .dept-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Run animation on load
window.addEventListener('load', animateOnScroll);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }
    }
});

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Add loading animation to submit button
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('click', function() {
        if (appointmentForm && appointmentForm.checkValidity()) {
            const originalText = this.innerHTML;
            this.innerHTML = '<span>Processing...</span>';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 1000);
        }
    });
}

// Easter egg: Console message
console.log('%c🏥 City Hospital', 'color: #0A4D68; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with ❤️ for better healthcare', 'color: #666; font-size: 12px;');

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const floatingElements = document.querySelector('.floating-elements');
    
    if (heroContent && window.innerWidth > 768) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.002);
    }
    
    if (floatingElements && window.innerWidth > 768) {
        floatingElements.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});