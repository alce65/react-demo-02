import { render } from '@testing-library/react';
import { Layout } from './layout';
// import { Menu } from '@core/components/menu/menu';
import { Header } from '@core/components/header/header';
import { Footer } from '@core/components/footer/footer';

vi.mock('../header/header', () => ({
    Header: vi.fn(({ children }) => <div>{children}</div>),
}));
vi.mock('../footer/footer');
// vi.mock('../menu/menu');

describe('Layout Component', () => {
    beforeEach(() => {
        //Arrange
        vi.clearAllMocks();
        // Act
        render(<Layout>Test</Layout>);
    });
    test('renders calling Header, Menu and Footer', () => {
        // Assert
        expect(Header).toHaveBeenCalled();
        // expect(Menu).toHaveBeenCalled();
        expect(Footer).toHaveBeenCalled();
    });
});
