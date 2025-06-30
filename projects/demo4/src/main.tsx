import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppContext } from '@context/context.ts';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { createRoutes } from '@core/components/router/router';
// import { InMemoryProductRepository } from '@products/services/in-memory.product.repo.ts';
import { ApiProductRepository } from '@products/services/api.product.repo';


const title = import.meta.env.VITE_APP_TITLE || 'React TS - Routes';
// const productsRepo = new InMemoryProductRepository();
const productsRepo = new ApiProductRepository();




const appRouter = createBrowserRouter(createRoutes(productsRepo));

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <StrictMode>
        <AppContext value={{ title, productsRepo }}>
            <RouterProvider router={appRouter} />
        </AppContext>
    </StrictMode>,
);
