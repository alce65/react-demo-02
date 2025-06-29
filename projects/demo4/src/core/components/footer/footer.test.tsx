import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer component', () => {
    test('should render project info', () => {
        render(<Footer />);
        const info = screen.getByText(/proyecto/i);
        expect(info).toBeInTheDocument();
    });
});
