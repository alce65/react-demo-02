# Redux

- [Redux](#redux)
  - [Store](#store)
  - [Provider](#provider)
  - [Slice](#slice)
  - [Integración del slice en el store y acceso a los datos](#integración-del-slice-en-el-store-y-acceso-a-los-datos)
  - [Acciones y Reducers](#acciones-y-reducers)
    - [Test del reducer](#test-del-reducer)
  - [Dispatch de acciones](#dispatch-de-acciones)
    - [Repositorio y Contexto](#repositorio-y-contexto)
    - [Hook useProducts](#hook-useproducts)
    - [Componente Products](#componente-products)
    - [Componente DetailProducts](#componente-detailproducts)
    - [Loaders en las rutas](#loaders-en-las-rutas)

Redux Toolkit es la herramienta oficial para trabajar con Redux, que simplifica la creación de store y reducers, y proporciona utilidades para manejar acciones y efectos secundarios.

```shell
npm i @reduxjs/toolkit react-redux
```

## Store

Crea una carpeta store con un archivo `index.ts` o `store.ts` en la carpeta `src` para definir el store de Redux:

```ts
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Aquí se agregarán los reducers
  },
});
```

El Store se dividirá en diferentes partes, para cada una de las funcionalidades de tu aplicación. Cada parte del store se maneja con un reducer, que es una función que recibe el estado actual y una acción, y devuelve un nuevo estado. Ese reducer y sus acciones se manejan y se crean como un **slice**

## Provider

Para que los componentes de tu aplicación puedan acceder al store de Redux, debes envolver tu aplicación con el `Provider` de `react-redux`. Esto se hace típicamente en el archivo principal de tu aplicación, como `index.tsx` o `App.tsx`.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import App from './App';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>,
);
```

## Slice

Un **slice** es una parte del store que maneja un conjunto específico de datos y acciones. Puedes crear un slice utilizando la función `createSlice` de Redux Toolkit.

Cada slice debe tener

- un nombre,
- un estado inicial y
- un conjunto de reducers.

Los reducers son funciones que manejan las acciones y actualizan el estado.

La parte del estado global que corresponde a este slice se define en el `initialState`, y puede ser de cualquier tipo: primitivo, array, objeto...
aunque lo más común es que sea un objeto.

Las acciones se definen como métodos dentro del objeto `reducers`.

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type ProductsState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
```

## Integración del slice en el store y acceso a los datos

Para integrar el slice en el store, debes importar el reducer del slice y agregarlo al objeto `reducer` en la configuración del store.

```ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer, // Aquí se agrega el reducer del slice
  },
});
```

Añadiremos unos tipos de utilidad para todo el Store, para que podamos acceder a los datos de forma tipada:

```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Desde cualquier parte de la aplicación deberíamos poder acceder a los datos del slice utilizando el hook `useSelector` de `react-redux`.

Por ejemplo lo podemos hacer desde el componente **Home** o desde **Menu**, para mostrar el número de productos disponibles junto al link de productos:

```tsx
import { useSelector } from 'react-redux';
const products = useSelector((state: any) => state.products);
```

Para sustituir el `any` por un tipo más específico, podemos crear un tipo para el estado global de la aplicación, que incluya todos los slices que tengamos:

```ts
import { RootState } from './store';
const products = useSelector((state: RootState) => state.products);
```

Para no tener que usar el typo cada vez que usemos `useSelector`, podemos crear un hook personalizado que nos permita acceder al estado de forma más sencilla. Y lo mismo para el `dispatch`.

```ts
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import {
  useSelector,
  useDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
```

Estos hooks personalizados nos permiten usar `useAppSelector` y `useAppDispatch` en lugar de los hooks originales de `react-redux`, manteniendo el tipado adecuado. Aparte de los tipos añaden una capa de abstracción entre los componentes y react-redux. desacoplandonos de la librería y permitiendo cambiarla en el futuro si fuera necesario, por ejemplo con `zustand` o `jotai`.

Luego podemos usar este hook en lugar de `useSelector` en nuestros componentes:

```tsx
import { useAppSelector } from './hooks';
const products = useAppSelector((state) => state.products);
```

## Acciones y Reducers

Para manejar acciones y actualizar el estado, puedes definir reducers dentro del slice. Cada reducer es una función que recibe el estado actual y una acción, y devuelve un nuevo estado.

```ts
import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const newProduct = action.payload;
      return {
        ...state,
        products: [...state.products, newProduct],
      };
    },
  },
});
```

Como el tipo de la acción es `any`, se puede hacer cualquier operación con ella sin que typescript de ningun error, pero sería mejor definir un tipo para la acción, por ejemplo usando `PayloadAction` de Redux Toolkit.

Adema´s no es necesario respetar la inmutabilidad del stato ya que Redux Toolkit utiliza `Immer` internamente, lo que permite escribir código más limpio y directo al modificar el estado.

```ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, UUID } from '../types/product';

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    deleteProduct: (state, action: PayloadAction<UUID>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});
```

Finalmente podemos exportar las acciones junto con el reducer del slice:

```ts
export const { setProducts, addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
```

### Test del reducer

Para probar el reducer, puedes crear un archivo de test en la misma carpeta del slice, por ejemplo `productsSlice.test.ts`. En este archivo, puedes importar el reducer y las acciones, y escribir pruebas para verificar que el reducer actualiza el estado correctamente.

```ts
import type { Product } from '../types/product';
import reducer from './slice';
import * as ac from './slice';

describe('productsSlice', () => {
  const initialState = {
    products: [],
    loading: false,
    error: null,
  };

  test('should handle setProducts', () => {
    const newProducts: Product[] = [
      { id: '1-1-1-1-1-1', name: 'Product 1', price: 100 },
      { id: '2-2-2-2-2-2', name: 'Product 2', price: 200 },
    ];
    const state = reducer(initialState, ac.setProducts(newProducts));
    expect(state.products).toEqual(newProducts);
  });

  test('should handle addProduct', () => {
    const newProduct: Product = {
      id: '3-3-3-3-3-3',
      name: 'Product 3',
      price: 300,
    };
    const state = reducer(initialState, ac.addProduct(newProduct));
    expect(state.products).toContainEqual(newProduct);
  });
  test('should handle updateProduct', () => {
    const initialProducts: Product[] = [
      { id: '1-1-1-1-1-1', name: 'Product 1', price: 100 },
    ];
    const updatedProduct: Product = {
      id: '1-1-1-1-1-1',
      name: 'Updated Product 1',
      price: 150,
    };
    const state = reducer(
      { ...initialState, products: initialProducts },
      ac.updateProduct(updatedProduct),
    );
    expect(state.products).toContainEqual(updatedProduct);
  });
  test('should handle deleteProduct', () => {
    const initialProducts: Product[] = [
      { id: '1-1-1-1-1-1', name: 'Product 1', price: 100 },
      { id: '2-2-2-2-2-2', name: 'Product 2', price: 200 },
    ];
    const state = reducer(
      { ...initialState, products: initialProducts },
      ac.deleteProduct('1-1-1-1-1-1'),
    );
    expect(state.products).toHaveLength(1);
    expect(state.products[0].id).toBe('2-2-2-2-2-2');
  });
});
```

## Dispatch de acciones

Para despachar acciones desde un componente, puedes usar el hook `useDispatch` de `react-redux`. Este hook te permite acceder a la función `dispatch` del store, que se utiliza para enviar acciones al reducer.

Para centralizar todo el dispatch de acciones, podemos crear un hook personalizado `useProducts` que nos permita además encapsular las llamadas a la API y manejar los efectos secundarios.

### Repositorio y Contexto

Respecto a las primeras, comenzaremos por encapsularlas en un servicio que se encargue de interactuar con la API. Por ejemplo, podemos crear un interface `ProductRepository` con implementaciones comm `InMemoryProductsRepoService` o `ApiProductsRepoService.ts`:

```tsx
import type { Product, ProductDTO } from '../../types/product';

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: Product['id']): Promise<Product>;
  createProduct(user: ProductDTO): Promise<Product>;
  updateProduct(
    id: Product['id'],
    product: Partial<ProductDTO>,
  ): Promise<Product>;
  deleteProduct(id: Product['id']): Promise<void>;
}
```

Para conseguir una inyección de dependencia que siempre proporcione la misma instancia del repositorio, podemos usar un contexto de React. Creamos un contexto `AppContext` y un proveedor `AppContextProvider` que se encargue de proporcionar la instancia del repositorio a los componentes que lo necesiten

```ts
import React, { createContext, useContext } from 'react';
import type { ProductRepository } from './ProductRepository';

type Context = {
  title: string;
  repo: ProductRepository;
};

const defaultContext: Context = {} as Context;

const AppContext = createContext<Context>(defaultContext);
```

El provider del contexto es un componente de React recibe por props el repositorio y el titulo de la app y los proporciona (inyecta) a través del contexto:

```tsx
type Props = {
  children: React.ReactNode;
  title: string;
  repo: ProductRepository;
};

export const AppContextProvider: React.FC<Props> = ({
  children,
  repo,
  title,
}) => {
  return (
    <AppContext.Provider value={{ title, repo }}>
      {children}
    </AppContext.Provider>
  );
};
```

Luego, en el archivo principal de tu aplicación, puedes envolver tu aplicación con el `AppContextProvider`, pasándole la instancia del repositorio y el título de la aplicación:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppContextProvider } from './context/AppContext';
import { ApiProductsRepoService } from './services/ApiProductsRepoService';
import App from './App';

const repo = new InMemoryProductRepository();
const title = import.meta.env.VITE_APP_TITLE || 'Demo 07';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider repo={repo} title={title}>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContextProvider>
  </React.StrictMode>,
);
```

Ahora, en cualquier componente de la aplicación, se puede acceder al repositorio y al resto del contexto utilizando el API `use`:

```tsx
export const Header: React.FC<Props> = ({ children }) => {
    const { title } = use(AppContext) || 'Demo';
    ...
}
```

### Hook useProducts

Para encapsular la lógica de negocio relacionada con los productos, podemos crear un hook personalizado `useProducts`. Este hook utilizará el repositorio inyectado desde el contexto para realizar operaciones CRUD y despachar acciones al store de Redux.

```tsx
const { repo } = use(AppContext);
    const { products } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    const loadProducts = async (): Promise<void> => {
        const products = await repo.getProducts();
        dispatch(ac.setProducts(products));
    };

    const getProductById = async (
        id: Product['id'],
    ): Promise<Product> => {
        const product = await repo.getProductById(id);
        return product;
    };

    const addProduct = async (productData: ProductDTO): Promise<void> => {
        const newProduct = await repo.createProduct(productData);
        dispatch(ac.addProduct(newProduct));
    };
    const updateProduct = async (
        id: Product['id'],
        productData: ProductDTO,
    ): Promise<void> => {
        const updatedProduct = await repo.updateProduct(id, productData);
        dispatch(ac.updateProduct(updatedProduct));
    };
    const deleteProduct = async (id: Product['id']): Promise<void> => {
        await repo.deleteProduct(id);
        dispatch(ac.deleteProduct(id));
    };


    return {
        products,
        loadProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
    };
};
```

### Componente Products

### Componente DetailProducts

### Loaders en las rutas
