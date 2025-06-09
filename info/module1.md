---
title: TYPESCRIPT INTERMEDIO = React con TypeScript
module: 1
---

- [🧩 MÓDULO 1: Tipos (Avanzados) en TypeScript para React](#-módulo-1-tipos-avanzados-en-typescript-para-react)
  - [🎯 Objetivos del módulo](#-objetivos-del-módulo)
  - [🧠 Inferencia y anotación de tipos](#-inferencia-y-anotación-de-tipos)
    - [Inferencia de tipos](#inferencia-de-tipos)
    - [Tipos literales](#tipos-literales)
    - [El tipo any](#el-tipo-any)
    - [Variables y tipos explícitos (type annotations)](#variables-y-tipos-explícitos-type-annotations)
    - [📘 Uso de tipos inferidos y explícitos en funciones React](#-uso-de-tipos-inferidos-y-explícitos-en-funciones-react)
      - [Uso de tipos propios de React](#uso-de-tipos-propios-de-react)
      - [⚙️ Tipado del retorno de las funciones obligatorio](#️-tipado-del-retorno-de-las-funciones-obligatorio)
  - [🧠 Tipos propios (custom Types)](#-tipos-propios-custom-types)
    - [Alias de tipos (type aliases)](#alias-de-tipos-type-aliases)
    - [Interfaces](#interfaces)
      - [Interfaces y clases](#interfaces-y-clases)
    - [Tipos v. interfaces](#tipos-v-interfaces)
      - [Extensión de interfaces y combinación de tipos](#extensión-de-interfaces-y-combinación-de-tipos)
      - [Uso de tipos o interfaces](#uso-de-tipos-o-interfaces)
  - [Tipado de los datos](#tipado-de-los-datos)
    - [DTO (Data Transfer Object) y utilidades de tipos](#dto-data-transfer-object-y-utilidades-de-tipos)
  - [🌐 Tipado de los componentes](#-tipado-de-los-componentes)
    - [🧿 Componente HelloWorld](#-componente-helloworld)
    - [Componentes y elementos](#componentes-y-elementos)
    - [📘 Tipado de props y state en componentes funcionales](#-tipado-de-props-y-state-en-componentes-funcionales)
      - [🧿 Componente Counter](#-componente-counter)
    - [📘 Literales y tipos de unión aplicados en componentes React](#-literales-y-tipos-de-unión-aplicados-en-componentes-react)
      - [🧿 Componente Button](#-componente-button)
      - [La prop `children`](#la-prop-children)
  - [🌐 SOLID: Principio de Responsabilidad Única (SRP)](#-solid-principio-de-responsabilidad-única-srp)
  - [🌐 Tipado de eventos del DOM](#-tipado-de-eventos-del-dom)
    - [El objeto evento en React](#el-objeto-evento-en-react)
    - [Interfaces de eventos específicos](#interfaces-de-eventos-específicos)
    - [Atributos `target` y `currentTarget`](#atributos-target-y-currenttarget)
    - [Casting de tipos](#casting-de-tipos)
    - [🧿 Componente Counter refactorizado](#-componente-counter-refactorizado)
  - [🌐 Formularios](#-formularios)
    - [📘 Tipado de eventos de formularios controlados](#-tipado-de-eventos-de-formularios-controlados)
      - [🧿 Componente SimpleForm: formulario controlado](#-componente-simpleform-formulario-controlado)
      - [🧿 Componente Form: formulario controlado con multiples campos](#-componente-form-formulario-controlado-con-multiples-campos)
    - [Formularios no controlados](#formularios-no-controlados)
      - [🧿 Componente CourseRegistration](#-componente-courseregistration)
      - [FormData](#formdata)
  - [📘 Tipos de unión, intersección aplicados en componentes React](#-tipos-de-unión-intersección-aplicados-en-componentes-react)
    - [Tipos de unión aplicados en componentes React](#tipos-de-unión-aplicados-en-componentes-react)
      - [🧿 Componente ProfileCard](#-componente-profilecard)
    - [Tipos de intersección aplicados en componentes React](#tipos-de-intersección-aplicados-en-componentes-react)
      - [🧿 Componente Box](#-componente-box)
      - [SOLID: Principio de Segregación de Interfaces (ISP)](#solid-principio-de-segregación-de-interfaces-isp)
  - [📝 Ejercicios sugeridos](#-ejercicios-sugeridos)

## 🧩 MÓDULO 1: Tipos (Avanzados) en TypeScript para React

### 🎯 Objetivos del módulo

- Comprender el concepto de inferencia v. anotación de tipos
- Usar tipos inferidos y explícitos para funciones en componentes React.
- Comprender y aplicar los tipos de unión, intersección y literales en el contexto de React.
- Asignar el tipo adecuadamente las props y el estado (state) en componentes funcionales.
- Manejar el tipado correcto de eventos del DOM y formularios en React

### 🧠 Inferencia y anotación de tipos

#### Inferencia de tipos

Los resultados inmediatos del uso de TypeScript son la **inferencia de tipos** y el **chequeo de tipos** (type checking) que se realiza en el editor de código, incluso antes de compilar el código.

Respecto a lo primero, TypeScript puede **inferir el tipo** de una **variable** basándose en el valor asignado.

```ts sample0.basic.ts
let x = 10; // x: number
```

Sin necesidad de especificar el tipo de la variable `x`, TypeScript es capaz de inferir que `x` es de tipo `number`.
Además, en el propio editor de código, TypeScript mostrará un error si se intenta asignar un valor de tipo distinto al inferido.

```ts sample0.basic.ts
let x = 10;
x = 'Hola'; // Error: Type 'string' is not assignable to type 'number'
```

Para los valores primitivos, los tipos inferidos son los mismos siete tipos primitivos de JavaScript: `number`, `string`, `boolean`, `null`, `undefined`, `symbol` y `bigint`.

Para los objetos, TypeScript infiere el tipo de la variable a partir de la estructura del objeto.

```ts sample0.basic.ts
let user = {
  name: 'John',
  age: 30,
};
// user: { name: string; age: number }
```

Es importante aprovechar la inferencia de tipos y no usar anotaciones innecesarias. Aunque depende del conjunto de reglas activo, es habitual que el linter nos alerte en caso de usar anotaciones innecesarias.

```ts sample0.basic.ts
let state: boolean = false;

// Type boolean trivially inferred from a boolean literal, remove type annotation.
// eslint@typescript-eslint/no-inferrable-types
// let state = false
```

#### Tipos literales

Hay que considerar la diferencia entre las declaraciones `let` y `const`, dando esta segunda lugar a los **tipos literales** (literal types). Esto se debe a que TypeScript trata de hacer siempre la inferencia lo más específica posible.

```ts sample0.basic.ts
let x = 10; // x: number
const y = 20; // y: 20
```

En caso de `let` es posible forzar un tipo literal una conversión de tipo (type casting), de las que luego hablaremos. Por ejemplo, si se quiere que `x` sea un número 10, se puede hacer lo siguiente:

```ts sample0.basic.ts
let x = 10 as const; // x: 10
```

#### El tipo any

El tipo `any` **implícito** aparece cuando TypeScript no puede inferir el tipo de una variable. Es un tipo que **no** proporciona **ninguna** información sobre el valor de la variable.

```ts sample0.basic.ts
let x; // x: any
x = 10; // x: any
x = 'Hola'; // x: any
```

#### Variables y tipos explícitos (type annotations)

En caso de un any implícitos, entre otros, es conveniente usar **anotaciones de tipos** (type annotations), para proporcionar (anotar) tipos **explícitos** a las variables.

```ts sample0.basic.ts
let x;
x = 10; // x: any;
let y: number; // anotación de tipo
y = 12; // y: number
```

Las anotaciones son especialmente importantes, en el caso de los **parámetros** y **valores de retorno** de las **funciones**.

```ts sample0.basic.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

greet('John'); // Correcto
greet(42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

#### 📘 Uso de tipos inferidos y explícitos en funciones React

Como hemos visto, TypeScript infiere tipos automáticamente, cuando las variables se declaran con un valor inicial. Esto solo se aplica a los parámetros de las funciones cuando tienen un valor por defecto.

```tsx sample0.button.tsx
const handleClick = (event = new MouseEvent('click')) => {
  console.log(event);
};
```

En caso de no tener un valor por defecto, TypeScript no puede inferir el tipo del parámetro `event`, ya que podría ser cualquier cosa. Por lo tanto, el tipo de `event` es `any`.

```tsx sample0.button.tsx
const handleClick = (event) => {
  console.log(event);
};
```

Para evitar esto, es imprescindible usar una **anotación de tipo** explícita para el parámetro `event`, como `SyntheticEvent` o `React.MouseEvent` .

```tsx sample0.button.tsx
const handleClick = (event: React.MouseEvent) => {
  console.log(event);
};
```

##### Uso de tipos propios de React

Cuando asignamos un manejador de evento a un componente de React, como `onClick`, `onChange`, etc., podemos ver que React utiliza sus propios tipos para los elementos de HTML y las funciones manejadoras de eventos.

```tsx sample0.button.tsx
<button onClick={handleClick}>Hacer clic</button>
```

Intellisense nos muestra que el tipo del button es `JSX.IntrinsicElements.button`, que es un tipo genérico que representa un elemento HTML de tipo botón. Este tipo se define en el namespace de React, y se puede usar para tipar los elementos de HTML en React.

En cuanto a los eventos, React utiliza tipos específicos para cada tipo de evento y para su correspondiente handler. Por ejemplo, el atributo `onClick` pertenece al tipo `React.DOMAttributes<HTMLButtonElement>` y espera como valor una función manejadora de eventos del tipo es `React.MouseEventHAndler<HTMLButtonElement>`.

Si creamos una función aparte para asignarla a esta propiedad podemos definirla con el tipo qwe nos proporciona React

```tsx sample0.button.tsx
const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  console.log(event);
};
```

De este modo estaremos tipando el parámetro `event` como un evento de tipo `MouseEvent`, que es un tipo específico de evento de ratón en React y la función como void, sin indicarlo explícitamente como vemos a continuación.

```tsx sample0.button.tsx
const handleClick = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
): void => {
  console.log(event);
};
```

Estos tipos son específicos de React y permiten a TypeScript inferir el tipo del evento correctamente.

##### ⚙️ Tipado del retorno de las funciones obligatorio

En el caso de las funciones es posible usar anotaciones de tipo explícitas, tanto en sus parámetros como en su valor de retorno.
El tipado del retorno de las funciones, aunque es opcional, pero mejora **la legibilidad** del código y puede ayudar a **detectar errores** pronto, en la propia función, en lugar de al usarla. Se profundizará en ello más adelante.

```tsx
// Inferido
const handleClick = () => {
  console.log('clicked');
};

// Explícito
const handleMultiply = (a: number, b: number): number => {
  return a * b;
};
```

El tipado del retorno de las funciones es una buena práctica, especialmente útil en funciones complejas, donde la inferencia puede no ser suficiente o clara. Para hacer **obligatorio el tipado del retorno de las funciones**, se pueden usar dos mecanismos:

- se puede usar la opción `noImplicitAny` en el archivo de configuración `tsconfig.json`, que obliga a TypeScript a mostrar un error si no se especifica un tipo de retorno.

```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

- se puede añadir una regla en el archivo de configuración de ESLint, que obligue a especificar el tipo de retorno de las funciones, o al menos que muestre una advertencia.

```json
{
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "error" // o "warn"
  }
}
```

### 🧠 Tipos propios (custom Types)

Existen dos mecanismos en TypeScript para dar nombre a nuevos tipos, denominados **tipos propios**, que pueden ser importados y exportados entre diferentes módulos:

- **Alias de tipos** (type aliases)
- **Interfaces** (interfaces)

#### Alias de tipos (type aliases)

Los alias de tipos permiten dar nombre a un tipo y reutilizarlo en diferentes partes del código. Se definen con el operador `type` y se pueden utilizar para definir con un nombre cualquiera de los tipos que existen en TypeScript, como los tipos de objetos, tipos de tuplas, tipos de unión y tipos de intersección que ya conocemos.

```ts sample0.types.1.ts
type User = { name: string; age: number };
type Tuple = readonly [string, number];
type Success = { status: 'success'; data: string[] };
type Fail = { status: 'error'; error: Error };
type Response = Success | Fail;
```

Igualmente se pueden usar alias de tipos para definir tipos de funciones, que se pueden reutilizar en diferentes partes del código.

```ts sample0.types.1.ts
type Callback = (a: number, b: number) => number;
const add: Callback = (a, b) => a + b;
const multiply: Callback = (a, b) => a * b;
```

Al dar nombres a tipos, se pueden **simplificar definiciones** de tipos complejos, y **reutilizar** los nombres en diferentes partes del código, incluyendo otros módulos.

A diferencia de lo que ocurre con las interfaces, también se pueden usar alias de tipos para renombrar tipos **primitivos** y tipos **literales** o conjunto de cualquiera de ellos, creados mediante uniones o intersecciones.

```ts sample0.types.1.ts
type Name = string;
type Age = number;
type ID = string | number;
type Status = 'success' | 'error';
type Firsts = 1 | 2 | 3 | 4 | 5;
type Events = 2 | 4 | 6 | 8;
```

En estos casos destaca especialmente el valor semántico de los alias de tipos, que permiten **dar nombre** a los tipos y **mejorar la legibilidad** del código.

#### Interfaces

Las interfaces son otra forma de dar un nombre a un tipo, pero no a cualquier tipo de TypeScript, no pudiendo usarse con tipos primitivos o sus literales. Se definen con la palabra clave `interface` y se pueden utilizar para definir tipos de objetos, tipos de funciones y tipos de clases.

```ts sample0.types.1.ts
export type User = {
  name: string;
  age: number;
};

export interface User {
  name: string;
  age: number;
}
```

Igual que en los objetos, en los tipos u en los interfaces se pueden incluir **propiedades opcionales** y **propiedades de solo lectura**.

```ts sample0.types.1.ts
export interface User {
  name: string;
  age: number;
  pet?: string;
  readonly id: string;
}
```

##### Interfaces y clases

Las clases en TypeScript son en si mismas una interfaz, por lo que pueden ser utilizadas para definir el tipo de cualquier variable.

```ts sample0.types.1.ts
export class User {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const user: User = { name: 'Pepe', age: 30 };
```

Más adelante se verá el uso de las clases en TypeScript, pero por el momento es importante tener en cuenta que las interfaces y las clases son dos formas diferentes de definir tipos en TypeScript.

#### Tipos v. interfaces

En términos generales los tipos y los interfaces son intercambiables e incluso pueden utilizarse juntos a la hora de crear nuevos tipos. Sin embargo, existen algunas diferencias entre ellos:

- **Valores primitivos y literales**: los tipos pueden ser utilizados para definir cualquier tipo de TypeScript, incluyendo tipos primitivos y literales, mientras que las interfaces solo pueden ser utilizadas para definir tipos de objetos.

```ts sample0.types.1.ts
type Name = string;
type Age = number;
type ID = string | number;
type Status = 'success' | 'error';
```

- **Fusión de declaraciones (declaration merging)**: las interfaces pueden volver a ser declarados lo que significa que se pueden extender mediante esta técnica para crear interfaces más complejos. Por el contrario, los tipos no pueden extenderse volviendo a ser declarados.

```ts sample0.types.2.ts
interface User {
  name: string;
}

interface User {
  age: number;
}
// User: { name: string; age: number }
```

##### Extensión de interfaces y combinación de tipos

En ambos casos existen mecanismos de **extensión**, equivalentes pero diferentes:

En los interfaces se pueden extender otras interfaces, utilizando la palabra clave `extends`, y se pueden combinar con otras interfaces utilizando el operador `|` (unión).

```ts sample0.types.2.ts
interface User {
  name: string;
}

interface Admin extends User {
  role: string;
}
```

En el caso de los tipos se pueden combinar con otros tipos utilizando el operador `&` (intersección).

```ts sample0.types.2.ts
type User = {
  name: string;
};

type Admin = User & {
  role: string;
};
```

En cualquiera de los casos, se puede usar el operador `|` (unión) para combinar tipos o interfaces

```ts sample0.types.2.ts
type User = {
  name: string;
  boss: string;
};

interface Admin {
  name: string;
  team: string;
}

type UserOrAdmin = User | Admin;
```

##### Uso de tipos o interfaces

La documentación oficial de [TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) indica:

> El uso de interfaces con extends a menudo puede ser más eficiente para el compilador que el uso de alias de tipo con intersecciones.
> En general, puede elegir según sus preferencias personales, y TypeScript le indicará si necesita que algo sea el otro tipo de declaración.
> Si desea una heurística, use interface hasta que necesite usar características de type.

En la configuración por defecto del Linter de TypeScript, existe una regla que obliga a usar interfaces en lugar de tipos para definir tipos de objetos (Use an `interface` instead of a `type`): `eslint@typescript-eslint/consistent-type-definitions`.

Si preferimos usar tipos en lugar de interfaces, podemos desactivar esta regla en el archivo de configuración de ESLint.

```json
{
  "rules": {
    "@typescript-eslint/consistent-type-definitions": "off"
  }
}
```

### Tipado de los datos

Utilizando tipos propios, interfaces o incluso clases, se pueden definir tipos de datos complejos, que pueden ser reutilizados en diferentes partes del código.

De esta manera pueden definirse

- las entities (entities) de la aplicación, como usuarios, productos, pedidos, etc.
- los tipos de datos que se utilizan para el funcionamiento de la aplicación

```ts sample1.data.ts
type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};
```

A partir de un tipo de datos, se pueden definir otros tipos de datos más complejos, como por ejemplo un tipo de datos que represente una lista de usuarios.

```ts sample1.data.ts
type UserList = {
  users: User[];
};
```

#### DTO (Data Transfer Object) y utilidades de tipos

Igualmente es posible definir tipos derivados de los ya existentes. Por ejemplo, en el caso de las entidades, es posible definir un tipo de datos que represente su **DTO** (Data Transfer Object), es decir el conjunto de datos que se transfieren al backend para que este pueda crear la entidad completa.

```ts sample1.data.ts
type UserDTO = Omit<User, 'id'>;
```

En la creación del DTO usamos una utilidad de TypeScript, `Omit`, que permite crear un nuevo tipo a partir de otro, omitiendo una o varias propiedades. En este caso, omitimos la propiedad `id` del tipo `User`, ya que no es necesaria para crear el DTO.

Otras utilidades de TypeScript son

- `Pick`, que permite crear un nuevo tipo a partir de otro, seleccionando una o varias propiedades,
- `Partial`, que permite crear un nuevo tipo a partir de otro, haciendo todas las propiedades opcionales.
- `Required`, que permite crear un nuevo tipo a partir de otro, haciendo todas las propiedades requeridas.
- `Record`, que permite crear un nuevo tipo a partir de otro, definiendo un conjunto de propiedades y su tipo.
- `ReturnType`, que permite crear un nuevo tipo a partir de otro, definiendo el tipo de retorno de una función.

Más adelante se verán ejemplos de su uso.

### 🌐 Tipado de los componentes

Los componentes de React son funciones que devuelven un elemento de React, del tipo `JSX.Element`. En TypeScript, se pueden tipar de varias maneras, dependiendo de cómo se desee definir el tipo de las props y el estado del componente.

#### 🧿 Componente HelloWorld

El componente mas sencillo es una función que no recibe props y devuelve un elemento de React. En este caso, TypeScript infiere el tipo del componente como `JSX.Element`.

```tsx sample1.hello.tsx
export const HelloWorld = () => {
  return <h1>Hola Mundo</h1>;
};
```

Si se prefiere que el tipo del componente sea explícito, se puede usar el tipo `JSX.Element` para definir el tipo de retorno del componente.

```tsx sample1.hello.tsx
import { JSX } from 'react';

export const HelloWorld: () => JSX.Element = () => {
  return <h1>Hola Mundo</h1>;
};
```

Otra alternativa es tipar la propia función como `React.FC`, que es un tipo genérico que permite definir el tipo de las props del componente. Este tipo se puede usar para tipar los componentes de React, y se puede combinar con otros tipos para definir el estado del componente.

```tsx sample1.hello.tsx
export const HelloWorld: React.FC = () => {
  return <h1>Hola Mundo</h1>;
};
```

#### Componentes y elementos

- Un **componente** es una función que devuelve un elemento de React, que puede ser un elemento HTML o un componente de React. Como hemos visto, su tipo es `React.FC`, que es un tipo genérico definido en el namespace de react (`React`), que permite asignar el tipo de las props del componente.

- Un **elemento** es un objeto que representa cierto HTML, y que se puede renderizar en la pantalla. En React es el resultado de ejecutar un componente y su tipo es `JSX.Element` o `ReactNode`.

Volviendo al componente, en realidad, el tipo `FC` es un alias de un interface genérico que se define como:

```ts
 interface FunctionComponent<P = {}> {
        (props: P): ReactNode | Promise<ReactNode>;
```

Los genéricos nos permiten parametrizar tipos, lo que abre una gran oportunidad para reutilizar tipos ampliamente en un proyecto de TypeScript.

Se utiliza la notación `<T>` para definir un tipo genérico, que se puede usar en lugar de cualquier tipo en la definición de una clase, interfaz, función o método. La T sería el nombre del tipo genérico, que se puede sustituir por cualquier otro nombre en PascalCase, aunque por convenio se usan le tras de la A a la Z, aunque comenzando generalmente por la T.

En el interface `FunctionComponent`, el tipo `P` es un tipo genérico que se puede sustituir por cualquier otro tipo, y que se utiliza para definir el tipo de las props del componente. El valor de retorno del componente es `ReactNode`, que es un tipo que representa cualquier elemento de React.

#### 📘 Tipado de props y state en componentes funcionales

Una de las principales características de los componentes es su capacidad para recibir **props** (propiedades) que permiten personalizar su comportamiento y apariencia. Las props son un objeto que se pasa como argumento al componente y que contiene los valores de las propiedades.

##### 🧿 Componente Counter

Tomemos como ejemplo un componente contador, que tiene una prop `initialCount` y más adelante lo completaremos con un estado `count` que se inicializa con el valor de la prop.

```tsx sample2.counters.tsx
// type CounterProps = {
type Props = {
  initialCount: number;
};

export const Counter: React.FC<Props> = ({ initialCount }) => {
  return (
    <div>
      <h2>Contador</h2>
      <button>➕</button>
      <button>➖</button>
    </div>
  );
};
```

Esta forma de tipar las props podía der algunos problemas en React 17, pero parece que ha sido solucionado en versiones posteriores.

En lugar de usar el tipo `React.FC`, y en su genérico tipar las props (React.FC\<Props>), es frecuente usar como componentes funciones tipadas directamente, es decir definir el tipo de los parámetros, dejando implícito el tipo del valor de retorno, que typescript lo inferirá como `JSX.Element` o `ReactNode`, que son los tipos de los elementos de React.

```tsx sample2.counters.tsx
type Props = {
  initialCount: number;
};

export const Counter = ({ initialCount }: Props) => {
  return (
    <div>
      <h2>Contador</h2>
      <button>➕</button>
      <button>➖</button>
    </div>
  );
};
```

Al añadir un estado a nuestro componente, se puede usar el hook `useState` de React para definirlo. El hook `useState` es un hook genérico que permite definir el tipo del estado, y se puede usar de la siguiente manera:

```tsx
useState<Type>() para definir el tipo del estado.
```

En el caso de un componente contador, el estado `count` se puede definir como un número, y se puede inicializar con el valor de la prop `initialCount`. El hook `useState` devuelve un array con dos elementos: el estado actual y una función para actualizarlo.

```tsx sample2.counters.tsx
type Props = {
  initialCount: number;
};

export const Counter1: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState<number>(initialCount);
  return (
    <div>
      <h2>Contador</h2>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>➕</button>
      <button onClick={() => setCount(count + 1)}>➖</button>
    </div>
  );
};
```

Los manejadores del evento `onClick`, como cualquier callback, se pueden definir de forma anónima o como funciones nombradas. Por lo general es una buena práctica esta segunda opción, ya que mejora la legibilidad del código y permite reutilizar el código en diferentes partes del componente.

Esto no es posible si se necesita pasarle parámetros al manejador, ya que como callback, es ejecutado por el sistema y su único parámetro es el objeto evento. En ese caso se puede utilizar una función anónima que a su vez ejecute una llamada a la función nombrada, pasando los parámetros necesarios.

```tsx sample2.counters.tsx
const handleIncrement = (value = 1): void => {
  setCount(count + value);
};

return (
  ...
    <button onClick={() => handleIncrement()}>➕</button>
    <button onClick={() => handleIncrement(-1)}>➖</button>
   ...
);
```

Más adelante veremos a fondo el uso de los eventos y cómo tiparlos correctamente en los manejadores de eventos de los componentes de React.

#### 📘 Literales y tipos de unión aplicados en componentes React

Como hemos visto, los literales: restringe una variable a un conjunto específico de valores posibles.

Uno de sus usos mas comunes es combinarlos con el operador de unión `|` para crear un tipo que acepte solo ciertos valores.

##### 🧿 Componente Button

Como en el siguiente ejemplo, donde se define un tipo `ButtonVariant` que puede ser "primary" o "secondary", y un tipo `Size` que puede ser "small", "medium" o "large".

```tsx sample3.buttons.tsx
type ButtonVariant = 'primary' | 'secondary';
type Size = 'small' | 'medium' | 'large';

type ButtonProps = {
  variant: ButtonVariant;
  size: Size;
  // onClick: () => void;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  onClick,
  children,
}) => {
  return (
    <button className={`btn ${variant} ${size}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

En el ejemplo anterior, el componente `Button` acepta props `variant` y `size` que son de tipo `ButtonVariant` y `Size`, respectivamente. Esto significa que solo se pueden pasar los valores definidos en esos tipos.

Además el componente `Button` también acepta una prop `onClick` que es una función que no recibe parámetros y no devuelve nada. Esto se puede definir como un tipo de función, como hemos visto anteriormente.

##### La prop `children`

Finalmente, el componente `Button` también acepta una prop `children`, que es el contenido que se mostrará dentro del botón. Esta prop especial se suele definir como un tipo `React.ReactNode`, que representa cualquier elemento de HTML, incluyendo los componentes de React. En algunos casos interesa añadirle algún tipo más específico, como `string` o `number`, si se quiere restringir el tipo de los hijos del componente.

```tsx sample3.buttons.tsx
type ButtonProps = {
  variant: ButtonVariant;
  size: Size;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: string;
};
```

El componente `Button` se puede usar de la siguiente manera:

```tsx sample3.buttons.tsx
<Button variant="primary" size="medium" onClick={handleClick}>
  Hacer clic
</Button>
```

La prop `children` permite que un componente reciba cualquier contenido, ya sea texto, un elemento HTML o incluso otro componente de React. Esto permite que el componente sea más flexible y reutilizable. A nivel de tipado, la prop `children` se puede definir como Para ello pueden emplearse los tipos

- `JSX.Element` - solo acepta un elemento de React
- `JSX.Element[]` - no acepta valores más sencillos que un elemento de React, como un string o un número
- `JSX.Element` | `JSX.Element[]`
- `React.ReactNode` acepte cualquier elemento de React, incluyendo texto, números, elementos HTML y otros componentes de React.
- `React.ReactChildren`, es un utility type similar al anterior
- `React.ReactChild[]`, es un array del tipo anterior

Aunque no es necesario utilizarla, existe un tipo de utilidad de React, PropsWithChildren, que permite definir un tipo de props que incluye la prop `children` de forma implícita. Este tipo se puede usar para definir componentes que aceptan cualquier contenido dentro de ellos.

```tsx sample3.buttons.tsx
 type BaseProps = {
    variant: ButtonVariant;
    size: Size;
    onClick: React.MouseEventHandler<HTMLButtonElement>
};  

type FinalProps = PropsWithChildren<BaseProps>;
```

Este tipo se limita a combinar un genérico y la inclusión de la prop `children`, Su código, que ya nos proporciona React, sería el siguiente

```ts
type PropsWithChildren<P> = P & { children?: ReactNode | undefined };
```

Otros tipos de utilidad relacionados con el anterior, que también se incluyen en React, son:

- `FunctionalComponent<Props>` o `FC<Props>`, que ya conocemos
- `React.ComponentPropsWithoutRef`, que permite obtener las props de un elemento html nativo sin incluir la prop `ref`.

```tsx
type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant: ButtonVariant;
  size: Size;
};
```

### 🌐 SOLID: Principio de Responsabilidad Única (SRP)

El principio de responsabilidad única (SRP) es uno de los principios SOLID, que establece que un componente debe tener una única responsabilidad o función. Esto significa que un componente debe ser responsable de una sola tarea y no debe hacer más de una cosa.

La división del UI en componente es en si misma una aplicación de este principio. Para continuar llevándolo a la práctica, es necesario que

- cada componente tenga una única responsabilidad, es decir, que se encargue de una sola tarea o función dentro del UI en el que participa
- cada componente tenga solo la lógica imprescindible en relación con la parte del UI de la que se ocupa.

Para extender el principio de responsabilidad única, es importante tener en cuenta lo siguiente:

- **Separar la lógica de negocio de la lógica de presentación**: la lógica de negocio debe estar separada de la lógica de presentación, es decir, la lógica que se encarga de mostrar los datos en el UI. Esto permite que los componentes sean más fáciles de entender y mantener.

- **Usar componentes funcionales**: los componentes funcionales son más fáciles de entender y mantener que los componentes de clase, ya que son más simples y no tienen estado interno. Además, los componentes funcionales son más fáciles de probar y reutilizar.
- **Usar tipos o interfaces**: los tipos son una forma de definir la estructura de los datos y las funciones. Esto permite que los componentes sean más fáciles de entender y mantener, ya que la lógica de negocio se puede separar en diferentes tipos.
- **Usar props**: las props son una forma de pasar datos y funciones a los componentes. Esto permite que los componentes sean más fáciles de entender y mantener, ya que la lógica de negocio se puede separar en diferentes componentes.
- **Usar context**: el contexto es una forma de pasar datos y funciones a los componentes sin tener que pasarlos como props. Esto permite que los componentes sean más fáciles de entender y mantener, ya que la lógica de negocio se puede separar en diferentes contextos.
- **Usar hooks**: los hooks son una forma de reutilizar la lógica de estado y efectos secundarios en los componentes funcionales. Esto permite que los componentes sean más fáciles de entender y mantener, ya que la lógica de estado y efectos secundarios se puede separar en diferentes hooks.

Una forma de aplicar el principio de responsabilidad única es permite dividir el UI en componentes más pequeños y reutilizables. Para aplicar esta técnica en React, se pueden usar los siguientes patrones:

- **Composición de componentes**: consiste en crear componentes más pequeños y reutilizables que se pueden combinar para crear componentes más grandes y complejos. Esto permite que los componentes sean más fáciles de entender y mantener, ya que la lógica de negocio se puede separar en diferentes componentes. Esta técnica depende en gran medida de la propiedad `children`, que permite pasar un elemento o un conjunto de elementos como prop a un componente.
- **Render props**: consiste en pasar una función como prop a un componente, que se encargará de renderizar el UI. Esto permite que los componentes sean más fáciles de entender y mantener, ya que la lógica de negocio se puede separar en diferentes componentes.
- **Higher-order components (HOC)**: consiste en crear un componente que recibe otro componente como prop y lo envuelve en un nuevo componente. Esto permite que los componentes sean más fáciles de entender y mantener, ya que la lógica de negocio se puede separar en diferentes componentes.

### 🌐 Tipado de eventos del DOM

Cuando se registra un callback como manejador (handler) de un evento del DOM, como `onClick`, `onChange`, etc., en el momento que se ejecute la función recibirá como parámetro un objeto de evento (event object) que contiene información sobre el evento que se ha producido.

#### El objeto evento en React

En React, este objeto de evento es un objeto de tipo `SyntheticEvent` o ``, que es una envoltura (wrapper) del objeto de evento nativo del DOM.

`SyntheticEvent` es un interface que extiende el interface `BaseSyntheticEvent`

```ts
interface SyntheticEvent<T = Element, E = Event>
  extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}
```

El interface `BaseSyntheticEvent` es un interface genérico que permite definir el tipo del evento y el tipo del elemento al que se aplica el evento. Esto permite a TypeScript inferir el tipo del evento y el tipo del elemento al que se aplica el evento.

```ts
interface BaseSyntheticEvent<E = object, C = any, T = any> {
  nativeEvent: E;
  currentTarget: C;
  target: T;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  preventDefault(): void;
  isDefaultPrevented(): boolean;
  stopPropagation(): void;
  isPropagationStopped(): boolean;
  persist(): void;
  timeStamp: number;
  type: string;
}
```

La forma en que se realiza la extensión hace que el SyntheticEvent no pueda definir el tipo del target, que siempre será de tipo `EventTarget`, y no de un tipo más específico, como `HTMLInputElement` o `HTMLButtonElement`.

Esto es un problema, ya que al acceder a las propiedades del target, TypeScript no puede inferir el tipo correcto y se produce un error.

```tsx sample4.counters.tsx
const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
  const element = event.target;
  //  element: EventTarget
};
```

Por el contrario, el currentTarget es del tipo `C` en el interface `BaseSyntheticEvent`, que corresponde al tipo `EventTarget & T`, del interface `SyntheticEvent`, donde `T` es el tipo del elemento al que se aplica el evento. Esto significa que el currentTarget puede ser de un tipo más específico, como `HTMLInputElement` o `HTMLButtonElement`.

```tsx sample4.counters.tsx
const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
  const element = event.currentTarget;
  //  element: EventTarget & HTMLButtonElement
};
```

#### Interfaces de eventos específicos

En lugar de los interfaces tan poco específicos, React proporciona otros para los eventos más comunes, como `React.MouseEvent`, `React.PointerEvent`, `React.ChangeEvent`, `React.KeyboardEvent`, etc. En algunos casos, estos interfaces permiten a TypeScript inferir el tipo correcto del target. No es asi en los casos de
`React.MouseEvent` y `React.PointerEvent`.

Ambos extienden en último caso de `UIEvent`, que lo hace de `SyntheticEvent`, por lo que no pueden definir el tipo del target, que siempre será de tipo `EventTarget`, y no de un tipo más específico, como `HTMLInputElement` o `HTMLButtonElement`.

```tsx
interface UIEvent<T = Element, E = NativeUIEvent> extends SyntheticEvent<T, E> {
  detail: number;
  view: AbstractView;
}
```

#### Atributos `target` y `currentTarget`

Hay que tener en cuenta lo que significan en el DOM los atributos `target` y `currentTarget`:

- `target`: es el elemento que ha desencadenado el evento. Puede ser un elemento hijo del elemento al que se ha aplicado el evento.
- `currentTarget`: es el elemento al que se ha aplicado el evento. Es el elemento que está escuchando el evento.

Si el manejador (handle) esta registrado en el elemento que desencadena el evento, que es lo más habitual, ambos atributos serán el mismo elemento. En ese caso, usar currenTarget soluciona el problema de inferencia de tipos.

#### Casting de tipos

En caso de que el manejador (handle) no esté registrado en el elemento que desencadena el evento, como en el caso de un botón dentro de un formulario, el target y currentTarget serán diferentes. En este caso, para solucionar este problema, se puede usar el casting o aserción de tipos que permite modificar el tipo de un elemento, siempre que estemos absolutamente seguros de que esta modificación es válida.

```tsx sample4.counters.tsx
const handleClick = (event: SyntheticEvent) => {
  const element = event.target as HTMLButtonElement;
  //  element: HTMLButtonElement
};
```

#### 🧿 Componente Counter refactorizado

En nuestro componente Counter, una vez definido correctamente el tipo del elemento, se puede acceder a su propiedad `dataset`, que almacena como objeto todas las propiedades `data-*` del elemento. En este caso, queremos acceder a la propiedad `data-value`, que es un atributo personalizado que se ha añadido al botón.

```tsx sample4.counters.tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  const element = event.currentTarget;
  const value = element.dataset.value;
  setCount(count + Number(value));
};
```

El dataset esta tipado con el interface `DOMStringMap`, que es una **firmas de índice** (index signatures), que permiten definir un **tipo de objeto** con **propiedades dinámicas**, como sucede con objetos que contienen un número variable de propiedades de nombre no conocido a priori.

```tsx sample4.counters.tsx
interface DOMStringMap {
  [key: string]: string;
}
```

Esto significa que el dataset puede contener cualquier número de propiedades, y cada propiedad es de tipo `string`. Esto es útil para acceder a propiedades personalizadas que se han añadido al elemento, siempre de tipo `string`, porque es el único tipo que se puede almacenar en cualquier atributo HTML.

El resultado final del componente Counter es el siguiente:

```tsx sample4.counters.tsx
export const CounterWithEvent3: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState<number>(initialCount);

  const handleClick = (event: React.PointerEvent<HTMLButtonElement>): void => {
    const element = event.currentTarget;
    // const element = event.target as HTMLButtonElement;
    //  element: EventTarget
    const { value } = element.dataset as DOMStringMap;
    setCount(count + Number(value));
  };

  return (
    <div>
      <h2>Contador</h2>
      <p>{count}</p>
      <button onClick={handleClick} data-value={1}>
        ➕
      </button>
      <button onClick={handleClick} data-value={-1}>
        ➖
      </button>
    </div>
  );
};
```

Una alternativa muy similar es usar el tipo nativo de React para la función manejadora de eventos, `React.MouseEventHandler`:

```tsx sample4.counters.tsx
export const CounterWithEvent4: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState<number>(initialCount);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const element = event.currentTarget;
    const { value } = element.dataset as DOMStringMap;
    setCount(count + Number(value));
  };

  return (
    <div>
      <h2>Contador</h2>
      <p>{count}</p>
      <button onClick={handleClick} data-value={1}>
        ➕
      </button>
      <button onClick={handleClick} data-value={-1}>
        ➖
      </button>
    </div>
  );
};
```

### 🌐 Formularios

#### 📘 Tipado de eventos de formularios controlados

En el caso de los formularios, los eventos más habituales son React.ChangeEvent, React.FormEvent, etc.

```tsx
interface FormEvent<T = Element> extends SyntheticEvent<T> {}
interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
  target: EventTarget & T;
}
```

El evento `ChangeEvent` es un evento que se produce cuando el valor de un elemento de formulario cambia. Este evento se utiliza para manejar los cambios en los elementos de formulario, como los campos de texto, los selectores y los checkboxes.

##### 🧿 Componente SimpleForm: formulario controlado

De esa manera se puede crear lo que se conoce como un **formulario controlado** de React, donde el valor del campo de texto se almacena en el estado interno del componente formulario y se actualiza cada vez que el campo cambia (el usuario escribe en el campo o selecciona un valor).

```tsx sample5.forms.tsx
export const SimpleFormComponent = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // .target: EventTarget & HTMLInputElement
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with value:', value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  );
};
```

El evento de tipo `FormEvent` es el evento `submit` que se produce cuando se envía un formulario. Este evento se utiliza para manejar el envío de formularios y evitar el comportamiento por defecto del navegador, que es recargar la página.

En un formulario controlado, el valor del campo de texto se almacena en el estado interno del componente y se actualiza cada vez que el campo cambia. Esto permite que el componente tenga un control total sobre el valor del campo de texto y se pueda manejar el envío del formulario de manera más eficiente, sin necesitar acceder al target para obtener el valor del campo.

##### 🧿 Componente Form: formulario controlado con multiples campos

Veamos un ejemplo de un formulario controlado con múltiples campos, donde

- se define como un tipo el objeto que almacena los valores de los campos del formulario, y
- otro tipo para almacenar los errores de validación del formulario.
- se utiliza una función genérica para manejar el cambio de cualquiera de los campos del formulario, y
- una función para manejar el envío del formulario.

```tsx sample5.forms.tsx
import React, { useState } from 'react';
type FormData = {
  name: string;
  email: string;
};
type FormErrors = {
  name?: string;
  email?: string;
};

export const FormComponent = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar el formulario
    if (!formData.name) {
      setFormErrors({ ...formErrors, name: 'El nombre es obligatorio' });
    } else {
      setFormErrors({});
      console.log('Formulario enviado:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {formErrors.name && <span>{formErrors.name}</span>}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};
```

Si el formulario incluye un campo de tipo `checkbox`, `radiobutton` o `select`, el evento `ChangeEvent` se tipará de forma más extensa, utilizando una unión de tipos, que incluye el tipo `HTMLInputElement` o `HTMLSelectElement`, dependiendo del tipo de elemento al que se aplica el evento. Ademas es código del handler tiene que contemplar el comportamiento de los checkbox, accediendo a pa propiedad checked en lugar de al value.

```tsx sample6.a.course.register.tsx
const handleChange = (
  ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
) => {
  const formControl = ev.target;
  // desestructurar no podría acceder a .checked
  // se accede más adelante gracias a una guarda de tipos
  console.dir(formControl);
  setUserData({
    ...userData,
    [formControl.name]:
      formControl.type === 'checkbox' ? formControl.checked : formControl.value,
  });
};
```

#### Formularios no controlados

Una alternativa a los formularios controlados son los formularios no controlados, donde el valor los campos (HTMLInput, HTMLSelect o HTMLTextArea) se almacena en el DOM y se accede a ellos solo en el momento de enviar el formulario, sin necesidad de almacenarlos en el estado interno del componente. Esto se puede hacer utilizando una referencia (ref) al elemento del DOM del propio formulario, que se puede obtener del evento submit.

```tsx sample6.b.course.register.tsx
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
      ev.preventDefault();
      const form = ev.currentTarget; // EventTarget & HTMLFormElement
      ...
  }
```

A partir de ahí existen diversas posibilidades

- obtener las referencias a los elementos del formulario y acceder a sus valores directamente. Todas las referencias a los controles están incluidas en el HTMLFormElement

- utilizar un FORMData, que es un objeto que representa los datos de un formulario y permite acceder a los valores de los campos del formulario de manera más sencilla.

##### 🧿 Componente CourseRegistration

```tsx sample6.b.course.register.tsx
return (
  <form onSubmit={handleSubmit}>
    <legend>Contacta con nosotros</legend>
    <p>Ejemplo de 'Controlled Form'</p>

    <div className="group-control">
      <input
        type="text"
        placeholder="Dime tu nombre"
        required
        name="userName"
        defaultValue={userData.userName}
      />
    </div>

    <div className="group-control">
      <input
        type="email"
        placeholder="Dime tu email"
        required
        name="email"
        defaultValue={userData.email}
      />
    </div>

    <div className="group-control">
      <input
        type="password"
        placeholder="Dime tu password"
        required
        name="passwd"
        defaultValue={userData.passwd}
      />
    </div>

    <div className="group-control">
      <input
        type="checkbox"
        id="is-ok"
        name="isOkConditions"
        defaultChecked={userData.isOkConditions}
      />
      <label htmlFor="is-ok">Acepto las condiciones...</label>
    </div>

    <fieldset name="turn">
      <legend>Selecciona un turno</legend>
      <input type="radio" name="turn" id="turno-m" value="M" />
      <label htmlFor="turno-m">Mañana</label>
      <input type="radio" name="turn" id="turno-t" value="T" />
      <label htmlFor="turno-t">Tarde</label>
      <input type="radio" name="turn" id="turno-n" value="N" />
      <label htmlFor="turno-n">Noche</label>
    </fieldset>

    <label htmlFor="course">Elige un curso</label>
    <select name="course" id="course" defaultValue={userData.course}>
      <option value=""></option>
      <option value="A">Angular</option>
      <option value="R">React</option>
      <option value="N">Node</option>
    </select>

    <button type="submit">Enviar</button>
  </form>
);
```

En el método `handleSubmit`, se puede acceder a los valores de los campos del formulario utilizando las propiedades del objeto `HTMLFormElement`, que es el tipo del elemento del formulario. Esto permite acceder a los valores de los campos del formulario sin necesidad de almacenarlos en el estado interno del componente.

```tsx sample6.b.course.register.tsx
const userNameElement = formElements.namedItem('userName') as HTMLInputElement;
const emailElement = formElements.namedItem('email') as HTMLInputElement;
const passwdElement = formElements.namedItem('passwd') as HTMLInputElement;
const isOkConditionsElement = formElements.namedItem(
  'isOkConditions',
) as HTMLInputElement;
const turnElement = formElements.namedItem('turn') as HTMLInputElement;
const courseElement = formElements.namedItem('course') as HTMLSelectElement;
const result = {
  userName: userNameElement.value,
  email: emailElement.value,
  passwd: passwdElement.value,
  // como isOkConditions es un booleano, se obtiene del atributo checked
  isOkConditions: isOkConditionsElement.checked,
  turn: turnElement.value,
  course: courseElement.value,
};
```

Si queremos refactorizar el código anterior, obtendríamos algo como esto:

```tsx sample6.b.course.register.tsx
const result: Record<string, string | boolean> = {};
for (const key of keys) {
  const element = formElements.namedItem(key) as HTMLInputElement;
  // Si el elemento es un checkbox, se obtiene el valor del atributo checked
  result[key] =
    typeof userData[key] === 'boolean'
      ? element.checked
      : (result[key] = element.value);
}
```

##### FormData

El objeto `FormData` es un objeto que representa los datos de un formulario y permite acceder a los valores de los campos del formulario de manera más sencilla. Se puede crear un objeto `FormData` a partir de un elemento HTML de formulario.
La interfaz FormData proporciona una iterador que permite obtener un conjunto de parejas clave/valor que representan los campos de un formulario y sus valores.

```tsx
  const formData = new FormData(form);
);
```

- accediendo manualmente a cada elemento del formData gracias al método get y el nombre del campo

```tsx sample6.b.course.register.tsx
const formData = new FormData(form);
const result = {
  userName: formData.get('userName') as string,
  email: formData.get('email') as string,
  passwd: formData.get('passwd') as string,
  // isOkConditions es un booleano, pero FormData devuelve un string
  isOkConditions: formData.get('isCondition') === 'on',
  turn: formData.get('turn') as string,
  course: formData.get('course') as string,
};
return result;
```

- utilizando los métodos de la clase Object, como `Object.entries`, `Object.keys` o `Object.values`, se puede obtener un array de pares clave/valor, donde cada par representa un campo del formulario y su valor.

```tsx sample6.b.course.register.tsx
const formData = new FormData(form);
const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData);
const result = {
  userName: data.userName as string,
  email: data.email as string,
  passwd: data.passwd as string,
  // isOkConditions es un booleano, pero FormData devuelve un string
  isOkConditions: data.isCondition === 'on',
  turn: data.turn as string,
  course: data.course as string,
};
return result;
```

En lugar de crear el objeto result de forma manual, convendría hacerlo en la iteración, sustituyendo el uso de `fromEntries` por nuestro propio bucle for, que nos permita decidir el resultado en cada caso.

```tsx sample6.b.course.register.tsx
const formData = new FormData(form);
const data: Record<string, FormDataEntryValue | boolean> = { ...user };

for (const [key, value] of formData) {
  if (typeof user[key as keyof typeof user] === 'boolean') {
    data[key] = value === 'on';
  }
}

return data;
```

Este proceso lo podemos encapsular en una función que reciba el formulario y devuelva un objeto con los datos del formulario.

```tsx sample6.b.course.register.tsx
const getDataForm = (form: HTMLFormElement, user: User): User => {
  const formData = new FormData(form);
  const data: Record<string, FormDataEntryValue | boolean> = { ...user };

  for (const [key, value] of formData) {
    if (typeof user[key as keyof typeof user] === 'boolean') {
      data[key] = value === 'on';
    } else {
      data[key] = value;
    }
  }

  return data as User;
```

El problema de este método es que esta acoplado a que la entidad de los datos sea User. Usando genéricos, se puede hacer más genérica y reutilizable.

```tsx sample6.b.course.register.tsx 
type ValidT<T> =
  T extends Record<string, FormDataEntryValue | boolean> ? T : never;
const getDataForm = <T,>(form: HTMLFormElement, entity: ValidT<T>): T => {
  const formData = new FormData(form);
  const data: Record<string, FormDataEntryValue | boolean> = { ...entity };

  for (const [key, value] of formData) {
    if (typeof entity[key as keyof typeof entity] === 'boolean') {
      data[key] = value === 'on';
    } else if (typeof entity[key as keyof typeof entity] === 'string') {
      data[key] = value;
    }
  }

  return data as T;
};
```

### 📘 Tipos de unión, intersección aplicados en componentes React

Unión (|): permite que una variable tenga más de un tipo.
Intersección (&): combina varios tipos en uno solo.

#### Tipos de unión aplicados en componentes React

Ya hemos visto el uso de tipos de unión en los ejemplos anteriores, donde se define un tipo `ButtonVariant` que puede ser "primary" o "secondary", y un tipo `Size` que puede ser "small", "medium" o "large".

##### 🧿 Componente ProfileCard

El mismo principio se puede aplicar a cualquier tipo más complejo, por ejemplo definiendo las props como la unión de varios tipos objeto.

```tsx sample7.profile.tsx
// Tipos para las distintas formas del perfil
type AdminProfile = {
  type: 'admin';
  name: string;
  permissions: string[];
};

type UserProfile = {
  type: 'user';
  name: string;
  email: string;
};

// Unión de tipos para la prop
type ProfileProps = {
  profile: AdminProfile | UserProfile;
};
```

En el componente `ProfileCard`, se puede usar el tipo `ProfileProps` para definir la prop `profile`, que puede ser de tipo `AdminProfile` o `UserProfile`. Esto permite que el componente acepte diferentes tipos de perfiles y maneje cada uno de ellos de manera diferente.

```tsx sample7.profile.tsx
const ProfileCard: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <div className="card">
      <h2>{profile.name}</h2>

      {profile.type === 'admin' ? (
        <div>
          <strong>Permisos:</strong>
          <ul>
            {profile.permissions.map((perm) => (
              <li key={perm}>{perm}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Email: {profile.email}</p>
      )}
    </div>
  );
};
```

Al recibir la prop del tipo union, solo las propiedades comunes serían accesibles, como `name`, y el resto de propiedades específicas de cada tipo solo serían accesibles si se hace una **guarda de tipos**. Al haber definido un propiedad que diferencia cada uno de los tipos que participan en la unión (`profile.type`) la guarda en base a esa propiedad da lugar a una técnica conocida como **uniones discriminadas**, donde un tipo literal de un elemento compartido por varios tipos participantes en una unión se usa como discriminador para determinar el tipo de otros elementos.

Combinando esto con el **renderizado condicional** re React, se pueden mostrar diferentes elementos en función del tipo de perfil que se recibe como prop.

#### Tipos de intersección aplicados en componentes React

Como ya hemos visto, se puede usar el operador de intersección `&` para combinar varios tipos en uno solo. Esto es útil cuando se quiere crear un tipo que combine varias propiedades de diferentes tipos, incluyendo todas las propiedades de los tipos que se combinan.

##### 🧿 Componente Box

Esto es muy útil para reutilizar estructuras y extender props en componentes complejos. Esta extensión de un tipo base es igual que la que conseguiríamos con los interfaces heredando (`extends`) de otros interfaces, pero con la ventaja de que se pueden combinar tipos de diferentes formas, no solo objetos.

```tsx sample8.box.tsx
type BaseProps = {
  id: string;
  visible: boolean;
  children: React.ReactNode;
};

type StyleProps = {
  className?: string;
  style?: React.CSSProperties;
};

type ComponentProps = BaseProps & StyleProps;

const Box: React.FC<ComponentProps> = ({
  id,
  visible,
  className,
  style,
  children,
}) => {
  if (!visible) return null;

  return (
    <div id={id} className={className} style={style}>
      {children}
    </div>
  );
};
```

Aquí ComponentProps hereda todas las propiedades de BaseProps y StyleProps. Esto es más limpio que redefinirlas todas a mano y mejora la reutilización de tipos.

Como ya hemos visto, un alternativa sería la extensión de interfaces, que permite crear un nuevo tipo a partir de otro, heredando todas las propiedades del tipo base.

```tsx sample8.box.tsx
interface BaseProps {
  id: string;
  visible: boolean;
  children: React.ReactNode;
}
interface StyleProps {
  className?: string;
  style?: React.CSSProperties;
}
interface ComponentProps extends BaseProps, StyleProps {}
```

##### SOLID: Principio de Segregación de Interfaces (ISP)

El principio de segregación de interfaces (ISP) es uno de los principios SOLID, que establece que una interfaz no debe obligar a un cliente a depender de métodos que no utiliza. Esto significa que una interfaz debe ser específica y contener solo los métodos que son relevantes para el cliente.

La posibilidad de combinar tipos con el operador de intersección o interfaces con el operador `extends` permite crear tipos más específicos y reutilizables, que pueden ser utilizados en diferentes partes del código. Esto permite que los componentes sean más fáciles de entender y mantener, ya que la lógica de negocio se puede separar en diferentes tipos.

Como veremos, otra posibilidad es utilizar varios interfaces para que sean implementados por una misma clase, y así poder mantener cada uno de ellos lo más específico posible.

### 📝 Ejercicios sugeridos

1. ✅ Badge con tipos literales y unión
   Crea un componente <Badge status="success" | "error" | "warning"> que reciba una prop status y renderice un color distinto según su valor.

2. ✅ Input tipado y controlado
   Crea un componente \<TextInput> que reciba una prop label opcional y una función onChange, con tipado correcto de los eventos de formulario.

3. ✅ Contador con estado tipado
   Implementa un contador con useState\<number>(), botones para incrementar/decrementar, y una prop initialCount.

4. ✅ Formulario controlado con múltiples campos
   Crea un formulario con dos o más inputs (nombre, email, etc.) y un botón que imprima los datos ingresados. Tipa correctamente el estado y los eventos.

5. ✅ Alias de tipos y componentes reutilizables
   Define un alias de tipo User con propiedades id, name, y email, y úsalo en un componente \<UserCard user={user} />.

6. ✅ Uso de interfaces con props y funciones
   Define una interface Product con propiedades y métodos (por ejemplo, getPriceConIVA()), y úsala en un componente que muestre el producto y su precio final.

7. ✅ Componentes con props de tipo unión
   Diseña un componente \<Message /> que acepte dos formas distintas de props: una para un mensaje de texto, otra para uno con título y cuerpo. Usa type narrowing.

8. ✅ Componentes con intersección de tipos
   Crea un componente \<ProfileAvatar /> que combine tipos: por ejemplo, uno con datos comunes (name, avatarUrl) y otro con permisos (canEdit, canDelete).

9. ✅ Evento de clic tipado y estado condicional
   Implementa un botón que cambia de color al hacer clic, usando onClick y estado booleano tipado.

10. ✅ Casting de tipo en un formulario
    Haz un formulario donde accedas al valor de un input HTMLSelectElement con e.currentTarget.value, usando type assertion.
