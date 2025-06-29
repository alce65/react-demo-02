import { render, screen } from '@testing-library/react';
import { Home } from './home';

describe('Home component', () => {
    test('should render project info', () => {
        render(<Home />);
        const info = screen.getByText(/home/i);
        expect(info).toBeInTheDocument();
    });
});
