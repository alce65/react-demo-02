import { render, screen } from '@testing-library/react';
import { Products } from './products';
import { MemoryRouter as Router } from 'react-router';

describe('Products component', () => {
    test('should render project info', () => {
        render(
            <Router>
                <Products />
            </Router>,
        );
        const info = screen.getByText(/products/i);
        expect(info).toBeInTheDocument();
    });
});
