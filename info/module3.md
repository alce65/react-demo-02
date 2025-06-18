---
title: TYPESCRIPT INTERMEDIO = React con TypeScript
module: 3
---

- [🧩 MÓDULO 3: PROGRAMACIÓN ORIENTADA A OBJETOS y COMPONENTES EN REACT](#-módulo-3-programación-orientada-a-objetos-y-componentes-en-react)
  - [🎯 Objetivos del módulo](#-objetivos-del-módulo)
  - [🧠 Clases en ES6 y typeScript](#-clases-en-es6-y-typescript)
    - [Definición de clases en ES6+](#definición-de-clases-en-es6)
    - [Clases en TypeScript](#clases-en-typescript)
      - [Modificadores de acceso](#modificadores-de-acceso)
      - [Propiedades de parámetros](#propiedades-de-parámetros)
    - [Herencia de clases](#herencia-de-clases)
      - [Sobre-escritura (overriding) de métodos](#sobre-escritura-overriding-de-métodos)
      - [Clases abstractas](#clases-abstractas)
  - [📘 Clases y componentes basados en clases](#-clases-y-componentes-basados-en-clases)
    - [🧿 Componente ClassComponent](#-componente-classcomponent)
    - [🧿 Componente UserCard: Tipado (avanzado) de props y estado](#-componente-usercard-tipado-avanzado-de-props-y-estado)
    - [Uso de readonly, abstract y modificadores de acceso](#uso-de-readonly-abstract-y-modificadores-de-acceso)
  - [🌐 Servicios basados en clases](#-servicios-basados-en-clases)
    - [Patrón repositorio (Repository)](#patrón-repositorio-repository)
      - [🧿 Repositorio en memoria: InMemoryUserRepository](#-repositorio-en-memoria-inmemoryuserrepository)
      - [🧿 API Repositorio: APIUserRepository](#-api-repositorio-apiuserrepository)
  - [🌐 Patrones de inyección e inversión de dependencias](#-patrones-de-inyección-e-inversión-de-dependencias)
    - [🧿 Inyección manual de servicios: hook useUser](#-inyección-manual-de-servicios-hook-useuser)
    - [🌐 SOLID Principio de Inversión de dependencias (DIP)](#-solid-principio-de-inversión-de-dependencias-dip)
    - [Inyección en React: Contexto](#inyección-en-react-contexto)
      - [Contextos de React, Hooks y servicios](#contextos-de-react-hooks-y-servicios)
        - [🧿 Creación del contexto y del proveedor](#-creación-del-contexto-y-del-proveedor)
      - [Acceso al contexto](#acceso-al-contexto)
    - [Contexto dinámico](#contexto-dinámico)
      - [🧿 Theme \& Language Context](#-theme--language-context)
    - [Contexto dinámico y custom Hooks](#contexto-dinámico-y-custom-hooks)
      - [🧿 User Context](#-user-context)
    - [Contexto en React19. El API `use`](#contexto-en-react19-el-api-use)
  - [📝 Ejercicios sugeridos](#-ejercicios-sugeridos)

## 🧩 MÓDULO 3: PROGRAMACIÓN ORIENTADA A OBJETOS y COMPONENTES EN REACT

### 🎯 Objetivos del módulo

- Comprender la programación orientada a objetos en JavaScript y TypeScript.
- Conocer la sintaxis de clases en ES6 y TypeScript.
- Conocer los mecanismos de herencia y sobre-escritura de métodos.
- Comprender cómo se crean componentes de clase en React usando TypeScript.
- Identificar cuándo conviene usar clases frente a funciones en el desarrollo de componentes.
- Aplicar tipado estricto a `props` y `state` en clases.
- Utilizar modificadores como `readonly`, `private`, `protected` y `abstract` en el contexto de componentes.

### 🧠 Clases en ES6 y typeScript

#### Definición de clases en ES6+

La definición de clases con Class se incorpora en ES6(2015)

Se incluye la posibilidad de declarar

- **propiedades** de instancia
- método **constructor**
- **métodos** de instancia

Las propiedades se declaran al inicio de la implementación de la clase.

Se pueden incluir en la clase miembros **estáticos**, que pertenecen a la clase en sí y no a las instancias de la clase. Pueden ser métodos o propiedades (ES2022).
Además de propiedades y métodos estáticos, aparece la posibilidad de declarar un **bloque estático**, `static {}` (ES2022), que se ejecuta una vez al declarar la clase.
En el contexto estático, this pasa a ser la clase y no la instancia

En versiones recientes del estándar de ES (ES2022) se incorpora la posibilidad de declarar **miembros privados** en las clases, mediante el uso del prefijo `#`, tanto en el caso de propiedades como de métodos, tanto de instancia como estáticos.
Cobra sentido definir sus accessors: getter y setter

```JS
class Person {
  static #nextId = 0;
  static #getNextId() {
      return this.#nextId++;
  }
  static {
      console.log('Initializing Person class');
      this.#nextId = 1;
  }

  #id = Person.#getNextId();
  name: string;
  #age: number;
  constructor(name: string, age: number) {
      this.name = name;
      this.#age = age;
  }

  get id() {
      return this.#id;
  }

  get age() {
      return this.#age;
  }

  set age(value) {
      this.#age = value;
  }

  greet() {
      return `Hola, soy ${this.name} y tengo ${this.age} años`;
  }
}
```

#### Clases en TypeScript

Todos estos elementos de ES se incorporan en la implementación de TypeScript, con la única modificación de incorporar los tipos de las propiedades y de los parámetros que les darán valor.

```typescript
class Person {
  //...

  #id = Person.getNextId();
  name: string;
  #age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.#age = age;
  }

  //...
}
```

Opcionalmente, en los métodos, incluyendo los getters, se pueden añadir los tipos de retorno y de los parámetros, para mejorar la legibilidad del código y detectar errores de tipo en tiempo de compilación.

```typescript
class Person {
  //...

  get id(): number {
    return this.#id;
  }

  get age(): number {
    return this.#age;
  }

  set age(value: number) {
    this.#age = value;
  }

  greet(): string {
    return `Hola, soy ${this.name} y tengo ${this.age} años`;
  }
}
```

##### Modificadores de acceso

Existen tres modificadores de acceso en TypeScript, que controlan la **visibilidad** y **accesibilidad** de las propiedades y métodos de una clase.:

- **public**: es el modificador por defecto, y permite acceder a las propiedades y métodos desde cualquier parte del código.
- **private**: solo permite acceder a las propiedades y métodos desde dentro de la clase en la que se han declarado.
- **protected**: permite acceder a las propiedades y métodos desde dentro de la clase en la que se han declarado y desde las clases que heredan de ella.

A la hora de declarar propiedades y métodos privados en las clases, el uso del modificador `private` puede sustituir al #, recientemente incorporado en ES.

```typescript
class Person {
  private static _nextId = 0;
  private static getNextId() {
    return this._nextId++;
  }
  static {
    console.log("Initializing Person class");
    this._nextId = 1;
  }

  private _id = Person.getNextId();
  name: string;
  private _age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this._age = age;
  }
  //...
}
```

Por convenio, las propiedades privadas se nombran con un guión bajo al principio, para diferenciarlas de las propiedades públicas.

Esto facilita poder definir los accessors (getter y setter) para las propiedades privadas, que permiten acceder a ellas desde fuera de la clase.

```typescript
class Person {
  //...

  get id() {
    return this._id;
  }

  get age() {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }
  //...
}
```

La existencia de estos accessors permite decidir cuando una propiedades privada es de solo **lectura** (tiene getter), solo de **escritura** (tiene setter) o de **lectura y escritura** (tiene getter y setter).

Hay que tener en cuenta que la definición de una propiedad como `private` carece de **ningún efecto** en el código **JavaScript** resultante, ya que no existe en JS, por lo que después de la compilación la propiedad sería publica. Con el modificador ## se consigue que la propiedad sea privada en JS, por lo que algunos autores recomiendan su uso en lugar de `private`

En cualquier caso hay que tener en cuenta que privado significa accesible solo desde **dentro de la instancia**: cualquier objeto de una clase puede acceder desde sus métodos a las propiedades privadas de otro objeto de la clase, e.g. si lo recibe como parámetro.

Otro modificador de acceso que se puede usar en TypeScript es `readonly`, que permite declarar propiedades de solo lectura, que solo pueden ser asignadas en el constructor de la clase.

```typescript
class Person {
  private static _nextId = 0;
  private static getNextId() {
    return this._nextId++;
  }
  static {
    console.log("Initializing Person class");
    this._nextId = 1;
  }

  private readonly _id = Person.getNextId();
  name: string;
  private _age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this._age = age;
  }
  //...
}
```

##### Propiedades de parámetros

En TypeScript se pueden declarar propiedades de parámetros en el constructor de una clase, que son propiedades de instancia que se inicializan con los valores de los parámetros que se pasan al constructor.

```typescript
class Person {
  constructor(public name: string, private age: number) {}
}
```

Indicar en los parámetros del constructor los modificadores de acceso y el modificador `readonly` es una forma de **simplificar** la definición de las **propiedades** de la clase, que se crean sin necesidad de haberlas declarado y se inicializan con los valores de los parámetros.

Esta característica no se puede aplicar a las propiedades privadas que utilizan el modificador ## de ES, que deben ser declaradas explícitamente en la clase.

Nota: esta característica no es soportada por la ejecución directa de código Typescript en las últimas versiones de NodeJS

#### Herencia de clases

La herencia de clases es una característica de la programación orientada a objetos que permite **reutilizar** el código de una clase en otra clase, que se convierte en una **subclase** de la primera, que es la **superclase**.

Este proceso es soportado por ES6+ en basa a las clases tat como quedaron definidas en el estándar utilizando la palabra clave `extends`.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return `Hola, soy ${this.name} y tengo ${this.age} años`;
  }
}

class Employee extends Person {
  constructor(name, age, salary) {
    super(name, age);
    this.salary = salary;
  }
  greet() {
    return `${super.greet()} y cobro ${this.salary}€`;
  }
}
```

##### Sobre-escritura (overriding) de métodos

Este mismo código, añadiendo los tipos adecuados, es válido en TypeScript.

```typescript
class Person {
  constructor(public name: string, public age: number) {}

  greet() {
    return `Hola, soy ${this.name} y tengo ${this.age} años`;
  }
}

class Employee extends Person {
  constructor(name: string, age: number, public salary: number) {
    super(name, age);
  }

  override greet() {
    return `${super.greet()} y cobro ${this.salary}€`;
  }
}
```

Se puede añadir el modificador `override` a los métodos de la subclase que sobrescriben a los métodos de la superclase, para indicar que se está sobrescribiendo un método de la superclase.

Si en tsconfig.json se activa la opción `noImplicitOverride` se activa la comprobación de que los métodos que se sobrescriben tengan necesariamente el modificador `override`.

##### Clases abstractas

Además, en TypeScript se pueden definir **métodos abstractos** en las superclases declaradas como abstracts, que deben ser implementados en las subclases. En esta misma clase abstracta se pueden definir también métodos no abstractos, implementados en la superclase como en cualquier otro caso.

```typescript
abstract class Person {
  constructor(public name: string, public age: number) {}

  abstract greet(): string;
  eat() {
    return "Estoy comiendo";
  }
}

class Employee extends Person {
  constructor(name: string, age: number, public salary: number) {
    super(name, age);
  }

  greet() {
    return `Hola, soy ${this.name} y tengo ${this.age} años y cobro ${this.salary}€`;
  }
}
```

### 📘 Clases y componentes basados en clases

- Antes de los hooks, los componentes de clase eran el principal modelo de React.
- Con TypeScript, debes tipar explícitamente las `props` y el `state`.
- Aunque los componentes funcionales son hoy estándar, entender las clases sigue siendo útil, especialmente para mantenimiento de código legado.

#### 🧿 Componente ClassComponent

```tsx
import React, { Component } from "react";

type Props = {
  name: string;
};

type State = {
  counter: number;
};

class ClassComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render() {
    return (
      <div>
        <p>Hola, {this.props.name}</p>
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          Contador: {this.state.counter}
        </button>
      </div>
    );
  }
}
```

- `Props` y `State` son tipos que definen las propiedades y el estado del componente.
- `constructor` inicializa el estado y llama al constructor de la clase base (`Component`).
- `render` es un método obligatorio que devuelve el JSX a renderizar.
- `this.setState` se usa para actualizar el estado del componente, lo que provoca un nuevo renderizado.
- `this.props` y `this.state` son accesibles dentro de la clase.
- `super(props)` llama al constructor de la clase base.

#### 🧿 Componente UserCard: Tipado (avanzado) de props y estado

Puedes aplicar tipos complejos como uniones, literales, interfaces anidadas o incluso funciones en props y state.
TypeScript valida tanto al construir como al modificar el estado.

```tsx
type UserProps = {
  user: {
    id: number;
    name: string;
    role: "admin" | "user";
  };
  onPromote: (id: number) => void;
};

type UserState = {
  isEditing: boolean;
};

class UserCard extends Component<UserProps, UserState> {
  state: UserState = {
    isEditing: false,
  };

  toggleEdit = () => {
    this.setState((prev) => ({ isEditing: !prev.isEditing }));
  };

  render() {
    const { user, onPromote } = this.props;
    const { isEditing } = this.state;

    return (
      <div>
        <h3>
          {user.name} ({user.role})
        </h3>
        <button onClick={() => onPromote(user.id)}>Promover</button>
        <button onClick={this.toggleEdit}>
          {isEditing ? "Cancelar" : "Editar"}
        </button>
      </div>
    );
  }
}
```

#### Uso de readonly, abstract y modificadores de acceso

- readonly: evita que se reasigne una propiedad después de la construcción.
- private y protected: controlan la visibilidad de miembros dentro o fuera de la clase.
- abstract: se usa para crear clases base que otras clases deben implementar.

```tsx
abstract class BaseComponent<P, S> extends Component<P, S> {
  protected log(message: string) {
    console.log(`[LOG]: ${message}`);
  }

  abstract getTitle(): string;
}

type InfoProps = {
  readonly title: string;
};

type InfoState = {
  count: number;
};

class InfoBox extends BaseComponent<InfoProps, InfoState> {
  state: InfoState = { count: 0 };

  private increment = () => {
    this.setState((s) => ({ count: s.count + 1 }));
  };

  getTitle(): string {
    return this.props.title;
  }

  render() {
    return (
      <div>
        <h2>{this.getTitle()}</h2>
        <button onClick={this.increment}>Contador: {this.state.count}</button>
      </div>
    );
  }
}
```

### 🌐 Servicios basados en clases

Los servicios en TypeScript pueden ser implementados como clases, lo que permite encapsular la lógica de negocio y el acceso a datos.

Un servicio es una clase o módulo que encapsula una lógica que puede ser compartida por múltiples componentes. En React, los servicios no están ligados al ciclo de vida del componente, lo que los hace ideales para:

- Llamadas HTTP (fetch/axios)
- Lógica de negocio
- Transformaciones de datos
- Almacenamiento local (localStorage/sessionStorage)
- Autenticación

#### Patrón repositorio (Repository)

El patrón repositorio es una forma de estructurar el acceso a datos, separando la lógica de acceso a datos de la lógica de negocio.

Partiendo de distintas fuentes de datos tendremos diferentes servicios repositorio, que implementan la misma interfaz, que define los métodos que deben implementar.

##### 🧿 Repositorio en memoria: InMemoryUserRepository

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface UserDTO: Omit<User, "id">

interface UserRepository {
  getUsers(): Promise<User[]>
  getUserById(id: number): Promise<User>;
  createUser(user: UserDTO): Promise<User>;
  updateUser(id: number, user: Partial<UserDTO>): Promise<User>;
  deleteUser(id: number): Promise<void>;
}

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  private _generateID(): number {
      return this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1;
    }

  async getUsers(): Promise<User[]> {
    return this.users;
  }
  async getUserById(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new Error("User not found");
    return user;
  }
  async createUser(user: UserDTO): Promise<User> {
    const newUser = { ...user, id: this._generateID() };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: number, user: Partial<UserDTO>): Promise<User> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  async deleteUser(id: number): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error("User not found");
    this.users.splice(index, 1);
  }
}
```

##### 🧿 API Repositorio: APIUserRepository

El uso más común de este patrón es aplicarlo para encapsular todas las operaciones de acceso y modificación de los datos basados en un API rest. Estas operaciones pueden emplear la funcionalidad de `fetch`, actualmente nativo tanto en Node como en los browsers o de la librería `axios` para realizar las peticiones al servidor.

```ts
export class ApiUserRepository implements UserRepository {
  private apiUrl = "https://api.example.com/users";

  async getUser(id: number): Promise<User> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    return response.json();
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    return response.json();
  }

  async createUser(user: UserDTO): Promise<User> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  }

  async updateUser(id: number, user: Partial<UserDTO>): Promise<User> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Error updating users");
    }
    return response.json();
  }
  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error updating users");
    }
  }
}
```

Uso del servicio en un componente

```tsx
const userService = new UserService();

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    userService
      .getUsers()
      .then(setUsers)
      .catch((error) => {
        console.error("Error al cargar usuarios:", error);
        setError(error);
      });
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};
```

**Instanciar el servicio en el módulo**, al mismo nivel que el componente, es una práctica común y generalmente adecuada en muchos contextos. Sin embargo, es importante comentar sus implicaciones y alternativas para que el alumnado entienda cuándo es recomendable y cuándo puede ser un problema.

✅ Ventajas de instanciar el servicio fuera del componente

- Evita múltiples instancias: se asegura que el servicio es único
  Si lo instancias dentro del componente, se crearía una nueva instancia cada vez que el componente se renderiza.
- Más eficiente:
  La instancia es creada una sola vez al cargar el módulo, ahorrando recursos.
- Código más limpio y organizado:
  La lógica de creación del servicio no se mezcla con la del componente.
- Suficiente para servicios sin estado o de solo lectura, como:
  - Consultas a una API
  - Funciones utilitarias
  - Conversión de datos
  - Servicios de configuración

⚠️ Consideraciones y posibles inconvenientes

- No adecuado si el servicio mantiene estado interno mutable:
  Si UserService almacenara tokens, sesiones o caché propio, esa instancia compartida podría producir efectos secundarios no deseados entre componentes.
- Dificulta testing y mocking en tests unitarios:
  Si quieres reemplazar userService por un mock, tienes menos control porque ya fue instanciado al cargar el módulo.
- Impide utilizar diferentes configuraciones del servicio en distintas circunstancias:

### 🌐 Patrones de inyección e inversión de dependencias

La alternativa más controlada seria utilizar alguna forma del patrón de **inyección de dependencias**, que permite inyectar el servicio en el componente, en lugar de instanciarlo dentro del componente.

En general, la inyección de dependencias es un patrón que permite desacoplar las clases y sus dependencias, facilitando la prueba y el mantenimiento del código.

```ts
class UserService {
  constructor(private userRepository: UserRepository) {}
}

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
```

#### 🧿 Inyección manual de servicios: hook useUser

En un componente o en un custom hook, puedes inyectar el servicio como una dependencia, en este caso pasándolo como prop (Inyección de dependencias)

Supongamos que el custom Hook `useUser` necesita una instancia del repositorio `ApiUserRepo`, que encapsula todas las operaciones de usuarios.

```tsx
type UserState = {
  user: User | null;
  loading: boolean;
  error: Error | null;
};

type UseUserHook = ({
  id,
  repo,
}: {
  id: number;
  repo: UserRepository;
}) => UserState & {
  load: () => Promise<void>;
};

export const useUser: UseUserHook = ({ id = 1, repo }) => {
  const [user, setUser] = useState<UserState["user"]>(null);
  const [loading, setLoading] = useState<UserState["loading"]>(false);
  const [error, setError] = useState<UserState["error"]>(null);

  const load = useCallback(async (): Promise<void> => {
    console.log("loadinng");
    setLoading(true);
    try {
      const user = await repo.getUserById(id);
      setUser(user);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [id, repo]);

  return { user, loading, error, load };
};
```

El Array de dependencias del useCallback incluye el id y el repo, para que se vuelva a crear la función load si cambian.

En el caso del repo, para evitar que se vuelva a crear la función load cada vez que se renderiza el componente, se puede usar el hook `useMemo` para memorizar la instancia del repositorio.

```tsx
const userRepository = useMemo(() => new ApiUserRepository(), []);
```

#### 🌐 SOLID Principio de Inversión de dependencias (DIP)

El principio de inversión de dependencias (Dependency Inversion Principle, DIP) es uno de los cinco principios SOLID de la programación orientada a objetos. Este principio establece que:

> Las **entidades de alto nivel** no deben depender de las **entidades de bajo nivel**. Ambas deben depender de **abstracciones**.

Al inyectar dependencias, como servicios o repositorios, en lugar de instanciarlos directamente dentro de un componente, se sigue este principio. Esto permite que el componente no dependa de la implementación concreta del servicio, sino de una interfaz o clase abstracta.

En typescript, gracias al tipado estructural, esto se puede lograr incluso sin utilizar interfaces o clases abstractas para definir las dependencias. Cualquier clase es al mismo tiempo un interfaz y lo que indica es cualquier otra clase que implemente los métodos necesarios puede ser utilizada como dependencia, siempre que cumpla con la firma esperada.

```tsx
class UserService {
  constructor(private userRepository: UserRepository) {}
}

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);

const userService2 = new UserService(new ApiUserRepository());
```

En este caso, `UserService` no depende de una implementación concreta de `UserRepository`, sino que puede trabajar con cualquier clase que implemente la interfaz `UserRepository`. Esto permite cambiar la implementación del repositorio sin necesidad de modificar el servicio.

Esto es especialmente útil en aplicaciones grandes, donde los servicios pueden depender de otros servicios o repositorios. Al seguir el principio de inversión de dependencias, se puede cambiar la implementación de un servicio sin afectar a los componentes que lo utilizan.

#### Inyección en React: Contexto

El contexto de React es una forma de inyección de dependencias controlada por React, que permite compartir datos entre componentes sin necesidad de pasar props manualmente a través de cada nivel del árbol de componentes.

En el caso de los servicios, es especialmente util si muchos componentes comparten el mismo servicio, y como cualquiera de los patrones de inyección de dependencias, permite desacoplar el servicio del componente y facilita la prueba y el mantenimiento del código.

##### Contextos de React, Hooks y servicios

El Contexto (React.Context) es una **API nativa de React** que permite compartir valores entre componentes sin necesidad de pasarlos manualmente a través de props en cada nivel del árbol de componentes (lo que se conoce como prop drilling).

Fue introducido para solucionar el problema de compartir datos globales —como temas, idiomas, usuarios autenticados o servicios— sin romper la composición de componentes.

El contexto se crea con la función factory `createContext`, que devuelve un objeto de la clase `React.Context` con los métodos `Provider` y `Consumer`. Por tanto un Contexto es un objeto que contiene dos componentes:

- **Provider**: método correspondiente a un componente de React que proporciona el valor del contexto a los componentes hijos.
- **Consumer**: el método que consume el valor proporcionado por el Provider. Desde la versión 16.8, con la introducción de los Hooks, se recomienda usar el hook `useContext` para consumir el contexto acceder internamente al Consumer y a los valores del contexto.

El Contexto es, en esencia, una forma sencilla y eficaz de aplicar **inyección de dependencias** en el entorno funcional de React, no necesariamente ligada a la programación orientada a objetos.:

- El proveedor (Provider) actúa como el contenedor que proporciona la dependencia.
- El consumidor (useContext) inyecta esa dependencia dentro del componente.

Esto permite desacoplar componentes de las implementaciones concretas, y facilitar su reutilización y testeo.

###### 🧿 Creación del contexto y del proveedor

El tipo del contexto se define como una interfaz que describe la forma del objeto que se va a compartir. En este caso, el contexto es un servicio de usuario.

```tsx
type ContextType = {
  name: string | null;
  isLogged: boolean;
};
```

El contexto, como objeto que puede ser accedido desde cualquier parte de la aplicación se crea con la función `createContext`, que recibe como parámetro el valor por defecto del contexto. Este valor se usará si no hay un proveedor (Provider) en la jerarquía de componentes.

```tsx
export const Context = createContext<ContextType>({
  name: null,
  isLogged: false,
});
```

El proveedor (Provider) es un componente que envuelve a los componentes que necesitan acceder al contexto. Este componente recibe como prop el valor del contexto y lo proporciona a todos los componentes hijos.

```tsx

const contextValue: ContextType = {
    name: "Javier",
    isLogged: true,
};

type Props = {
    children: React.ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
    return <Context.Provider value={contextValue}>{children}</context.Provider>;
};
```

En este caso el contexto solo proporciona un valor estático, pero como veremos más adelante, el valor del contexto se suele actualizar dinámicamente, por ejemplo, a través de un servicio de autenticación.

Lo habitual es que el contexto y el provider se implementen en ficheros separados. En caso contrario habrá que desactivar la regla de eslint `react-refresh/only-export-components`

##### Acceso al contexto

PAra que el contexto sea accesible de debe hacer uso del `Provider` en el árbol de componentes, envolviendo los componentes que necesitan acceder al contexto. Si toda la aplicación tiene que tener acceso al contexto, esto se hace en el fichero main.tsx, donde se renderiza el componente raíz de la aplicación.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { ContextProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
```

A partir de aquí, cualquier componente que esté dentro del `ContextProvider` puede acceder al contexto.
Para acceder al contexto, se utiliza el hook `useContext`, que recibe como parámetro el contexto creado con `createContext`. Este hook devuelve el valor del contexto, que se puede usar directamente en el componente.

```tsx
import { useContext } from "react";
import { context } from "./context";

export const UserProfile: React.FC = () => {
  const { name, isLogged } = useContext(context);

  return (
    <div>
      {isLogged ? <p>Hola, {name}</p> : <p>Por favor, inicia sesión</p>}
    </div>
  );
};
```

#### Contexto dinámico

El objetivo mas habitual del contexto es compartir un **estado global**, es decir valor que puede cambiar a lo largo del tiempo, junto con la lógica para modificarlo. Es el caso de como el estado de autenticación de un usuario o el tema de la aplicación.

Como el provider no deja de ser un componente, puede hacer uso de cualquier hook de React, como `useState` o `useReducer`, para gestionar el estado del contexto. En este caso, el valor del contexto se define como un objeto que contiene tanto el valor del contexto como la función para actualizarlo.

##### 🧿 Theme & Language Context

Un ejemplo sería un contexto que gestiona el tema de la aplicación (claro u oscuro) y el idioma (español o inglés).

```tsx
type ThemeState = "dark" | "light";
type LanguageState = "es" | "en";

type Context = {
  theme: ThemeState;
  setTheme: React.Dispatch<React.SetStateAction<ThemeState>>;
  language: LanguageState;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageState>>;
};

const defaultContext: Context = {
  theme: "light",
  setTheme: (state) => state,
  language: "es",
  setLanguage: (state) => state,
};

export const ThemeContext = createContext<Context>(defaultContext);
```

El proveedor del contexto se encarga de crear el estado y la función para actualizarlo, y lo proporciona a todos los componentes hijos.

```tsx
type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeState>("light");
  const [language, setLanguage] = useState<LanguageState>("es");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
```

El valor del contexto se puede leer y actualizar desde cualquier componente que consuma el contexto, lo segundo utilizando la función `setTheme` o `setLanguage` proporcionada por el proveedor.

#### Contexto dinámico y custom Hooks

En situaciones más complejas, es posible que necesitemos encapsular la lógica del provider del contexto en un custom hook. Esto permite simplificar el provider y encapsular la lógica de negocio relacionada con el contexto.

##### 🧿 User Context

Para el ejemplo del contexto de usuario, que gestiona la autenticación y la información del usuario, recuperamos el custom hook [`useUser`](#-inyección-manual-de-servicios-hook-useuser) que encapsula la lógica de carga y actualización del usuario.

```tsx


export const useUser: UseUserHook = ({ id = 1, repo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async (): Promise<void> => {...}, []);

  return { user, loading, error, load };
};
```

El contexto se crea en función del tipo proporcionado por el custom hook

```tsx
type Context = {
  userContext: ReturnType<typeof useUser>;
};

const defaultContext: Context = {} as Context;

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<Context>(defaultContext);
```

El provider se encarga de crear la instancia del hook, inyectarle la instancia del repository y con el resultado, proporcionar el valor del contexto.

```tsx
type Props = {
  children: React.ReactNode;
};
export const UserProvider: React.FC<Props> = ({ children }) => {
  const repo = useMemo(() => new ApiUserRepository(), []);
  const userContext = useUser({ repo });

  return (
    <UserContext.Provider
      value={{
        userContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
```

#### Contexto en React19. El API `use`

React 19 incluye dos cambios en relación con el contexto:

- El API `use` permite acceder a datos asíncronos directamente en el componente, sin necesidad de usar `useEffect` o `useState`.
- El API `use` además permite acceder a datos de contexto directamente en el componente, sin necesidad de usar `useContext`.
- En el API de `Context` ya no es necesario utilizar el método `Provider` para crear el wrapper que proporciona el valor del contexto.

```tsx
type Props = {
  children: React.ReactNode;
};
export const UserProvider: React.FC<Props> = ({ children }) => {
  const repo = new ApiUserRepository();
  const userContext = useUser({ repo });

  return (
    <UserContext
      value={{
        userContext,
      }}
    >
      {children}
    </UserContext>
  );
};
```

Al consumir el contexto, se puede acceder directamente al valor del contexto sin necesidad de usar `useContext`.

```tsx
export const UserProfile: React.FC = () => {
  const { userContext } = use(UserContext);

  return (
    <div>
      {userContext.loading ? (
        <p>Cargando...</p>
      ) : userContext.error ? (
        <p>Error: {userContext.error.message}</p>
      ) : (
        <p>Hola, {userContext.user?.name}</p>
      )}
    </div>
  );
};
```

### 📝 Ejercicios sugeridos

✅ Ejercicio sugerido
Crea un componente basado en clase que reciba un nombre como prop y lleve un contador en su estado.

✅ Ejercicio sugerido
Crea un componente UserCard que reciba un objeto usuario y una función como props. Permite cambiar entre modo "vista" y "edición".

✅ Ejercicio sugerido
Crea una clase base LoggedComponent con un método log() protegido.

Extiende esa clase con un componente que use readonly y private en sus props y métodos.

- Componente de clase simple con props y state.
- Componente con props complejas y lógica de edición.
- Componente que hereda de una clase base abstracta y usa modificadores de acceso.
- Uso de readonly para proteger props contra cambios.
