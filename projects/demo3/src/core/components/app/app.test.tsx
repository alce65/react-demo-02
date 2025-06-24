import { render, screen } from '@testing-library/react';
import { App } from './app';
// import { Layout } from '../layout/layout';


vi.mock('../layout/layout')
describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('AppRoutes is called', () => {
    // Arrange
    // Act
    render(<App />);
    const h1Element = screen.getByRole('heading');
    // Assert
    expect(h1Element).toBeInTheDocument();
    // expect(h1Element).toHaveTextContent('Demo3');
    // expect(Layout).toBeDefined();
  });
});
