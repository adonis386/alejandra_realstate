// Configuración para Go High Level - Alejandra Sandoval Real Estate
// Este archivo contiene la configuración específica para GHL

const GHL_CONFIG = {
    // Configuración del Formulario VSL
    form: {
        // Campos del formulario
        fields: {
            nombre: { required: true, type: 'text', placeholder: 'Tu nombre' },
            apellido: { required: true, type: 'text', placeholder: 'Tu apellido' },
            email: { required: true, type: 'email', placeholder: 'Tu correo electrónico' },
            pais: { required: true, type: 'select', options: 'countries' },
            telefono: { required: true, type: 'tel', placeholder: 'Tu teléfono' }
        },
        
        // Configuración de validación
        validation: {
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Por favor ingresa un email válido'
            },
            telefono: {
                minLength: 10,
                message: 'El teléfono debe tener al menos 10 dígitos'
            }
        },
        
        // Configuración de envío
        submit: {
            action: 'gracias.html',
            method: 'GET',
            redirectDelay: 1500
        }
    },
    
    // Configuración de Tracking
    tracking: {
        // Google Analytics (reemplazar con tu ID)
        googleAnalytics: 'G-XXXXXXXXXX',
        
        // Facebook Pixel (reemplazar con tu ID)
        facebookPixel: 'XXXXXXXXXX',
        
        // GHL Tracking
        ghlTracking: {
            enabled: true,
            formId: 'vsl-form',
            eventName: 'vsl_form_submit'
        }
    },
    
    // Configuración de WhatsApp
    whatsapp: {
        enabled: true,
        number: '+14045550123',
        message: 'Hola Alejandra, vi tu video y me interesa saber más sobre tus servicios inmobiliarios en Georgia',
        buttonText: 'Contactar por WhatsApp'
    },
    
    // Configuración de Email
    email: {
        subject: 'Video Exclusivo - Alejandra Sandoval Real Estate',
        from: 'alejandra@realestate.com',
        replyTo: 'alejandra@realestate.com'
    },
    
    // Configuración de la Página de Gracias
    thankYouPage: {
        title: '¡Gracias por tu Interés!',
        subtitle: 'Has dado el primer paso para descubrir el secreto que cambiará tu vida inmobiliaria.',
        nextSteps: [
            {
                number: 1,
                title: 'Revisa tu Correo',
                description: 'Te hemos enviado un correo electrónico con el enlace al video exclusivo.'
            },
            {
                number: 2,
                title: 'Mira el Video',
                description: 'Dedica 15 minutos a ver las estrategias que Alejandra ha preparado especialmente para ti.'
            },
            {
                number: 3,
                title: 'Contacta para Más Información',
                description: 'Si tienes preguntas o quieres atención personalizada, estamos aquí para ayudarte.'
            }
        ]
    }
};

// Función para inicializar GHL
function initGHL() {
    console.log('Inicializando Go High Level...');
    
    // Configurar tracking de formulario
    if (GHL_CONFIG.tracking.ghlTracking.enabled) {
        setupGHLTracking();
    }
    
    // Configurar Google Analytics
    if (GHL_CONFIG.tracking.googleAnalytics && GHL_CONFIG.tracking.googleAnalytics !== 'G-XXXXXXXXXX') {
        setupGoogleAnalytics();
    }
    
    // Configurar Facebook Pixel
    if (GHL_CONFIG.tracking.facebookPixel && GHL_CONFIG.tracking.facebookPixel !== 'XXXXXXXXXX') {
        setupFacebookPixel();
    }
}

// Configurar tracking de GHL
function setupGHLTracking() {
    const form = document.getElementById('vslForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Track form submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'engagement',
                    'event_label': 'vsl_form'
                });
            }
            
            // Track with Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead');
            }
            
            // GHL specific tracking
            trackGHLSubmission();
        });
    }
}

// Track GHL submission
function trackGHLSubmission() {
    // Aquí puedes agregar el código específico de GHL para tracking
    // Por ejemplo, enviar datos a GHL API o usar GHL scripts
    
    console.log('Formulario enviado - Tracking GHL activado');
    
    // Ejemplo de tracking personalizado
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'vsl_form_submit', {
            'event_category': 'lead_generation',
            'event_label': 'alejandra_sandoval_vsl'
        });
    }
}

// Configurar Google Analytics
function setupGoogleAnalytics() {
    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GHL_CONFIG.tracking.googleAnalytics}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GHL_CONFIG.tracking.googleAnalytics);
    
    window.gtag = gtag;
}

// Configurar Facebook Pixel
function setupFacebookPixel() {
    // Facebook Pixel
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', GHL_CONFIG.tracking.facebookPixel);
    fbq('track', 'PageView');
}

// Función para obtener parámetros de URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Función para pre-llenar formulario desde URL (útil para GHL)
function prefillFormFromURL() {
    const form = document.getElementById('vslForm');
    if (!form) return;
    
    const fields = ['nombre', 'apellido', 'email', 'pais', 'telefono'];
    fields.forEach(field => {
        const value = getUrlParameter(field);
        if (value) {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                input.value = value;
            }
        }
    });
}

// Función para enviar datos a GHL (ejemplo)
function sendToGHL(formData) {
    // Esta función se puede personalizar según las necesidades específicas de GHL
    // Por ejemplo, enviar a GHL API, webhook, o usar GHL scripts
    
    console.log('Enviando datos a Go High Level:', formData);
    
    // Ejemplo de envío a GHL webhook
    fetch('/ghl-webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos enviados a GHL:', data);
    })
    .catch(error => {
        console.error('Error enviando a GHL:', error);
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGHL);
} else {
    initGHL();
}

// Exportar configuración para uso externo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GHL_CONFIG;
}
