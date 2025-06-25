# React Router

- [React Router](#react-router)
  - [Declarativa](#declarativa)
    - [Provider y Rutas](#provider-y-rutas)
      - [Test de App](#test-de-app)
    - [Fichero de rutas](#fichero-de-rutas)
      - [Test de rutas](#test-de-rutas)
    - [Rutas anidadas](#rutas-anidadas)
      - [Componente Layout](#componente-layout)
      - [Test del componente Layout](#test-del-componente-layout)
      - [Componente App](#componente-app)
      - [Rutas Anidadas](#rutas-anidadas-1)
    - [Menu y navegación](#menu-y-navegación)
      - [Componente Menu](#componente-menu)
      - [SPA](#spa)
      - [Test funcional del menú](#test-funcional-del-menú)
    - [Rutas dinámicas](#rutas-dinámicas)
      - [Test del componente ProductDetail](#test-del-componente-productdetail)
    - [Carga diferida (Lazy loading) de las páginas](#carga-diferida-lazy-loading-de-las-páginas)
      - [Test de las rutas con carga diferida](#test-de-las-rutas-con-carga-diferida)

En sus versiones 7.x existen tres estrategias de uso:

- Declarativa
- Data (Programática)
- Framework

## Declarativa

### Provider y Rutas

En el fichero main se añade un provider de las rutas:

```tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

En el fichero App se definen las rutas:

```tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import './App.css';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
export default App;
```

#### Test de App

Al depender del proveedor de rutas, se debe envolver el componente a testar en un `MemoryRouter`:

```tsx
import { render } from '@testing-library/react';
import App from './App';
import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { MemoryRouter } from 'react-router';

vi.mock('./core/components/header/header');
vi.mock('./core/components/footer/footer');

describe('App component', () => {
  test('should call components Header and Footer', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(Header).toHaveBeenCalled();
    expect(Footer).toHaveBeenCalled();
  });
});
```

Lo que testamos es que es capaz de llamar a los componentes `Header` y `Footer`, que son parte del layout de la aplicación.

### Fichero de rutas

Para evitar que el fichero `App.tsx` crezca, se pueden definir las rutas en un fichero separado:

```tsx
import { Home } from '../../features/home/home';
import { About } from '../../features/about/about';
import { Route, Routes } from 'react-router';
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};
```

Luego se importa en el fichero `App.tsx` como un componente más.

#### Test de rutas

Para testar las rutas, se puede hacer de forma similar al test de `App.tsx`, envolviendo el componente en un `MemoryRouter`:
(Opcionalmente en el test de App podemos crear un mock del componente `AppRoutes` y eliminar el proveedor de rutas)

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AppRoutes } from './app-routes';
import { Home } from '../../features/home/home';
import { About } from '../../features/about/about';

vi.mock('../../features/home/home');
vi.mock('../../features/about/about');

describe('App component', () => {
  test('should render info for invalid routes', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    const element = screen.getByText('404 Not Found');
    expect(element).toBeInTheDocument();
  });

  test('should route to home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(Home).toHaveBeenCalled();
  });
  test('should route to about page', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(About).toHaveBeenCalled();
  });
});
```

### Rutas anidadas

Las mismas rutas se pueden definir de forma anidada, creando un nuevo componente Layout que se encargue de renderizar las rutas hijas.

#### Componente Layout

```tsx
type Props = {
  children: JSX.Element;
  title: string;
};
export const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Header title={title} />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};
```

#### Test del componente Layout

Recupera en parte el que antes era test de App, ya que ahora es el Layout quien monta Header y Footer

```tsx
vi.mock('../header/header');
vi.mock('../footer/footer');

describe('Layout component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Layout title="Demo 06">
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>,
    );
  });

  test('should render children content', () => {
    const content = document.querySelector('.main');
    expect(content).toBeInTheDocument();
    expect(content?.textContent).toBe('Test Content');
  });

  test('should call components Header and Footer', () => {
    expect(Header).toHaveBeenCalled();
    expect(Footer).toHaveBeenCalled();
  });
});
```

#### Componente App

El componente `App` ahora utiliza el componente `Layout` para envolver las rutas:

```tsx
export const App: React.FC = () => {
  const title = import.meta.env.VITE_APP_TITLE || 'Demo 06 - Routes';

  return (
    <>
      <Layout title={title}>
        <AppRoutes />
      </Layout>
    </>
  );
};
```

Siguiendo la forma de hacer los tests, el test de `App` se puede simplificar, ya que no es necesario comprobar que se llaman a los componentes `Header` y `Footer`, ya que ahora son parte del `Layout`.

```tsx
vi.mock('../layout/layout', () => ({
  Layout: vi.fn(({ children }) => <div>{children}</div>),
}));
vi.mock('../../routes/app-routes');

describe('App component', () => {
  test('should call components Header and Footer', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(AppRoutes).toHaveBeenCalled();
    expect(Layout).toHaveBeenCalled();
  });
});
```

En este caso, el mock del layout tiene que implementarse para que reciba los hijos, ya que el componente `App` los pasa como tal.

#### Rutas Anidadas

El componente Layout, puede integrarse en las rutas y anidar las rutas hijas. Para ello se sustituye el children por un elemento `Outlet` de React Router, que se encargará de renderizar las rutas hijas.

```tsx
type Props = {
  title?: string;
};
export const Layout: React.FC<Props> = ({ title = '' }) => {
  return (
    <>
      <Header title={title} />
      <main className="main">
        {/* This is where the child components will be rendered */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
```

Su test tanbién se simplifica al no necesitar comprobar que se renderizan los hijos, ya que el `Outlet` se encargará de ello:

```tsx
vi.mock('../header/header');
vi.mock('../footer/footer');

describe('Layout component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Layout title="Demo 06"></Layout>
      </MemoryRouter>,
    );
  });

  test('should call components Header and Footer', () => {
    expect(Header).toHaveBeenCalled();
    expect(Footer).toHaveBeenCalled();
  });
});
```

Las rutas en el componente AppRoutes quedarían de la siguiente forma:

```tsx
type Props = {
  title?: string;
};
export const AppRoutes: React.FC<Props> = ({ title }) => {
  return (
    <Routes>
      <Route path="/" element={<Layout title={title} />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  );
};
```

Y el componente `App` solo cargaría las rutas, con lo que quedaría así:

```tsx
import { AppRoutes } from './routes/app-routes';
export const App: React.FC = () => {
  const title = import.meta.env.VITE_APP_TITLE || 'Demo 06 - Routes';

  return (
    <>
      <AppRoutes title={title} />
    </>
  );
};
```

Igualmente se simplificaría su test que solo necesita comprobar que llama al componente `AppRoutes`:

```tsx
vi.mock('../../routes/app-routes');

describe('App component', () => {
  test('should call components Header and Footer', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(AppRoutes).toHaveBeenCalled();
  });
});
```

### Menu y navegación

#### Componente Menu

Como parte del componente Layout añadimos un componente Menu, con los enlaces a las rutas.

Pera la rutas utilizamos un array con la información de cada una de ellas y lo renderizamos de forma iterativa.

```tsx
type MenuOption = {
  label: string;
  path: string;
};

export const Menu: React.FC = () => {
  const menuOptions: MenuOption[] = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav className="menu">
      <ul>
        {menuOptions.map((option) => (
          <li key={option.path}>
            <a href={option.path}>{option.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

El test del menu, sin ser todavía funcional, se limita a comprobar que se renderiza el componente y que contiene los enlaces definidos:

```tsx
describe('Menu component', () => {
  test('should render project info', () => {
    render(<Menu />);
    let option = screen.getByText(/home/i);
    expect(option).toBeInTheDocument();
    option = screen.getByText(/about/i);
    expect(option).toBeInTheDocument();
    option = screen.getByText(/products/i);
    expect(option).toBeInTheDocument();
  });
});
```

En el componente Header añadimos la posibilidad de recibir un children, que será el componente `Menu`:

```tsx
type Props = {
  title?: string;
  children?: React.ReactNode;
};
export const Header: React.FC<Props> = ({ title = 'Demo', children }) => {
  return (
    <header className="header">
      <div className="header-main">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>{title}</h1>
      </div>
      {children && <div className="header-children">{children}</div>}
    </header>
  );
};
```

En el componente Layout, se añade el componente `Menu` como hijo del `Header`:

```tsx
type Props = {
  title?: string;
};
export const Layout: React.FC<Props> = ({ title = '' }) => {
  return (
    <>
      <Header title={title}>
        <Menu />
      </Header>
      <main className="main">
        {/* This is where the child components will be rendered */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
```

De esta forma mantenemos la semántica del HTML, que indica los elementos de navegación dentro del `header`, y el componente `Menu` se renderiza como parte del `Header`.

#### SPA

Al utilizar href en los enlaces del menú, la navegación es una MPA, ya que recarga la página al hacer clic en un enlace.

Para que sea una SPA, se debe utilizar el componente `Link` de React Router para navegar entre las diferentes rutas sin recargar la página.

```tsx
import { Link } from 'react-router-dom';
...
<Link to={option.path} className="menu-link">
  {option.label}
</Link>;
```

Ahora, al hacer clic en un enlace del menú, la navegación se realiza sin recargar la página, manteniendo el estado de la aplicación y mejorando la experiencia del usuario.

#### Test funcional del menú

Para testear de forma unitaria el menu SPA necesitamos comprobar que el Link responde cuando hacemos click, sinnecesidad de que se cargue realmente ninguna ruta.

Para ello, podemos utilizar el objeto history del navegador, pero el problema es que MemoryRouter no modifica la URL del navegador real (window.location), ya que funciona completamente en memoria y React Router no expone el estado de location fuera de su contexto.

La librería **history** (usada internamente tanto por React Router como por Remix) puede ayudarnos si usas un router controlado como unstable_HistoryRouter y si creamos un objeto history.

La podemos instalar con:

```bash
npm i -D history
```

A continuación usamos **createMemoryHistory** y **unstable_HistoryRouter** (de React Router)

```tsx
import { render, screen } from '@testing-library/react';
import { Menu } from './menu';
import {
    unstable_HistoryRouter as Router,
    type HistoryRouterProps,
} from 'react-router';
import { createMemoryHistory } from 'history';

describe('Menu component', () => {
    const history = createMemoryHistory();

    beforeEach(() => {
        history.push('/test');
        history.push = vi.fn();
        render(
            <Router
                history={history as unknown as HistoryRouterProps['history']}
            >
                <Menu />
            </Router>,
        );
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    ...
})
```

Ahora podemos comprobar que al hacer clic en un enlace del menú, se llama a la función `push` del objeto `history`, que es la que se encarga de cambiar la ruta actual sin recargar la página.

```tsx
test('should respond when we click the link to home', async () => {
  const option = screen.getByText(/home/i) as HTMLAnchorElement;
  expect(option.href).toContain('/');
  option.click();
  // Check if history.push was called with the correct path
  expect(history.push).toHaveBeenCalledWith(
    expect.objectContaining({
      hash: '',
      pathname: '/',
      search: '',
    }),
    undefined,
    expect.anything(),
  );
});
``;
```

Y lo mismo para cada una de las rutas,

### Rutas dinámicas

Para utilizar rutas dinámicas creamos la feature Products

- La entidad correspondiente
- un Mock de productos almacenado como una constante
- Un servicio con métodos asíncronos para obtener los productos y uno por id
- Un componente Products que renderiza una lista de productos
- Un componente Product que renderiza un producto por id

En al componente `Products` cada item tiene un link con una ruta diáminca:

- parte fija: `/products/`
- segmento dinámica: el id de cada producto, que será identificado como `:id`

```tsx
<ul className="products-list">
  {items.map((item) => (
    <li className="product-item" key={item.id}>
      <Link to={'/product/' + item.id}>{item.name}</Link>
    </li>
  ))}
</ul>;
``;
```

En las rutas se incluye una nueva, con el patron dinámico `/product/:id`:

```tsx
<Routes>
  <Route path="/" element={<Layout title={title} />}>
    ...
    <Route path="product/:id" element={<ProductDetail />} />
    ...
  </Route>
</Routes>
```

El componente `ProductDetail` recupera el id de la ruta y el resto de sus datos del servicio, para poder mostrar el producto correspondiente:

```tsx
const { id } = useParams<{ id: UUID }>();
const [product, setProduct] = useState<Product | null>(null);
useEffect(() => {
  const loadData = async (id: UUID): Promise<void> => {
    console.log('Loading product data for ID:', id);
    // Simulate fetching product data
    const fetchedProduct: Product = await repo.getProductById(id);
    setProduct(() => fetchedProduct);
  };
  loadData(id as UUID);
}, [id]);
```

Ademas se añade un botón de volver al inicio como ejemplo de navegación programática, que utiliza el hook `useNavigate` de React Router:

```tsx
const navigate = useNavigate();
const handleClick = (): void => {
  console.log('Button clicked, navigating to home');
  navigate('/');
};
```

#### Test del componente ProductDetail

Además ed usar una ruta dinámicac, el componente `ProductDetail` utiliza un servicio para obtener los datos del producto, por lo que es necesario usar un mock para poder testarlo y hay que tener en cuenta el carácter asíncrono de los datos que se van a mostrar.

```tsx
const product: Product = {
  id: '46392892-ac1e-4b5b-b395-978c318ef7ef',
  name: 'Product_1',
  description: 'Description of Product 1',
  price: 100,
  category: 'Category 1',
  image: 'https://example.com/product1.jpg',
};
const url = '/product/' + product.id;
beforeEach(async () => {
  vi.spyOn(repo, 'getProductById').mockResolvedValue(product);
  await act(async () =>
    render(
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />}></Route>
        </Routes>
      </MemoryRouter>,
    ),
  );
});
```

En el test se comprueba que se renderiza el producto con los datos correctos. No es necesario que sea asíncrono, porque el act que envuelve al render ya ha esperado que se resuelva la carga de datos del producto:

```tsx
test('should render product details', () => {
  const name = screen.getByText(new RegExp(product.name, 'i'));
  expect(name).toBeInTheDocument();
  if (product.description) {
    const description = screen.getByText(new RegExp(product.description, 'i'));
    expect(description).toBeInTheDocument();
  }
  const price = screen.getByText(new RegExp(`${product.price}€`, 'i'));
  expect(price).toBeInTheDocument();
  if (product.category) {
    const category = screen.getByText(new RegExp(product.category, 'i'));
    expect(category).toBeInTheDocument();
  }
});
```

Por último se testa que el botón de volver al inicio navega a la ruta `/`:

```tsx
    test('should navigate to home when button is clicked', () => {
        const button = screen.getByRole('button', { name: /volver/i });
        expect(button).toBeInTheDocument();
        button.click();
        expect(history.location.pathname).toBe('/');
    });
});
```

En este caso es sencillo porque, a diferencia del Link, la función `navigate` del hook `useNavigate` si modifica el objeto `history` del navegador, por lo que podemos comprobar que la ruta ha cambiado correctamente.

### Carga diferida (Lazy loading) de las páginas

Se basa en la existencia en el estándar de JS de la posibilidad de importar **módulos** de forma **asíncrona**, utilizando la función `import()`.

Para implementar el lazy loading en las rutas de React Router, se puede utilizar la función `lazy` de React, que permite cargar componentes de forma diferida. Para facilitar esta operación es conveniente que los componentes que se vayan a cargar de forma diferida estén exportados de forma `default`.

```tsx
const Home = React.lazy(() => import('../../features/home/home'));
const Products = React.lazy(() => import('../../features/products/products'));
const ProductDetail = React.lazy(
  () => import('../../features/products/pages/product-detail'),
);
const About = React.lazy(() => import('../../features/about/about'));
```

Para ello, se importa el componente de forma diferida utilizando `React.lazy` y se envuelve en un `Suspense` para manejar el estado de carga.

```tsx
<Route
  index
  element={
    <React.Suspense>
      <Home />
    </React.Suspense>
  }
/>
```

Y así con cada una de las rutas que se vayan a cargar de forma diferida.

Para que el componente `Suspense` muestre algo mientras se carga el componente, se le puede pasar una prop `fallback` con un elemento que se mostrará durante la carga:

```tsx
<React.Suspense fallback={<div>Loading...</div>}>
  <Home />
```

#### Test de las rutas con carga diferida

El único cambio en loa test de las rutas es que se debe usar waitFor para esperar a que se resuelva la carga del componente diferido:

```tsx
test('should route to home page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <AppRoutes />
    </MemoryRouter>,
  );
  await waitFor(() => {
    expect(Home).toHaveBeenCalled();
  });
});
```
