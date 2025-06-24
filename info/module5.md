---
title: TYPESCRIPT INTERMEDIO = React con TypeScript
module: 5
---

- [🧩 MÓDULO 5: INTEGRACIÓN DE LIBRERÍAS Y HERRAMIENTAS EN REACT CON TYPESCRIPT](#-módulo-5-integración-de-librerías-y-herramientas-en-react-con-typescript)
  - [🎯 Objetivos del módulo](#-objetivos-del-módulo)
  - [📘 Tipado e integración de librerías comunes en React (React Router, Redux, etc.)](#-tipado-e-integración-de-librerías-comunes-en-react-react-router-redux-etc)
  - [📘 Configuración de definiciones de tipos con @types](#-configuración-de-definiciones-de-tipos-con-types)
  - [📘 Optimización de proyectos React-TS con herramientas de construcción como Vite](#-optimización-de-proyectos-react-ts-con-herramientas-de-construcción-como-vite)
    - [Monorepos](#monorepos)
- [🌐 React Router](#-react-router)

## 🧩 MÓDULO 5: INTEGRACIÓN DE LIBRERÍAS Y HERRAMIENTAS EN REACT CON TYPESCRIPT

### 🎯 Objetivos del módulo

- Aprender a integrar librerías populares del ecosistema React con soporte para TypeScript.
- Comprender el uso de definiciones de tipos (`@types`) y su papel en el tipado estático.
- Conocer herramientas de construcción modernas como **Vite**, y su configuración óptima con TypeScript.
- Mejorar la interoperabilidad y productividad en entornos React + TS mediante tooling adecuado.

### 📘 Tipado e integración de librerías comunes en React (React Router, Redux, etc.)

React, al ser una biblioteca flexible, permite la integración de diversas librerías para manejar el enrutamiento, el estado global y otras funcionalidades. A continuación, se presentan algunas de las librerías más comunes y su integración con TypeScript:

- **React Router**: Para manejar el enrutamiento en aplicaciones React. TypeScript proporciona tipos para los componentes de enrutamiento, lo que permite una mejor autocompletación y verificación de tipos al definir rutas y parámetros.
- **Redux**: Para manejar el estado global de la aplicación. TypeScript permite definir tipos para acciones, reducers y el estado global, lo que mejora la mantenibilidad y la legibilidad del código.
- **Axios**: Para realizar solicitudes HTTP. TypeScript permite definir tipos para las respuestas de las API, lo que ayuda a evitar errores al manejar datos asíncronos.
- **Formik**: Para manejar formularios. TypeScript permite definir tipos para los valores del formulario y la validación, lo que mejora la experiencia de desarrollo al trabajar con formularios complejos.
- **Yup**: Para la validación de esquemas. TypeScript permite definir tipos para los esquemas de validación, lo que ayuda a evitar errores al validar datos.
- **React Query**: Para manejar el estado de las consultas. TypeScript permite definir tipos para los datos de las consultas y la caché, lo que mejora la experiencia de desarrollo al trabajar con datos asíncronos.
- **React Hook Form**: Para manejar formularios. TypeScript permite definir tipos para los valores del formulario y la validación, lo que mejora la experiencia de desarrollo al trabajar con formularios complejos.
- **Styled Components**: Para manejar estilos en componentes. TypeScript permite definir tipos para los props de estilo, lo que mejora la experiencia de desarrollo al trabajar con estilos dinámicos.
- **Material-UI**: Para manejar componentes de interfaz de usuario. TypeScript permite definir tipos para los props de los componentes, lo que mejora la experiencia de desarrollo al trabajar con componentes personalizados.
- **React Testing Library**: Para realizar pruebas en componentes. TypeScript permite definir tipos para los props de los componentes y las funciones de prueba, lo que mejora la experiencia de desarrollo al trabajar con pruebas unitarias y de integración.
- **Jest**: Para realizar pruebas en JavaScript. TypeScript permite definir tipos para los mocks y las funciones de prueba, lo que mejora la experiencia de desarrollo al trabajar con pruebas unitarias y de integración.
- **React Intl**: Para manejar la internacionalización. TypeScript permite definir tipos para los mensajes y las configuraciones de localización, lo que mejora la experiencia de desarrollo al trabajar con aplicaciones multilingües.

### 📘 Configuración de definiciones de tipos con @types

Existen muchas librerías de terceros que no incluyen sus propias definiciones de tipos. Para estas, se pueden instalar paquetes de tipos desde el registro de **DefinitelyTyped** utilizando el prefijo `@types/`. Por ejemplo, para instalar los tipos de `react-router-dom`, se puede usar:

```bash
npm install -D @types/react-router-dom
```

Esto es posible porque la comunidad ha creado y mantenido definiciones de tipos para muchas librerías populares. Estas definiciones se pueden encontrar en el registro de DefinitelyTyped, que es un repositorio de definiciones de tipos para JavaScript.
Si una librería no tiene tipos disponibles, se puede crear un archivo de declaración de tipos personalizado. Por ejemplo, si se está utilizando una librería llamada `my-library`, se puede crear un archivo `my-library.d.ts` en el directorio `@types` del proyecto:

```ts
declare module 'my-library' {
  export function myFunction(param: string): number;
}
```

Esto permite que TypeScript reconozca la librería y sus tipos, mejorando la experiencia de desarrollo al proporcionar autocompletado y verificación de tipos.

En el caso de las librerias también puede ser interesante generar el d.ts con los tipos para que puedan ser utilizados por otros proyectos. Para ello, se puede usar el comando `tsc --declaration` para generar un archivo `.d.ts` que contenga las definiciones de tipos de la librería.

```bash
tsc --declaration --emitDeclarationOnly
```

Esta opción generará solo un archivo `.d.ts` en el directorio de salida especificado en la configuración de TypeScript (`tsconfig.json`). Este archivo contendrá las definiciones de tipos de la librería, lo que permitirá que otros proyectos puedan utilizarla con TypeScript.

En Vite la generación de tipos se puede configurar en el archivo `vite.config.ts` utilizando el plugin `vite-plugin-dts`. Este plugin permite generar automáticamente los archivos `.d.ts` al compilar el proyecto, lo que facilita la distribución de la librería con sus tipos.

```ts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MyLibrary',
      fileName: (format) => `my-library.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

### 📘 Optimización de proyectos React-TS con herramientas de construcción como Vite

Una vez configurado un proyecto con Vite, puedes aplicar varias técnicas para optimizar el rendimiento, reducir el tiempo de carga y mantener una estructura de desarrollo eficiente.

🧱 1. Uso eficiente de alias y rutas absolutas
Evita los imports relativos complejos (../../../) usando rutas absolutas con tsconfig.json y el plugin vite-tsconfig-paths.

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@hooks/*": ["hooks/*"]
    }
  }
}
```

```bash
npm install -D vite-tsconfig-paths
```

```ts
// vite.config.ts
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});
```

🚀 2. División de código (code splitting)

Reduce el tamaño del bundle inicial mediante carga diferida (lazy loading):

```tsx
import { lazy, Suspense } from 'react';

const AboutPage = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Suspense>
  );
}
```

🧹 3. Análisis del bundle y eliminación de dependencias innecesarias

Instala y configura rollup-plugin-visualizer para identificar dependencias pesadas:

```bash
npm install -D rollup-plugin-visualizer
```

```ts
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), visualizer({ open: true })],
});
```

Esto abre un gráfico interactivo del bundle tras la construcción.

⚙️ 4. Configuración avanzada del build en Vite

Ajusta las opciones de compilación para mejorar el rendimiento en producción:

```ts
// vite.config.ts
export default defineConfig({
  build: {
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
```

Esto separa tus dependencias en un chunk vendor, ideal para caching a largo plazo.

⚡ 5. Optimización de dependencias en desarrollo

Utiliza optimizeDeps para mejorar la velocidad de arranque en desarrollo:

```ts
// vite.config.ts
optimizeDeps: {
  include: ['react-router-dom', 'lodash'];
}
```

Esto precompila dependencias comunes, evitando recargas lentas en dev.

🧠 Buenas prácticas generales

- Minificación: usa esbuild (más rápido que Terser).
- Variables de entorno: separa los entornos (.env.development, .env.production).
- Plugins de compresión: usa vite-plugin-compression para gzip o Brotli.
- Evita dependencias grandes no usadas: revisa tu bundle regularmente.

#### Monorepos

Un **monorepo** es un repositorio único que contiene múltiples proyectos o paquetes relacionados. Esta estructura permite compartir código, dependencias y configuraciones entre diferentes aplicaciones o bibliotecas dentro del mismo repositorio. Los monorepos son especialmente útiles en entornos de desarrollo donde se gestionan múltiples aplicaciones o bibliotecas que comparten dependencias comunes.

Los monorepos ofrecen varias ventajas, como:

- **Reutilización de código**: Permite compartir componentes, utilidades y configuraciones entre diferentes proyectos, lo que reduce la duplicación de código y mejora la mantenibilidad.
- **Consistencia en las dependencias**: Facilita la gestión de versiones y actualizaciones de dependencias compartidas, asegurando que todos los proyectos utilicen las mismas versiones.
- **Facilidad de colaboración**: Los desarrolladores pueden trabajar en múltiples proyectos dentro del mismo repositorio, lo que facilita la colaboración y la revisión de código.

Actualmentte se pueden crear de forma sencilla xon npm o yarn, sin necesidad de herramientas adicionales. Por ejemplo, con npm se puede crear un monorepo utilizando el comando `npm init -w` para inicializar un workspace:

```bash
npm init -w my-monorepo
```

Esto creará un directorio `my-monorepo` con una estructura de monorepo básica. Luego, se pueden agregar paquetes al monorepo utilizando el comando `npm install` con la opción `-w` para especificar el workspace:

```bash
npm install -w my-package
```

En el caso de React con VIte basta con

- definir en el `package.json` del monorepo la propiedad `workspaces` con los directorios de los paquetes:

```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": ["projects/*"]
}
```

- crear un directorio `projects` donde se pueden agregar los paquetes individuales, cada uno con su propio `package.json` y configuración de Vite.
- instalar dentro de la carpeta `projects` cada proyecto React de la forma habitual
- eliminar ficheros innecesarios como `.gitignore`, `tsconfig.json`, `eslint.config.js` o `vite.config.js` de cada proyecto, ya que se pueden definir a nivel del monorepo.

## 🌐 React Router

[React Router](https://reactrouter.com/home) es una biblioteca de enrutamiento para aplicaciones React. Permite definir rutas y manejar la navegación entre diferentes vistas de la aplicación. Con TypeScript, se pueden definir tipos para las rutas y los parámetros, lo que mejora el autocompletado y la verificación de tipos al trabajar con rutas.

React Router es la evolución de react-router-dom, después de haber pasado por el meta-framework de [Remix](https://remix.run/) y en su actual versión 7.x proporciona tres formas diferentes de trabajar (estrategias), incluyendo una API más sencilla y flexible para manejar el enrutamiento en aplicaciones React. Permite definir rutas anidadas, rutas dinámicas y rutas protegidas, lo que facilita la creación de aplicaciones complejas con múltiples vistas.

El **modo declarativo** habilita funciones de enrutamiento básicas, como hacer coincidir URL con componentes, navegar por la aplicación y proporcionar estados activos con API como \<Link>, `useNavigate` y `useLocation`. Corresponde a la forma original de react-router-dom y probablemente siga siendo la forma más común de usar React Router.

```ts
import { BrowserRouter } from "react-router";

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

El **modo Datos**, al mover la configuración de ruta fuera de la representación de React, agrega carga de datos, acciones, estados pendientes y más con API como `loader`, `action`, y `useFetcher`.

```ts
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    loader: loadRootData,
  },
]);

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);
```

El **modo Framework** envuelve el modo Data con un complemento Vite para agregar la experiencia completa de React Router con:

- tipo seguro `href`
- API de módulo de ruta de tipo seguro
- división inteligente de código
- Estrategias de SPA, SSR y renderizado estático

Es la forma más avanzada de usar React Router y es la que se recomienda para aplicaciones nuevas, especialmente si son grandes y complejas. Permite una mayor flexibilidad y control sobre el enrutamiento y la carga de datos, lo que facilita la creación de aplicaciones escalables y mantenibles.

```ts
import { index, route } from '@react-router/dev/routes';

export default [index('./home.tsx'), route('products/:pid', './product.tsx')];
```

Luego tendrá acceso a la API del módulo de ruta con parámetros de tipos seguros, loaderData, división de código, estrategias SPA/SSR/SSG y más.

```ts
import { Route } from "+./types/product.tsx";

export async function loader({ params }: Route.LoaderArgs) {
  let product = await getProduct(params.pid);
  return { product };
}

export default function Product({
  loaderData,
}: Route.ComponentProps) {
  return <div>{loaderData.product.name}</div>;
}
```
