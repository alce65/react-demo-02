import { render, screen } from '@testing-library/react';
import { Products } from './products';

describe('Products component', () => {
    test('should render project info', () => {
        render(<Products />);
        const info = screen.getByText(/products/i);
        expect(info).toBeInTheDocument();
    });
});
