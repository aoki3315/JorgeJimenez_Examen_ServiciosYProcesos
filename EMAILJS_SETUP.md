# Configuración de EmailJS para el Sistema de Suscripción

## Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Regístrate con tu email
- Confirma tu cuenta

### 2. Configurar el servicio de email
- En el dashboard, ve a "Email Services"
- Haz clic en "Add New Service"
- Selecciona tu proveedor de email (Gmail, Outlook, etc.)
- Sigue las instrucciones para conectar tu cuenta
- Anota el **Service ID** que se genera

### 3. Crear template de email

- Ve a "Email Templates"
- Haz clic en "Create New Template"
- Configura el template con estos campos:
  ```
  To: tu-email@tudominio.com
  Subject: Nueva suscripción al newsletter - Evolution Mobility
  
  Contenido:
  Nuevo suscriptor al newsletter:
  Email: {{user_email}}
  
  Mensaje: {{message}}
  ```
- Anota el **Template ID** que se genera

### 4. Obtener Public Key
- Ve a "Account" > "General"
- Copia tu **Public Key**

### 5. Actualizar el código
En el archivo `src/components/Footer.tsx`, reemplaza estas líneas:

```typescript
const SERVICE_ID = 'tu_service_id_aqui'; // Reemplazar con tu Service ID
const TEMPLATE_ID = 'tu_template_id_aqui'; // Reemplazar con tu Template ID  
const PUBLIC_KEY = 'tu_public_key_aqui'; // Reemplazar con tu Public Key
```

### 6. Probar el sistema
- Guarda los cambios
- Ve a tu sitio web
- Prueba el formulario de suscripción en el footer
- Verifica que recibes el email de notificación

## Funcionalidades implementadas:

✅ **Validación de email**: Verifica formato correcto
✅ **Estados de carga**: Muestra spinner mientras envía
✅ **Confirmación visual**: Mensaje de éxito al suscribirse
✅ **Manejo de errores**: Muestra errores si algo falla
✅ **Prevención de spam**: Desactiva el formulario tras envío exitoso
✅ **Auto-reset**: El mensaje de éxito desaparece después de 3 segundos

## Alternativas gratuitas a EmailJS:

1. **Formspree** - Hasta 50 envíos/mes gratis
2. **Netlify Forms** - Si usas Netlify para hosting
3. **Getform** - Hasta 100 envíos/mes gratis
4. **Basin** - Servicio simple de formularios

## Notas importantes:

- EmailJS tiene un plan gratuito de 200 emails/mes
- Los emails se envían directamente desde el navegador
- No necesitas backend para que funcione
- Mantén tus claves seguras y no las subas a repositorios públicos