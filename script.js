/* ============================================
   PORTAFOLIO WEB - SCRIPTS
   Carlos Mendoza Ríos - Estudiante UTP
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // NAVEGACIÓN MÓVIL
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('bi-list');
                icon.classList.add('bi-x');
            } else {
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            }
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            });
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // SCROLL SUAVE PARA ENLACES INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // NAVEGACIÓN ACTIVA EN SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
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
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();

    // ============================================
    // BOTÓN VOLVER ARRIBA
    // ============================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // ANIMACIONES EN SCROLL
    // ============================================
    const animateElements = document.querySelectorAll('.timeline-item, .experience-card, .project-card, .certification-card, .skill-item, .info-item, .training-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });

    // ============================================
    // FORMULARIO DE CONTACTO
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Validar campos
            if (!data.name || !data.email || !data.subject || !data.message) {
                showToast('Por favor completa todos los campos', 'error');
                return;
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showToast('Por favor ingresa un email válido', 'error');
                return;
            }

            // Simular envío
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(function() {
                showToast('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================
    function showToast(message, type = 'info') {
        // Remover toast existente si hay uno
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';

        let icon = 'bi-info-circle';
        if (type === 'success') icon = 'bi-check-circle-fill';
        if (type === 'error') icon = 'bi-exclamation-circle-fill';

        toast.innerHTML = `
            <i class="bi ${icon}"></i>
            <span>${message}</span>
        `;

        // Estilo según tipo
        if (type === 'success') {
            toast.style.background = '#1e7d34';
        } else if (type === 'error') {
            toast.style.background = '#C1272D';
        }

        document.body.appendChild(toast);

        // Mostrar toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Ocultar y remover
        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }

    // ============================================
    // EFECTO TYPING EN HERO
    // ============================================
    const heroGreeting = document.querySelector('.hero-greeting');
    if (heroGreeting) {
        const text = heroGreeting.textContent;
        heroGreeting.textContent = '';
        let index = 0;

        function typeText() {
            if (index < text.length) {
                heroGreeting.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 80);
            }
        }

        setTimeout(typeText, 500);
    }

    // ============================================
    // PARALLAX EN HERO
    // ============================================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
            }
        });
    }

    // ============================================
    // ANIMACIÓN DE NÚMEROS (CONTADOR)
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ============================================
    // LAZY LOADING DE IMÁGENES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores sin soporte
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ============================================
    // EFECTO RIPPLE EN BOTONES
    // ============================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();

            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${e.clientX - rect.left}px;
                top: ${e.clientY - rect.top}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Agregar keyframe para ripple si no existe
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // HOVER EFFECT EN TARJETAS DE PROYECTO
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // MODO OSCURO (OPCIONAL - ACTIVAR SI SE NECESITA)
    // ============================================
    /*
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (darkModeToggle) {
        // Verificar preferencia guardada
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    */

    // ============================================
    // DETECCIÓN DE DISPOSITIVO MÓVIL
    // ============================================
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Desactivar efectos pesados en móvil
        document.body.classList.add('is-mobile');

        // Desactivar parallax en móvil
        if (heroContent) {
            window.removeEventListener('scroll', function() {});
        }
    }

    // ============================================
    // PRELOADER (OPCIONAL)
    // ============================================
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
    });

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c¡Hola! 👋', 'font-size: 24px; font-weight: bold; color: #C1272D;');
    console.log('%cPortafolio de Carlos Mendoza Ríos', 'font-size: 14px; color: #333;');
    console.log('%cEstudiante de Ingeniería de Sistemas - UTP Chimbote', 'font-size: 12px; color: #666;');
    console.log('%c¿Interesado en el código? Visita mi GitHub: github.com/carlosmendozar', 'font-size: 12px; color: #8B1A1F;');
});

// ============================================
// TOAST STYLES (AÑADIR AL CSS SI NO EXISTE)
// ============================================
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #8B1A1F;
        color: #FFFFFF;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(193, 39, 45, 0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
    }

    .toast.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }

    .toast.hide {
        transform: translateX(-50%) translateY(100px);
        opacity: 0;
    }

    .toast i {
        font-size: 20px;
    }

    .toast span {
        font-size: 14px;
        font-weight: 500;
    }

    .nav-link.active {
        color: #C1272D;
        background: #FFE5E7;
    }
`;
document.head.appendChild(toastStyles);