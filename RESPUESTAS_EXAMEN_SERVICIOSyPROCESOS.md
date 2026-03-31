# Análisis y Respuestas del Proyecto - Evolution Mobility

Este documento contiene las respuestas detalladas a los requisitos técnicos solicitados para la evaluación del proyecto "Evolution Mobility".

---

### 1. Demostración de comunicación entre sistemas de gestión empresarial (APIs)
La aplicación **Evolution Mobility** utiliza una arquitectura desacoplada donde el frontend (desarrollado en React/TypeScript) se comunica con un sistema de backend (Supabase) a través de una **API REST**.

- **Mecanismo**: Se utiliza la librería `@supabase/supabase-js` que actúa como un cliente de API para realizar operaciones CRUD (Create, Read, Update, Delete) sobre las tablas de `products`, `categories`, `profiles`, etc.
- **Ejemplo en el código**: En `src/pages/Admin.tsx`, el hook `useQuery` de TanStack Query realiza llamadas asíncronas a la API de Supabase para obtener los productos del catálogo.

---

### 2. Demostración de roles de Servidor y Cliente
El proyecto sigue el modelo **Cliente-Servidor**:

- **Rol de Servidor (Backend)**: **Supabase** actúa como el servidor. Es el encargado de:
  - Servir la API REST y GraphQL.
  - Gestionar la persistencia de datos en la base de datos PostgreSQL.
  - Controlar la autenticación y autorización (RBAC).
  - Almacenar archivos multimedia (Storage).
- **Rol de Cliente (Frontend)**: La aplicación **React/Vite**. Su función es:
  - Consumir los datos servidos por la API.
  - Procesar la lógica de negocio en el navegador del usuario.
  - Presentar la interfaz visual (UI/UX).

---

### 3. Apertura de un servicio web (API) y definición del contrato
Para demostrar la apertura del servicio a desarrolladores externos, se ha definido un **Contrato de API**.

- **Contrato**: El archivo [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) en la raíz del proyecto detalla los endpoints, métodos HTTP permitidos, parámetros de consulta y formatos de respuesta.
- **Documentación**: Este contrato sirve como guía para que terceros puedan integrar el catálogo de Evolution Mobility en sus propios sistemas (por ejemplo, para comparadores de precios o agregadores de stock).

---

### 4. Implantación de técnicas criptográficas de ida y vuelta (con desencriptación)
Se ha implementado un sistema de criptografía simétrica para protejer datos sensibles que necesiten ser recuperados posteriormente.

- **Técnica**: AES (Advanced Encryption Standard).
- **Implementación**: Localizada en `src/lib/crypto.ts`. Utiliza una clave secreta para transformar texto plano en *ciphertext* y viceversa.
- **Demostración Práctica**: En el panel de **Administración > Pestaña Seguridad**, existe una herramienta funcional que permite encriptar secretos y desencriptarlos usando la misma clave.

---

### 5. Implantación de técnicas de hasheado
Para la seguridad de las identidades de los usuarios, se ha implementado el hasheado de contraseñas.

- **Técnica**: **MD5** (Message Digest Algorithm 5).
- **Implementación**: En `src/pages/Admin.tsx`, dentro de la función `handleLogin`. 
- **Lógica**: Antes de enviar la contraseña al servidor Supabase, el cliente genera un hash MD5 único. De esta forma, la contraseña real nunca viaja ni se procesa en texto plano durante el intento de inicio de sesión en esta capa de la aplicación.
- **Dato Crítico**: Al ser un hash, es un proceso de "solo ida" (no se puede revertir para obtener la contraseña original), garantizando que si la base de datos es comprometida, la contraseña original permanece a salvo.