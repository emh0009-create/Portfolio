Mi Portfolio - Proyecto Angular

Este es mi proyecto final de portafolio hecho con Angular y Bootstrap. Es un sitio web donde muestro mis proyectos, habilidades y un formulario de contacto.


Es un portfolio que creé para la actividad final. La app tiene:

- Página de Inicio - Una presentación mía con mis habilidades
- Portafolio - Mis proyectos en tarjetas bonitas
- Contacto - Un formulario para que me puedan contactar
- Tema claro/oscuro - Se puede cambiar entre tema claro y oscuro

- Características Principales

- Componentes
- **Navbar** - Menú de navegación con botón para cambiar tema
- **Inicio** - Mi foto, presentación y habilidades
- **Portafolio** - Mis proyectos en tarjetas
- **Contacto** - Formulario con validación
- **Footer** - Enlaces rápidos y redes sociales
- **Project Card** - Tarjeta reutilizable para mostrar proyectos

- Servicios
- Storage Service - Guarda datos en el navegador
- Theme Service - Cambia entre tema claro y oscuro
- Contact Service - Recibe los mensajes del formulario

- Tecnologías que usé
- Angular 21
- TypeScript
- Bootstrap 5 para la responsividad
- HTML y CSS



- Cómo funciona

Las Páginas
- Inicio (presentación y habilidades)
- portfolio - Mis proyectos
- contact - Formulario de contacto

El Formulario de Contacto

El formulario valida que:
- El nombre tenga al menos 3 letras
- El email sea un email válido
- El asunto tenga al menos 5 letras
- El mensaje tenga al menos 10 letras

Los mensajes se guardan en el navegador (localStorage).

El Tema Claro/Oscuro
- Se guarda la preferencia en localStorage
- Al cerrar y abrir de nuevo, mantiene el tema que elegí
- El botón está en la barra de navegación arriba
