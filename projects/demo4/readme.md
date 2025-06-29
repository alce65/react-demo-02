# Demo4 - Routing

## Creación del proyecto

Copia desde uno anterior:

- vite.config.js
- tsconfig.json
- package.json
- index.html
- public/vite.svg

- src/vite-env.d.ts
- src/setupTests.ts
- src/index.css
- src/main.tsx

### Componente inicial:

- src/core/components/app.tsx
- src/core/components/app.css
- src/core/components/app.test.tsx

Variables de entorno:

- src/.env

### Añadir contexto

- src/context/context.tsx
- src/context/context.test.tsx
- src/context/context.provider.tsx
- Incorporar valores leídos desde .env

- User contexto en main.tsx
- Acceder al contexto desde app.tsx

### Añadir un layout

- src/assets/react.svg
- src/core/components/header
- src/core/components/footer
- src/core/components/layout.tsx
- src/core/components/menu.tsx

- update app.tsx para usar layout
