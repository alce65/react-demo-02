import { render, screen } from '@testing-library/react';
import { About } from './about';

describe('About component', () => {
    test('should render project info', () => {
        render(<About />);
        const info = screen.getByText(/about/i);
        expect(info).toBeInTheDocument();
    });
});
