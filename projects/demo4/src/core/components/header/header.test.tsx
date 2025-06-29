import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { AppContext } from '@context/context';

describe('Header component', () => {
  test('should render tittle injected from context', () => {
    const title = 'Demo 06';
    const children = <div>Child Component</div>;
    render(
      <AppContext value={{ title } as AppContext}>
        <Header>{children}</Header>
      </AppContext>,
    );
    const element = screen.getByText(title);
    const childElement = screen.getByText('Child Component');
    expect(element).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });
});
