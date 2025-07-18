# Curso de React & TypeScript

## DESCRIPCIÓN

Alejandro Cerezo Lasne
<alce65@hotmail.es>

DURACIÓN 39 horas / 3 semanas (L-J) / 12 días

## Día 1 (L 09/06)

- Presentación del curso
- Presentación del formador y los alumnos
- Monorepos con npm
- Instalación de React + TypeScript con Vite
- Reorganización de la demo inicial de Vite. Componente Initial
- Instalación de Vitest y Testing Library
  - Prueba con un test del componente Initial
  - Test de eventos: click

- Introducción a TypeScript
  - Inferencia y anotación de tipos
  - Tipos literales
  - El tipo any y el tipo unknown
  - Tipado de funciones. Modificación de ESLint

## Día 2 (M 10/06)

- Introducción a TypeScript
  - Tipos propios: Alias v. Interfaces

- Tipado de eventos del DOM -> CounterEvent
  - Target y currentTarget
  - Firmas de indice (Records)

- Tipado de datos en React
  - Entidades y DTOs
  - Utilidades de tipos en TypeScript

- Componentes funcionales y tipos
  - Props
  - Props -> Counter
  - PropTypes vs TypeScript
  - State -> Counter
  - Literales y tipos de unión -> Button

## Día 3 (X 11/06)

- La prop children -> Button
  - Composición de componentes
  - [S]OLID: Single Responsibility Principle
- Formularios
  - Formularios controlados
  - Tipado de eventos Change y Submit
  - Ejemplos. Checkbox
  - Formularios no controlados. FormData

## Día 4 (J 12/05)

- Review: función getDataForm usando FormData.
  - Uso de genericos para abstraer la función
- Tipos unión e intersección
  - Tipos unión: uniones discriminadas
  - Intersección de tipos. Extensión de Interfaces
  - SOL[I]D: Interface Segregation Principle

- Módulo 2
- sobrecarga de funciones
  - multiples firmas de función
  - implementación única de la función
- hooks de react
  - useState
  - useEffect
  - useMemo y useCallback

## Día 5 (L 16/06)

- hooks de react (continuación)
  - useRef
  - design system: forwardRef
  - useRef en React19

- Custom Hooks
  - Ejemplo: useToggle: basic hook with state: Tupla como retorno
  - Ejemplo: useLocalStorage\<T>: hooks y genéricos

- Callbacks y Promesas. Encapsulando fetch como servicio
  - Callbacks: funciones de orden superior
  - Promesas
    - Ejemplo: fetch de datos con useEffect
    - Feature users: entity / component / hook / service
      - Abstracción del código del componente User
      - Tipado del hook
      - Uso del hook en el componente

## Día 6 (M 17/06)

- Callbacks y Promesas (continuación).
  - async/await
  - Problemas en las dependencias de useEffect
    - Ejemplo: useEffect con dependencias
    - Solución: useCallback y useMemo
- Hook useId
  - Generación de IDs únicos
  - Uso del hook en los componentes Form
- Flux con useReducer
  - Ejemplo: componente Contador
  - Entidad, Acciones y reducer. Tipado
  - Uso del hook useReducer en el componente. Funciones dispatch
  - Test del reducer

## Día 7 (X 18/06)

- Mejoras de Flux
  - Nombres de las acciones
  - Action creators
  - Reducers como diccionarios de funciones. Reducción de complejidad
  - Incorporación de lógica asíncrona
  - Thunks
- Modulo 3 Clases. Inyección de dependencias
  - Introducción a las clases en TypeScript
  - Clases y herencia
  - Interfaces y clases abstractas
- Componentes basados en clases
  - Props y State. Tipado
  - Jerarquía de componentes
  - Ciclo de vida y Hooks en componentes de clase

## Día 8 (J 19/06)

- Servicios basados en clases
  - Nuevo proyecto: **demo2**
  - Ejemplo: Repositorios. Uso de interfaces
  - Inyección / inversión de dependencias.
  - Repositorios en el custom Hook
- Context API
  - Contexto y Provider

## Dia 9 (L 23/06)

- Context API (continuación)
  - Contexto como inyector de dependencias
  - Contexto como estado global
  - Custom Hooks en el contexto

- Modulo 4. Proyectos
  . Estructura modular de un proyecto
  - Estructura de carpetas (scaffolding) : feature oriented
  - Módulos ESM. Import / Export. Import types
  - Importaciones en Vite
- Tsconfig
  - Alias de importación: tsconfig y Vite
- Namespaces en TypeScript y en ESM

## Día 10 (X 25/06)

- Caso práctico: demo3
  - Incorporación de un proyecto nuevo
  - Organización feature oriented
  - Componentes iniciales del core:
    - App
    - Header
    - Footer
- Testing unitario
  - Test de App: Mock de componentes
  - Test de Header y Footer: testing/Library
- Layout y context. DI del título

- React Router
  - Instalación. Estrategias
  - Modo declarativo. Router (Provider)
    - Definición de rutas: componentes Routes y Route
    - Navegación mediante urls en el navegador
    - Organización de las rutas: componente AppRouter
  - Menu: Link y NavLink. Iteración al crearlo
  - Creación de las páginas. Navegación entre ellas
  - Rutas dinámicas. Página de detalle
    - Parámetros de ruta
    - Navegación programática

## Día 11 (J 26/06)

- React Router (continuación)
  - Refactorización del menú
  - Componente Outlet. Renderizado de rutas hijas
  - Rutas lazy. Suspense
  - Test de rutas lazy
- Modo datos de React Router
  - Clon del proyecto anterior
  - Estrategia de datos. Rutas y router
  - Lazy loading

Pendiente de exponer

- Modo datos de React Router (continuación)
  - Test de las rutas con datos
  - Error boundaries. Class componentes
- Feature products
  - Entidad y DTO. Mock de productos
  - Repositorio de productos
  - Página de productos. Repositorio en el archivo
  - [Commit]: Add Products feature with repo service
  - Inyección desde main y el contexto
  - Tests
  - [Commit]: Update Products feature with context

## Día 12 (L 30/06)

- Componente ProductDetail
  - Test de los componentes
  - [Commit]: Update ProductDetails and test it
- Loaders en las rutas
  - Factory de las rutas con DI

- Redux
  - Introducción a Redux
  - Instalación de Redux Toolkit
  - Store y Provider
  - Nueva feature Cart
    - Reducers y acciones
    - Uso de useSelector y useDispatch
