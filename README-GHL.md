# Landing Page para Go High Level - Alejandra Sandoval Real Estate

## 🎯 Estructura del Embudo

Esta landing page está diseñada específicamente para funcionar como un embudo de conversión en Go High Level (GHL) con dos páginas:

### **1. Primera Landing (`index.html`)**
- **Formulario de captura** con campos: nombre, apellido, correo, país, teléfono
- **Sección VSL** que promociona el video exclusivo
- **Testimonios** para construir credibilidad
- **Diseño optimizado** para conversión

### **2. Segunda Landing (`gracias.html`)**
- **Página de agradecimiento** con próximos pasos
- **Recordatorio de revisar correo**
- **Botón de WhatsApp** para atención inmediata
- **Información adicional** sobre servicios

## 🚀 Implementación en Go High Level

### **Paso 1: Subir Archivos**
1. Sube todos los archivos a tu hosting o GHL
2. Asegúrate de que `index.html` sea tu página principal
3. Verifica que `gracias.html` esté accesible

### **Paso 2: Configurar Formulario en GHL**
1. **Crear Formulario en GHL:**
   - Ve a **Forms** → **Create New Form**
   - Selecciona **Landing Page Form**
   - Configura los campos:
     - First Name (nombre)
     - Last Name (apellido)
     - Email
     - Phone (teléfono)
     - Country (país) - Dropdown

2. **Configurar Autoresponder:**
   - **Email Subject:** "Video Exclusivo - Alejandra Sandoval Real Estate"
   - **Email Content:** Incluye el enlace al video VSL
   - **Delay:** 0 minutos (envío inmediato)

3. **Configurar Redirección:**
   - **Thank You Page:** URL de `gracias.html`
   - **Redirect Delay:** 0 segundos

### **Paso 3: Integrar con GHL**
1. **Reemplazar Formulario HTML:**
   ```html
   <!-- Reemplaza el formulario actual con el código de GHL -->
   <form action="TU-URL-DE-GHL" method="POST">
       <!-- Los campos se generarán automáticamente -->
   </form>
   ```

2. **Configurar Tracking:**
   - Activa **Form Tracking** en GHL
   - Configura **Conversion Tracking**
   - Vincula con **Campaigns** si es necesario

## ⚙️ Configuración del Archivo `ghl-config.js`

### **Tracking y Analytics**
```javascript
tracking: {
    // Reemplaza con tu ID de Google Analytics
    googleAnalytics: 'G-XXXXXXXXXX',
    
    // Reemplaza con tu ID de Facebook Pixel
    facebookPixel: 'XXXXXXXXXX',
    
    // Configuración específica de GHL
    ghlTracking: {
        enabled: true,
        formId: 'vsl-form',
        eventName: 'vsl_form_submit'
    }
}
```

### **Configuración de WhatsApp**
```javascript
whatsapp: {
    enabled: true,
    number: '+14045550123', // Reemplaza con tu número
    message: 'Hola Alejandra, vi tu video...',
    buttonText: 'Contactar por WhatsApp'
}
```

### **Configuración de Email**
```javascript
email: {
    subject: 'Video Exclusivo - Alejandra Sandoval Real Estate',
    from: 'alejandra@realestate.com',
    replyTo: 'alejandra@realestate.com'
}
```

## 📧 Configuración de Autoresponder

### **Email de Bienvenida**
```
Asunto: Video Exclusivo - Alejandra Sandoval Real Estate

Hola [nombre],

¡Gracias por tu interés en mis servicios inmobiliarios en Georgia!

He preparado un video exclusivo donde te revelo las estrategias que han ayudado a cientos de familias a encontrar su hogar ideal.

🎥 VER VIDEO AQUÍ: [ENLACE AL VIDEO]

En este video descubrirás:
• Estrategias de búsqueda probadas
• Análisis del mercado de Georgia
• Secretos de negociación que te ahorrarán miles

Si tienes preguntas o quieres atención personalizada, no dudes en contactarme por WhatsApp: +1 (404) 555-0123

Saludos,
Alejandra Sandoval
Realtor Experta en Georgia
```

## 🔗 Integración con GHL

### **Webhooks (Opcional)**
Si quieres procesar los datos del formulario en tu propio sistema:

```javascript
// En ghl-config.js
function sendToGHL(formData) {
    fetch('TU-WEBHOOK-URL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos enviados:', data);
    });
}
```

### **API de GHL**
Para integraciones más avanzadas, usa la API oficial de GHL:

```javascript
// Ejemplo de uso de GHL API
const GHL_API_KEY = 'tu-api-key';
const GHL_LOCATION_ID = 'tu-location-id';

async function createContactInGHL(contactData) {
    const response = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            locationId: GHL_LOCATION_ID,
            contact: contactData
        })
    });
    
    return response.json();
}
```

## 📱 Optimización Mobile

La landing page está completamente optimizada para dispositivos móviles:
- **Responsive Design** en todos los breakpoints
- **Touch-friendly** para formularios móviles
- **Optimización** para conversión en móviles

## 🎨 Personalización

### **Cambiar Colores**
Los colores están en `styles.css` como variables CSS:
```css
:root {
    --primary-orange: #ff6608;
    --primary-gray: #2e2d2c;
}
```

### **Cambiar Contenido**
- **Textos:** Edita directamente en los archivos HTML
- **Imágenes:** Reemplaza los placeholders con fotos reales
- **Testimonios:** Agrega testimonios reales de clientes

### **Cambiar Configuración**
- **GHL:** Edita `ghl-config.js`
- **Tracking:** Actualiza IDs de Google Analytics y Facebook Pixel
- **WhatsApp:** Cambia número y mensaje en la configuración

## 📊 Métricas y Tracking

### **Conversiones a Seguir**
1. **Formularios Completados** - GHL Forms
2. **Páginas de Gracias Visitadas** - Google Analytics
3. **Clicks en WhatsApp** - Event Tracking
4. **Tiempo en Página** - Engagement Metrics

### **Configuración de Google Analytics**
```html
<!-- Agregar en el <head> de ambas páginas -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🚨 Solución de Problemas

### **Formulario No Envía**
1. Verifica que la URL de GHL sea correcta
2. Asegúrate de que todos los campos requeridos estén marcados
3. Revisa la consola del navegador para errores

### **No Llegan Emails**
1. Verifica la configuración del autoresponder en GHL
2. Revisa la carpeta de spam
3. Confirma que el email esté configurado correctamente

### **Tracking No Funciona**
1. Verifica que los IDs de GA y FB Pixel sean correctos
2. Asegúrate de que `ghl-config.js` esté incluido
3. Revisa la consola para errores de JavaScript

## 📞 Soporte

Para soporte técnico o personalizaciones adicionales:
- **Email:** [tu-email@dominio.com]
- **WhatsApp:** [tu-número]
- **Documentación GHL:** [https://help.gohighlevel.com/]

---

**Configurado para Go High Level con ❤️**

*Una landing page optimizada para conversión que se integra perfectamente con GHL*
