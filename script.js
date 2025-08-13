// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
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
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Form handling for VSL
const vslForm = document.getElementById('vslForm');

if (vslForm) {
    vslForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.nombre || !data.apellido || !data.email || !data.pais || !data.telefono) {
            showNotification('Por favor completa todos los campos requeridos.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Por favor ingresa un email válido.', 'error');
            return;
        }
        
        // Phone validation (basic)
        if (data.telefono.length < 10) {
            showNotification('Por favor ingresa un número de teléfono válido.', 'error');
            return;
        }
        
        // Show success message and redirect
        showNotification('¡Formulario enviado exitosamente! Redirigiendo...', 'success');
        
        // Redirect to thank you page with form data
        setTimeout(() => {
            const params = new URLSearchParams(data);
            window.location.href = 'gracias.html?' + params.toString();
        }, 1500);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .highlight-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add animation class
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + 
                                    (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, target);
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe hero stats section
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.style.animation = 'pulse 2s infinite';
    });
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(style);
});

// Form field focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add focus styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .form-group.focused label {
        transform: translateY(-20px);
        font-size: 0.8rem;
        color: #ff6608;
    }
`;
document.head.appendChild(focusStyle);

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('.services, .experience, .testimonials, .contact');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(section);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #ff6608, #ff8533);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click ripple effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Video Player Functionality
function initVideoPlayer() {
    const videoPlayer = document.querySelector('.video-player');
    if (videoPlayer) {
        videoPlayer.addEventListener('click', function() {
            // Aquí puedes agregar la lógica para reproducir el video real
            // Por ahora, mostraremos un mensaje de éxito
            this.innerHTML = `
                <div class="video-playing">
                    <i class="fas fa-play-circle" style="color: var(--primary-orange); font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p style="color: var(--primary-gray); font-weight: 600; margin-bottom: 0.5rem;">¡Video Reproduciéndose!</p>
                    <span style="color: var(--text-light); font-size: 0.95rem;">Disfruta del contenido exclusivo</span>
                </div>
            `;
            
            // Opcional: Agregar un mensaje de éxito
            showNotification('¡Video iniciado! Disfruta del contenido exclusivo.', 'success');
        });
    }
}

// Enhanced Form Validation
function validateVSLForm() {
    const form = document.getElementById('vslForm');
    if (!form) return;

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const pais = document.getElementById('pais').value;
    const telefono = document.getElementById('telefono').value.trim();

    // Validación mejorada
    if (nombre.length < 2) {
        showNotification('El nombre debe tener al menos 2 caracteres', 'error');
        return false;
    }

    if (apellido.length < 2) {
        showNotification('El apellido debe tener al menos 2 caracteres', 'error');
        return false;
    }

    if (!isValidEmail(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return false;
    }

    if (!pais) {
        showNotification('Por favor selecciona tu país', 'error');
        return false;
    }

    if (telefono.length < 7) {
        showNotification('El teléfono debe tener al menos 7 dígitos', 'error');
        return false;
    }

    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Función para controlar el header sticky
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    // Al inicio, hacer el header transparente
    if (scrollPosition <= 100) {
        header.classList.add('transparent');
        header.classList.remove('scrolled');
    } else {
        // Después de 100px de scroll, mostrar header normal
        header.classList.remove('transparent');
        header.classList.add('scrolled');
    }
}

// Función para scroll suave al hacer clic en el CTA del hero
function initHeroCTA() {
    const heroCTA = document.querySelector('.hero-cta .btn');
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            const vslSection = document.querySelector('#vsl-section');
            if (vslSection) {
                vslSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize video player
    initVideoPlayer();
    
    // Initialize form handling
    initVSLForm();
    
    // Initialize other functionalities
    initMobileNavigation();
    initSmoothScrolling();
    initHeaderScroll();
    initAnimations();
    initCounters();
    initParallax();
    initImageAnimations();
    initFormFocusEffects();
    
    // Inicializar el control del header
    handleHeaderScroll(); // Llamar inmediatamente para el estado inicial
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Inicializar el CTA del hero
    initHeroCTA();
});

// VSL Form handling
function initVSLForm() {
    const form = document.getElementById('vslForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateVSLForm()) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual GHL integration)
            setTimeout(() => {
                // Get form data
                const formData = new FormData(form);
                const params = new URLSearchParams();
                
                for (let [key, value] of formData.entries()) {
                    params.append(key, value);
                }

                // Redirect to thank you page with form data
                window.location.href = `gracias.html?${params.toString()}`;
            }, 1500);
        }
    });
}
