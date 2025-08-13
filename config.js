// Configuración de la Landing Page - Alejandra Sandoval Real Estate
// Modifica estos valores para personalizar el contenido

const CONFIG = {
    // Información Personal
    personal: {
        name: "Alejandra Sandoval",
        title: "Realtor Experta",
        subtitle: "Especializada en Compra y Venta de Propiedades con Estrategia",
        experience: "10+",
        propertiesSold: "500+",
        satisfactionRate: "98%"
    },

    // Información de Contacto
    contact: {
        phone: "+1 (404) 555-0123",
        email: "alejandra@realestate.com",
        office: "Metro Atlanta, Georgia",
        areas: ["Metro Atlanta", "Marietta", "Kennesaw", "Smyrna", "áreas circundantes"]
    },

    // Servicios
    services: [
        {
            icon: "fas fa-search",
            title: "Compra de Propiedades",
            description: "Te ayudo a encontrar la propiedad perfecta que se ajuste a tu presupuesto y necesidades. Análisis de mercado, negociación experta y acompañamiento completo.",
            features: [
                "Búsqueda personalizada",
                "Análisis de inversión",
                "Negociación experta",
                "Financiamiento"
            ]
        },
        {
            icon: "fas fa-chart-line",
            title: "Venta de Propiedades",
            description: "Maximiza el valor de tu propiedad con estrategias de marketing inmobiliario, pricing inteligente y exposición en el mercado correcto.",
            features: [
                "Valuación profesional",
                "Marketing inmobiliario",
                "Estrategia de precios",
                "Negociación de compradores"
            ]
        },
        {
            icon: "fas fa-handshake",
            title: "Asesoría Estratégica",
            description: "Recibe consejos expertos sobre el mercado inmobiliario de Georgia, tendencias del mercado y oportunidades de inversión.",
            features: [
                "Análisis de mercado",
                "Estrategias de inversión",
                "Consultoría personalizada",
                "Seguimiento continuo"
            ]
        }
    ],

    // Experiencia y Credenciales
    experience: {
        title: "Experiencia que Marca la Diferencia",
        description: "Con más de una década en el mercado inmobiliario de Georgia, he desarrollado estrategias únicas que han ayudado a cientos de familias a alcanzar sus sueños.",
        highlights: [
            {
                icon: "fas fa-award",
                title: "Certificaciones",
                description: "Licencia de Realtor en Georgia, Certificación en Negociación Avanzada"
            },
            {
                icon: "fas fa-map-marked-alt",
                title: "Área de Servicio",
                description: "Metro Atlanta, Marietta, Kennesaw, Smyrna y áreas circundantes"
            },
            {
                icon: "fas fa-users",
                title: "Red Profesional",
                description: "Extensa red de contactos en el sector inmobiliario y financiero"
            }
        ]
    },

    // Testimonios
    testimonials: [
        {
            content: "Alejandra nos ayudó a encontrar nuestra casa soñada en solo 3 semanas. Su conocimiento del mercado y estrategia de negociación nos ahorró miles de dólares.",
            author: "María y Carlos Rodríguez",
            location: "Compradores en Marietta"
        },
        {
            content: "Vendí mi casa en 15 días por encima del precio de mercado. Alejandra tiene un talento increíble para presentar propiedades.",
            author: "Ana Martínez",
            location: "Vendedora en Kennesaw"
        },
        {
            content: "Como inversor, necesitaba alguien que entendiera el mercado. Alejandra me ha ayudado a identificar las mejores oportunidades.",
            author: "Roberto Silva",
            location: "Inversor en Metro Atlanta"
        }
    ],

    // Redes Sociales
    social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
        youtube: "#"
    },

    // SEO y Meta
    seo: {
        title: "Alejandra Sandoval - Realtor Experta en Georgia | Compra y Venta de Propiedades",
        description: "Alejandra Sandoval, realtor experta en Georgia especializada en compra y venta de propiedades con estrategia. Encuentra tu hogar ideal o vende tu propiedad al mejor precio.",
        keywords: "realtor georgia, compra venta propiedades, alejandra sandoval, metro atlanta real estate, marietta kennesaw smyrna"
    },

    // Colores (opcional - ya están en CSS)
    colors: {
        primary: "#ff6608",
        secondary: "#2e2d2c"
    },

    // Configuración de Formulario
    form: {
        fields: [
            { name: "nombre", type: "text", placeholder: "Tu nombre completo", required: true },
            { name: "email", type: "email", placeholder: "Tu email", required: true },
            { name: "telefono", type: "tel", placeholder: "Tu teléfono", required: false },
            { name: "servicio", type: "select", options: ["Compra de Propiedad", "Venta de Propiedad", "Asesoría Estratégica", "Otro"], required: true },
            { name: "mensaje", type: "textarea", placeholder: "Cuéntame sobre tus necesidades", required: false }
        ]
    },

    // Configuración de Animaciones
    animations: {
        enabled: true,
        duration: 600,
        delay: 100
    }
};

// Función para aplicar la configuración
function applyConfig() {
    // Aplicar información personal
    document.querySelector('.nav-logo h2').textContent = CONFIG.personal.name;
    document.querySelector('.nav-logo span').textContent = CONFIG.personal.title;
    
    // Aplicar estadísticas
    document.querySelector('.stat-number:first-child').textContent = CONFIG.personal.propertiesSold;
    document.querySelector('.stat-number:nth-child(2)').textContent = CONFIG.personal.satisfactionRate;
    document.querySelector('.stat-number:last-child').textContent = CONFIG.personal.experience;
    
    // Aplicar información de contacto
    document.querySelectorAll('.contact-item p').forEach((item, index) => {
        if (index === 0) item.textContent = CONFIG.contact.phone;
        if (index === 1) item.textContent = CONFIG.contact.email;
        if (index === 2) item.textContent = CONFIG.contact.office;
    });
    
    // Aplicar redes sociales
    Object.keys(CONFIG.social).forEach(platform => {
        const link = document.querySelector(`.social-links a[href="#"]`);
        if (link && CONFIG.social[platform] !== "#") {
            link.href = CONFIG.social[platform];
        }
    });
}

// Ejecutar configuración cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyConfig);
} else {
    applyConfig();
}

// Exportar configuración para uso externo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
