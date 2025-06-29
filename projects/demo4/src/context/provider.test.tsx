import { render, screen } from '@testing-library/react';
import { AppContextProvider } from './provider';
import { AppContext } from './context';
import { use } from 'react';

const TestComponent: React.FC = () => {
  const { title } = use(AppContext);
  return <div>{title}</div>;
};

describe('Context Provider', () => {
  render(
    <AppContextProvider title="Test Title">
      <TestComponent />
    </AppContextProvider>,
  );
  test('renders without crashing', () => {
    // This test will pass if the component renders without throwing an error
    const element = screen.getByText(/test title/i)
    expect(element).toBeInTheDocument();
  });
});
