# Event Manager SPA - Versión Simplificada

Una Single Page Application (SPA) simple y funcional para la gestión de eventos con autenticación de usuarios y roles diferenciados.
## 🏗️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Servidor de desarrollo**: Vite
- **Base de datos**: JSON Server

## 🚀 Instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Iniciar la aplicación**
   ```bash
   npm start
   ```
   3. **Acceder a la aplicación**
   - Frontend: http://localhost:5173
   - API: http://localhost:3000

## 👥 Roles de Usuario

### Administrador
- **Credenciales**: admin@gmail.com / 123456
- **Funcionalidades**:
  - Ver todos los eventos en tabla
  - Crear nuevos eventos
  - Editar eventos existentes
  - Eliminar eventos

### Visitante
- **Credenciales**: juan@gmail.com / 123456
- **Funcionalidades**:
  - Ver eventos disponibles en grid
  - Inscribirse en eventos (si hay cupo)
  - Ver eventos en los que está inscrito
- **Credenciales**: maria@gmail.com / 123456
- **Funcionalidades**:
  - Ver eventos disponibles en grid
  - Inscribirse en eventos (si hay cupo)
  - Ver eventos en los que está inscrito
  - **Credenciales**: juan1@gmail.com"/ 123456
- **Funcionalidades**:
  - Ver eventos disponibles en grid
  - Inscribirse en eventos (si hay cupo)
  - Ver eventos en los que está inscrito