---
title: TYPESCRIPT INTERMEDIO = React con TypeScript
module: 0
---

- [DESCRIPCIÓN](#descripción)
  - [OBJETIVOS](#objetivos)
  - [CONTENIDOS](#contenidos)
- [Introducción. Creación del proyecto: Instalación y configuración.](#introducción-creación-del-proyecto-instalación-y-configuración)
  - [Requisitos previos](#requisitos-previos)
  - [Creación del proyecto: vite](#creación-del-proyecto-vite)
    - [Creación de un nuevo proyecto con Vite](#creación-de-un-nuevo-proyecto-con-vite)
    - [Instalación de dependencias](#instalación-de-dependencias)
  - [Elementos adicionales](#elementos-adicionales)
    - [Herramientas de testing](#herramientas-de-testing)
      - [Mejorar el uso de los matchers extra de @testing-library/jest-dom](#mejorar-el-uso-de-los-matchers-extra-de-testing-libraryjest-dom)
    - [Herramientas de edición de código](#herramientas-de-edición-de-código)
    - [EditorConfig](#editorconfig)
    - [Prettier](#prettier)
- [Componentes](#componentes)
  - [JSX](#jsx)
  - [CSS](#css)
- [Demos a lo largo del curso](#demos-a-lo-largo-del-curso)

## DESCRIPCIÓN

Alejandro Cerezo Lasne
<alce65@hotmail.es>

DURACIÓN 39 horas

### OBJETIVOS

- Utilizar TypeScript en proyectos React, aplicando tipos para componentes y eventos.
- Optimizar el uso de funciones en React con TypeScript, tipando correctamente callbacks y hooks.
- Implementar patrones de diseño básico en aplicaciones React usando TypeScript.
- Integrar librerías externas y herramientas de construcción con React y TypeScript.
- Escribir aplicaciones React con una estructura modular y tipada, facilitando el mantenimiento y escalabilidad.

  - Inferencia y anotación de tipos
    - Inferencia de tipos
    - Tipos literales
    - El tipo any
    - Variables y tipos explícitos
    - 📘 Uso de tipos inferidos y explícitos en funciones React
    - Tipos propios
      - Alias de tipos
      - Interfaces. Propiedades y funciones
    - Tipado de los componentes
      - 📘 Tipado de props y state en componentes funcionales
      - 📘 Literales y tipos de unión aplicados en componentes React
    - Tipado de eventos del DOM
      - El objeto evento en React
      - Interfaces de eventos específicos
      - Atributos `target` y `currentTarget`
      - Casting de tipos
      - 📘 Tipado de eventos de formulario
      - Formularios controlados con multiples campos
    - 📘 Tipos de unión, intersección aplicados en componentes React
      - Tipos de unión aplicados en componentes React
      - Tipos de intersección aplicados en componentes React

### CONTENIDOS

- MÓDULO 1: TIPOS AVANZADOS EN TYPESCRIPT PARA REACT
  - 📘 Tipos de unión, intersección y literales aplicados en componentes React.
  - 📘 Tipado de props y state en componentes funcionales.
  - 📘 Uso de tipos inferidos y explícitos en funciones React.
  - 📘 Tipado de eventos de formulario y DOM en React (onClick, onChange).
- MÓDULO 2: FUNCIONES Y HOOKS CON TYPESCRIPT EN REACT
  - Sobrecarga de funciones y tipos de retorno en funciones de React.
  - Tipado de useState, useEffect y otros hooks básicos.
  - Introducción a hooks personalizados tipados para manejo de lógica reutilizable.
  - Uso de callbacks y promesas en componentes React, con tipado correcto.
- MÓDULO 3: PROGRAMACIÓN ORIENTADA A COMPONENTES EN REACT
  - Clases y componentes basados en clases con TypeScript.
  - Tipado avanzado de props y estado en componentes de clase.
  - Uso de readonly, abstract y modificadores de acceso en componentes de clase.
- MÓDULO 4: ESTRUCTURACIÓN Y MÓDULOS EN PROYECTOS REACT
  - Estructura modular en proyectos React: configuración de módulos y namespaces.
  - Importación y exportación de componentes tipados.
  - Configuración avanzada de tsconfig.json en proyectos React.
  - Uso de namespaces para organizar aplicaciones grandes de React.
- MÓDULO 5: INTEGRACIÓN DE LIBRERÍAS Y HERRAMIENTAS EN REACT CON TYPESCRIPT
  - Tipado e integración de librerías comunes en React (React Router, Redux, etc.).
  - Configuración de definiciones de tipos con @types.
  - Optimización de proyectos React-TS con herramientas de construcción como Webpack y Gulp.
- MÓDULO 6: BUENAS PRÁCTICAS EN REACT CON TYPESCRIPT
  - Principios básicos de SOLID en proyectos React-TS.
  - Uso eficiente de patrones de diseño en React (patrones de composición).
  - Estrategias para asegurar la mantenibilidad y escalabilidad de aplicaciones React.
- MÓDULO 7: PRÁCTICA GUIADA: DESARROLLO DE UNA APLICACIÓN REACT CON TYPESCRIPT
  - Implementación de una aplicación React desde cero.
  - Uso de TypeScript para tipado de componentes, hooks y eventos.
  - Buenas prácticas para manejo del estado y estructura modular.

## Introducción. Creación del proyecto: Instalación y configuración.

### Requisitos previos

- Node y npm instalados.
- Visual Studio Code o editor de código preferido.

### Creación del proyecto: vite

Para instalar React y TypeScript, se puede utilizar Vite, un generador de proyectos y empaquetador de código.

Según ellos mismos <https://vite.dev/>

> Vite es una herramienta de creación de frontend increíblemente rápida que impulsa la próxima generación de aplicaciones web

- Un servidor de desarrollo que ofrece mejoras de funciones enriquecidas con respecto a los módulos ES nativos , por ejemplo, un reemplazo de módulo en caliente (HMR) extremadamente rápido .

- Un comando de compilación (builder) que agrupa su código con Rollup , pre-configurado para generar activos estáticos altamente optimizados para producción. Vite puede incorporar en esta fase herramientas como PostCSS, Sass, TypeScript, etc.

- La compatibilidad con frameworks y la integración con otras herramientas se pueden realizar mediante plugins, como sucede en el caso de React

#### Creación de un nuevo proyecto con Vite

Para crear un nuevo proyecto con Vite, se puede utilizar el siguiente comando:

```shell
$ npm create vite@latest
```

Esto iniciará un asistente que te guiará a través de la creación del proyecto. Puedes elegir entre diferentes plantillas, como React, Vue, Svelte, etc.

Otra opción es indicar directamente el nombre del proyecto y la plantilla que deseas utilizar. Por ejemplo, para crear un proyecto de React con TypeScript, puedes usar el siguiente comando:

```bash
npm create vite@latest nombre-del-proyecto -- --template react-ts
```

El resultado incluye las siguientes dependencias:

```json
 "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5"
  }
```

Como se ve, se han instalado TypeScript, React, ESLint y Vite, como builder.
El archivo `tsconfig.json` se crea automáticamente y contiene la configuración básica para TypeScript. Puedes personalizarlo según tus necesidades.
Lo mismo sucede con el archivo de configuración de ESLint, `eslint.config.js`, y con el del propio `vitest`.

#### Instalación de dependencias

Para instalar las dependencias del proyecto, puedes utilizar el siguiente comando:

```bash
npm i
```

Esto instalará todas las dependencias necesarias para el proyecto, incluyendo React, ReactDOM y TypeScript.

### Elementos adicionales

Además de las dependencias básicas, es posible que desees instalar algunas dependencias adicionales para mejorar tu flujo de trabajo.

#### Herramientas de testing

La más habitual de todas ellas es alguna herramienta de testing, como Vitest, que es un framework de pruebas para Vite. Puedes instalarlo con el siguiente comando:

```shell
npm i -D vitest
npm i -D @vitest/coverage-c8
npm i -D jsdom
npm i -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Update `tsconfig.app.json` y `tsconfig.node.json` to add `vitest` to the `types` array:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

Update `vite.config.ts` to add the `vitest` property:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["**/*.test.ts", "**/*.test.tsx"],
    globals: true,
    coverage: {
      include: ["src/**/*.ts"],
      exclude: ["src/index.ts", "src/**/types/*.ts"],
    },
  },
});
```

Update `package.json` to add the `test` script:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

##### Mejorar el uso de los matchers extra de @testing-library/jest-dom

`testConfig.ts` to src folder:

```ts
import "@testing-library/jest-dom/vitest";
```

Update `vitest.config.ts` to add the `setupFiles` property:

```ts
setupFiles: ["./testConfig.ts"];
```

#### Herramientas de edición de código

#### EditorConfig

EditorConfig es una herramienta que ayuda a mantener estilos de codificación consistentes entre diferentes editores e IDEs. Puedes instalar el plugin de EditorConfig en tu editor de código preferido.
El archivo `.editorconfig` se utiliza para definir las reglas de estilo de codificación. Aquí tienes un ejemplo de un archivo `.editorconfig`:

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
```

#### Prettier

Prettier es una herramienta de formateo de código que ayuda a mantener un estilo de codificación consistente. Puedes instalar el plugin de Prettier en tu editor de código preferido.

Para definir las reglas de formateo de código se puede usar el archivo `.prettierrc` o añadir las reglas directamente al archivo `package.json`. Un ejemplo de estas reglas es el siguiente:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 80
}
```

Cuando no están explícitamente definidas, Prettier utiliza las reglas de .editorconfig, si existe.

## Componentes

Los componentes son la base de React. Un componente es una función o clase que devuelve un fragmento de código HTML. Los componentes pueden ser de clase o funcionales.

- Los componentes funcionales son funciones de JavaScript que devuelven JSX. Son la forma habitual de crear componentes en proyectos de React de los últimos años.
- Los componentes de clase son clases de JavaScript que extienden la clase `React.Component` y tienen un método `render()` que devuelve JSX.

### JSX

**JSX** es una extensión de sintaxis para JavaScript que permite escribir HTML dentro de JavaScript. JSX se compila a JavaScript puro antes de ser ejecutado en el navegador.

- JSX permite escribir HTML de manera más legible y fácil de entender.
- JSX se utiliza para describir cómo debería lucir la interfaz de usuario.

### CSS

## Demos a lo largo del curso

- Componente HelloWorld
- Componente Counter (1)
- Componente Button
- Componente Counter (2)
- Componente SimpleForm
- Componente Form
- Componente CourseRegistration
- Componente ProfileCard
- Componente Box

- Componente DisplayField
- Componente Item
- Componente Focus
- Hook useToggle
- Hook useLocalStorage\<T>
- Componente User
- Hook UseUser
- Componente CounterFlux

- Componente ClassComponent (Class)
- Componente UserCard (Class)
- Servicio: InMemoryUserRepository
- Servicio: APIUserRepository
- ThemeLanguageContext
- UserContext
