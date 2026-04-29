# FRONT | PRÁCTICA 4 | DIEGO DE PAZ GONZÁLEZ

## DESCRIPCIÓN

En esta práctica se ha desarrollado una aplicación web utilizando **Next.js** que simula el funcionamiento de una red social tipo Twitter.

La aplicación consume una API REST externa y permite a los usuarios registrarse, iniciar sesión, publicar posts, interactuar con ellos y visualizar perfiles de usuarios.

---

## FUNCIONALIDADES

### Página principal (Home)

- Listado de posts recientes (timeline)
- Paginación de resultados
- Creación de nuevos posts
- Interacciones:
  - Like
  - Retweet
- Navegación al detalle del post

---

### Detalle del post

- Información completa del post:
  - Contenido
  - Autor
  - Fecha de publicación
  - Número de likes y retweets
- Interacciones:
  - Like
  - Retweet
- Comentarios:
  - Listado de comentarios
  - Formulario para añadir comentarios

---

### Página de perfil

- Información del usuario:
  - Username
  - Bio
  - Seguidores / Seguidos
- Listado de posts del usuario
- Navegación al detalle de cada post

---

### Login / Registro

- Login:
  - Email
  - Contraseña
- Registro:
  - Username
  - Email
  - Contraseña
- Cambio dinámico entre formularios
- Guardado del token JWT
- Redirección automática a la home

---

## AUTENTICACIÓN Y API

- Uso de **JWT (JSON Web Token)** para autenticación
- Headers obligatorios en cada petición:
  - `Authorization: Bearer <token>`
  - `x-nombre: Diego de Paz González`
- Redirección automática al login si no existe token

---

## INSTALACIÓN Y EJECUCIÓN

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

Abrir en el navegador:

```
http://localhost:3000
```

---

## ESTRUCTURA DEL PROYECTO

/src
  ├── app
  │   ├── page.tsx              → Home (timeline)
  │   ├── post/[id]/page.tsx    → Detalle de post
  │   ├── profile/page.tsx      → Perfil del usuario
  │   ├── login/page.tsx        → Login y registro
  │   ├── components/           → Componentes reutilizables  
  │   ├── types/                → Tipos de TypeScript  
  │   ├── globals.css           → Estilos globales  
  │   └── layout.tsx            → Layout general  

/api/api.ts                     → Configuración y llamadas a la API

## FUNCIONAMIENTO

1. El usuario se registra o inicia sesión.
2. Se guarda el token JWT.
3. En la página principal se cargan los posts desde la API con paginación.
4. El usuario puede crear nuevos posts.
5. Cada post permite dar like, retweet o acceder al detalle.
6. En el detalle se pueden ver comentarios y añadir nuevos.
7. En la página de perfil se muestran los datos del usuario y sus publicaciones.

---

## PROBLEMAS ENCONTRADOS Y SOLUCIONES

- **Autenticación con token**
  - Problema: errores al hacer peticiones sin token  
  - Solución: control de autenticación y redirección al login  

- **Headers obligatorios**
  - Problema: la API no respondía correctamente  
  - Solución: inclusión del header `x-nombre` en todas las peticiones  

- **Datos anidados de la API**
  - Problema: acceso incorrecto a propiedades  
  - Solución: validación previa antes de renderizar  

- **Paginación**
  - Problema: no se cargaban todos los posts  
  - Solución: implementación correcta de parámetros de paginación  

- **Gestión del estado**
  - Problema: inconsistencias entre componentes  
  - Solución: elevación del estado al componente padre  

---

## CONCLUSIÓN

Esta práctica ha permitido desarrollar una aplicación completa tipo red social utilizando **Next.js**, trabajando conceptos como:

- Rutas dinámicas
- Consumo de APIs REST
- Autenticación con JWT
- Componentes reutilizables
- Gestión del estado en React

Se ha conseguido replicar el comportamiento básico de una red social tipo Twitter integrando múltiples funcionalidades en una sola aplicación.