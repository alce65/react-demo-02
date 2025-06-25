import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppContext } from '@context/context.ts';
import { App } from '@core/components/app/app';
import { BrowserRouter as Router } from 'react-router';
// import { InMemoryProductRepository } from '@products/services/in-memory.product.repo.ts';

const title = import.meta.env.VITE_APP_TITLE || 'React TS - Routes';
// const productsRepo = new InMemoryProductRepository();

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <StrictMode>
        <Router>
            <AppContext value={{ title /* productsRepo */ }}>
                <App />
            </AppContext>
        </Router>
    </StrictMode>,
);
