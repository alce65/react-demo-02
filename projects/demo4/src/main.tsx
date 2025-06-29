import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppContext } from '@context/context.ts';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from '@core/components/router/router';
// import { InMemoryProductRepository } from '@products/services/in-memory.product.repo.ts';

const title = import.meta.env.VITE_APP_TITLE || 'React TS - Routes';
// const productsRepo = new InMemoryProductRepository();

const appRouter = createBrowserRouter(routes);

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <StrictMode>
        <AppContext value={{ title /* productsRepo */ }}>
            <RouterProvider router={appRouter} />
        </AppContext>
    </StrictMode>,
);
