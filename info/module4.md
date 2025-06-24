---
title: TYPESCRIPT INTERMEDIO = React con TypeScript
module: 4
---

- [🧩 MÓDULO 4: ESTRUCTURACIÓN Y MÓDULOS EN PROYECTOS REACT](#-módulo-4-estructuración-y-módulos-en-proyectos-react)
  - [🎯 Objetivos del módulo](#-objetivos-del-módulo)
  - [📘 Estructura modular en proyectos React](#-estructura-modular-en-proyectos-react)
  - [📘 Importación y exportación de componentes tipados](#-importación-y-exportación-de-componentes-tipados)
    - [🧠 Módulos ESM](#-módulos-esm)
    - [Importaciones y Vite](#importaciones-y-vite)
    - [Acceso a ficheros desde HTML. La carpeta public](#acceso-a-ficheros-desde-html-la-carpeta-public)
      - [Novedades en React 19](#novedades-en-react-19)
  - [📘 Configuración avanzada de tsconfig.json](#-configuración-avanzada-de-tsconfigjson)
    - [Alias de importación](#alias-de-importación)
  - [📘 Uso de namespaces en aplicaciones grandes](#-uso-de-namespaces-en-aplicaciones-grandes)
  - [📝 Ejercicios sugeridos](#-ejercicios-sugeridos)

## 🧩 MÓDULO 4: ESTRUCTURACIÓN Y MÓDULOS EN PROYECTOS REACT

### 🎯 Objetivos del módulo

Al finalizar este módulo, serás capaz de:

- Comprender cómo organizar proyectos React con TypeScript de forma modular y escalable.
- Configurar adecuadamente el sistema de módulos de TypeScript (`esModules`, `baseUrl`, `paths`, etc.).
- Exportar e importar componentes tipados entre archivos y carpetas.
- Utilizar `namespaces` (cuando sea necesario) para agrupar funcionalidades o modelos en aplicaciones grandes.
- Configuración avanzada de tsconfig.json en proyectos React.

---

### 📘 Estructura modular en proyectos React

- Una estructura modular ayuda a mantener un proyecto escalable, legible y mantenible.
- Es común separar el proyecto en carpetas como `components`, `pages`, `hooks`, `utils`, `types`, etc.

```bash
src/
├── components/
│   ├── Button.tsx
│   └── Header.tsx
├── hooks/
│   └── useAuth.ts
├── pages/
│   └── Home.tsx
├── types/
│   └── user.ts
├── App.tsx
└── main.tsx
```

En proyectos grandes, uno de los enfoques más habituales de estructuración es el **"feature-based"**. En este enfoque, los componentes, hooks y tipos relacionados se agrupan en una misma carpeta. Si es necesario, en el siguiente nivel se puede agrupar por funcionalidad, como vemos en el ejemplo en el caso de `products`.

```bash
src/
├── features/
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── useAuth.ts
│   │   └── types.ts
│   ├── products/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductList.tsx
│   │   ├── hooks/
│   │   │   ├── useProduct.ts
│   │   │   └── useProductList.ts
│   │   ├── pages/
│   │   │   ├── ProductDetail.tsx
│   │   │   └── ProductList.tsx
│   │   ├── types/
│   │   │   ├── Product.ts
│   │   │   └── ProductList.ts
│   └── cart/
│       ├── Cart.tsx
│       ├── CartItem.tsx
│       ├── useCart.ts
│       └── types.ts
├── App.tsx
└── main.tsx
```

También se conoce como **arquitectura Screaming**, con la idea de que la arquitectura debería hablar del dominio detrás del sistema y no de los detalles de implementación. Es el scaffolding que suele utilizarse en las arquitecturas con diversas capas orientadas a separar el dominio o negocio (clean architecture, hexagonal architecture, DDD, etc.).

### 📘 Importación y exportación de componentes tipados

- TypeScript permite importar/exportar tipos, interfaces, funciones y componentes desde cualquier archivo.
- Exportar y reutilizar interfaces y tipos ayuda a mantener el tipado consistente.
- Para hacerlo se utilizan los **módulos**.
- En principio podrían emplearse módulos CommonJS (`require`/`module.exports`), pero es más habitual usar módulos ES (`import`/`export`) en proyectos actuales. Incluso en librerías de Node.js o en backeend con Node, cada vez es más común usar módulos ES.

#### 🧠 Módulos ESM

El estándar de JS define la forma de crear y utilizar módulos, conocidos como ESM (ECMAScript Modules).
En este sistema, cada archivo es un módulo en el momento en que se usa la palabra clave `export`.
Cualquier archivo puede importar otros módulos usando la palabra clave `import`.

En un modulo se pueden utilizar dos formas de exportación:

- **Exportación por defecto** (`export default <expression>`): Se utiliza para exportar un único valor o componente por archivo. Se puede importar con cualquier nombre.
- **Exportación nombrada** (`export`): Se utiliza para exportar múltiples valores o componentes desde un mismo archivo. Se deben importar con el mismo nombre.

Se pueden combinar ambas formas de exportación en un mismo archivo y además, pueden existir elementos no exportados, que son privados al módulo.

```tsx
// types/User.ts
export interface User {
  id: number;
  name: string;
}
export interface Product {
  id: number;
  name: string;
}

// components/Buttons.ts
export const Button1 = () => <button>Click me</button>;
export const Button2 = () => <button>Click me</button>;
export const Button3 = () => <button>Click me</button>;

export default Button1;
```

La importación de los módulos depende de la forma de exportación:

- **Exportación por defecto**: la importación se puede hacer con cualquier nombre.
- **Exportación nombrada**: la importación debe hacerse con el mismo nombre y utilizando {} para acceder a cada uno de los elementos exportados.

```tsx
// components/UserCard.tsx
import { User } from "../types/User";
import ButtonAnyName from "../components/Buttons";
import { Button2, Button3 } from "../components/Buttons";
```

#### Importaciones y Vite

Al utilizar Vite, es importante tener en cuenta que este sistema de módulos ES permite importar archivos CSS, imágenes y otros recursos directamente en los componentes. Esto facilita la carga de estilos y recursos sin necesidad de configuraciones adicionales.

```tsx
// components/Button.tsx
import "./Button.css"; // Importación de CSS
import icon from "./icon.png"; // Importación de imagen
import { User } from "../types/User";
```

Los ficheros .JSON también pueden ser importados como módulos, como si exportaran por defecto todo su contenido, lo que permite cargar datos de configuración o constantes directamente en el código.

```tsx
// data/config.json
{
  "apiUrl": "https://api.example.com",
  "timeout": 5000
}
```

```tsx
// components/Config.tsx
import config from "../data/config.json";
const apiUrl = config.apiUrl;
```

#### Acceso a ficheros desde HTML. La carpeta public

Todos los ficheros que se encuentren en la carpeta `public` de un proyecto Vite se copian tal cual al directorio de salida (dist) y pueden ser accedidos directamente desde el navegador. Esto es útil para archivos estáticos como imágenes, fuentes o archivos JSON que no necesitan ser procesados por Vite.

```bash
src/
├── assets/
│   └── logo.png
├── components/
│   └── Header.tsx
├── public/
│   └── favicon.ico
└── index.html
```

```tsx
// components/Header.tsx
import logo from "../assets/logo.png";
const Header = () => (
  <header>
    <img src={logo} alt="Logo" />
  </header>
);
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.ico" />
    <title>Mi App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Como se ve en el ejemplo, desde HTML se pueden usar las etiquetas `<link>` y `<script>` para cargar recursos. En este caso, el favicon se carga desde la carpeta `public` y el script principal de la aplicación se carga desde la carpeta `src`.

##### Novedades en React 19

En React19 se han introducido nuevas características que permiten un mejor manejo de los recursos y la carga de componentes. Desde los componentes se puede acceder a los elementos del head de la página, lo que permite cargar CSS o scripts de forma dinámica. De esta forma se evita la necesidad de dependencias como `react-helmet` o `react-helmet-async` para gestionar el head de la página.

La forma de hacerlo anteriormente, manualmente o usando Helmet era la siguiente:

```tsx
// components/Head.tsx
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Head = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://example.com/styles.css";
    document.head.appendChild(link);
  }, []);

  return (
    <Helmet>
      <title>Mi App</title>
      <meta name="description" content="Descripción de mi app" />
    </Helmet>
  );
};
```

En React19, se puede hacer de la siguiente forma:

```tsx
// components/Head.tsx
return (
  <>
    <title>Mi App</title>
    <meta name="description" content="Descripción de mi app" />
    <link rel="stylesheet" href="https://example.com/styles.css" />
  </>
);
```

Igual que se carga un CSS, desde cualquier componente pueden utilizarse pre-cargas como `preload` o `prefetch` para cargar recursos de forma anticipada, igual que se haría desde HTML. Esto es útil para mejorar el rendimiento de la aplicación y reducir el tiempo de carga de los componentes.

### 📘 Configuración avanzada de tsconfig.json

El archivo `tsconfig.json` permite configurar cómo TypeScript interpreta el código.

Algunas configuraciones útiles en React:

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "Node",
    "baseUrl": "src",
    "paths": {
      "@components/*": ["components/*"],
      "@types/*": ["types/*"],
      "@hooks/*": ["hooks/*"]
    },
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

- `strict` activa comprobaciones estrictas (recomendado).
- `jsx: react-jsx` es necesario para JSX moderno (React 17+).

#### Alias de importación

- `baseUrl` y `paths` permiten alias de importación.

Por ejemplo, para facilitar el acceso a componentes, hooks y tipos, se pueden definir alias como `@components`, `@hooks`, `@types`, etc.

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@components/*": ["components/*"],
      "@hooks/*": ["hooks/*"],
      "@types/*": ["types/*"]
    }
  }
}
```

Al utilizar vite es necesario actualizar el archivo `vite.config.ts` para que reconozca estos alias:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': 'src/components',
      '@hooks': 'src/hooks',
      '@types': 'src/types',
    },
  },
});
```

Ya no es imprescindible utilizar path para definir los alias, pero es una buena práctica para evitar problemas de resolución de rutas.

```ts
"@components": path.resolve(__dirname, "src/components")
```

Con esta configuración, se pueden importar componentes, hooks y tipos de la siguiente manera:

```tsx
// components/UserCard.tsx
import { User } from '@types/user';
import { Button } from '@components/Button';
```

Las ventajas del uso de alias son:

- Mejora la claridad de los imports.
- Reduce errores en paths relativos complejos.
- Facilita el refactorizado de estructura del proyecto.

### 📘 Uso de namespaces en aplicaciones grandes

- Los `namespace` en TypeScript permiten agrupar tipos o funciones relacionadas bajo un mismo espacio de nombres.
- Aunque su uso ha disminuido con los módulos ES, pueden ser útiles para organizar modelos complejos o evitar colisiones de nombre.
- No se deben confundir con módulos ES (`import` / `export`).

Tenemos a continuación un ejemplo de Namespace

```ts
// models/UserModel.ts
export namespace UserModel {
  export interface User {
    id: number;
    name: string;
  }

  export const getDisplayName = (user: User): string => `👤 ${user.name}`;
}
```

```tsx
// components/UserCard.tsx
import { UserModel } from "../models/UserModel";

const UserCard = ({ user }: { user: UserModel.User }) => (
  <div>{UserModel.getDisplayName(user)}</div>
);
```

El namespace puede exportarse por defecto para poder importarlo con cualquier nombre, con frecuencia alguna abreviatura.

ESM, al margen de TS, tiene una forma de importación conocida como **namespace**, que utiliza el comando `import * as` y que permite importar todo el contenido de un módulo bajo un mismo espacio de nombres. Esto es útil para evitar colisiones de nombre y agrupar funcionalidades relacionadas.

```tsx
// components/UserCard.tsx
import * as um from "../models/UserModel";
const UserCard = ({ user }: { user: um.User }) => (
  <div>{um.getDisplayName(user)}</div>
);
```

Un caso frecuente de su uso es cuando se importan todos los acctions creators de Flux, que suelen tener nombres similares. En este caso, se puede importar todo el módulo bajo un mismo espacio de nombres y acceder a cada acción con `ac.actionName`.

```tsx
import * as ac from "./actions";
```

### 📝 Ejercicios sugeridos

✅ Ejercicio sugerido
Reorganiza un proyecto React para que cada componente esté en su propio archivo con su tipado separado en `/types`.

✅ Ejercicio sugerido
Crea un componente `ProductCard` que reciba un tipo `Product` importado desde `/types/Product.ts`.

✅ Ejercicio sugerido
Configura `baseUrl` y alias como `@components`, `@hooks`, `@types` en tu `tsconfig.json` y actualiza tus imports.

✅ Ejercicio sugerido
Crea un `namespace` llamado `ProductModel` con un tipo `Product` y una función `getProductLabel()`. Úsalo en un componente llamado `ProductCard`.
