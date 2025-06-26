import { render, waitFor } from '@testing-library/react';
import { AppRouter } from './router';
import { MemoryRouter as Router } from 'react-router';
import Home from '@home/home';
import About from '@about/about';
import Products from '@products/products';

vi.mock('@home/home');
vi.mock('@about/about');
vi.mock('@products/products');

describe('Router component', () => {
    it('should navigate to the "/" route', async () => {
        render(
            <Router initialEntries={['/']}>
                <AppRouter />
            </Router>,
        );
        await waitFor(() => {
            expect(Home).toHaveBeenCalled();
        });
    });

    it('should navigate to the "/about" route', async () => {
        render(
            <Router initialEntries={['/about']}>
                <AppRouter />
            </Router>,
        );

        await waitFor(() => {
            expect(About).toHaveBeenCalled();
        });
    });

    it('should navigate to the "/products" route', async () => {
        render(
            <Router initialEntries={['/products']}>
                <AppRouter />
            </Router>,
        );

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
