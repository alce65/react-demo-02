import { render, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import Home from '@home/home';
import About from '@about/about';
import Products from '@products/products';
import { routes } from './router';

vi.mock('@home/home');
vi.mock('@about/about');
vi.mock('@products/products');

describe('App component - Routes', () => {
    it('should navigate to the "/" route', async () => {
        const router = createMemoryRouter(routes, { initialEntries: ['/'] });
        render(<RouterProvider router={router} />);
        // expect(Home).toHaveBeenCalled();

        await waitFor(() => {
            expect(Home).toHaveBeenCalled();
        });
    });

    it('should navigate to the "/about" route', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/about'],
        });
        render(<RouterProvider router={router} />);
        // expect(About).toHaveBeenCalled();

        await waitFor(() => {
            expect(About).toHaveBeenCalled();
        });
    });

    it('should navigate to the "/products" route', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/products'],
        });
        render(<RouterProvider router={router} />);
        // expect(Products).toHaveBeenCalled();

        await waitFor(() => {
            expect(Products).toHaveBeenCalled();
        });
    });

    it('should handle route parameters correctly', () => {
        // Test implementation here
    });

    it('should handle navigation errors gracefully', () => {
        // Test implementation here
    });
});
