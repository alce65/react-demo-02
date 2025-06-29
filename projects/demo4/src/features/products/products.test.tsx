import { render, screen } from '@testing-library/react';
import { Products } from './products';
import { MemoryRouter as Router } from 'react-router';
import type { ProductRepository } from './services/product.repo';
import { AppContext } from '@context/context';

describe('Products component', () => {
  describe('Valid repo responses', () => {
    const repoMock: ProductRepository = {
      getProducts: vi.fn().mockResolvedValue([
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ]),
    } as unknown as ProductRepository;

    const context = { productsRepo: repoMock } as AppContext;
    beforeEach(() => {
      vi.clearAllMocks();
      render(
        <AppContext value={context}>
          <Router initialEntries={['/products']}>
            <Products />
          </Router>
          ,
        </AppContext>,
      );
    });
    test('should render project info', () => {
      const info = screen.getByText(/products/i);
      expect(info).toBeInTheDocument();
    });
    test('should render product list calling the repo', async () => {
      const product1 = await screen.findByText('Product 1');
      const product2 = await screen.findByText('Product 2');
      expect(product1).toBeInTheDocument();
      expect(product2).toBeInTheDocument();
      expect(repoMock.getProducts).toHaveBeenCalledTimes(1);
    });
  });
  describe('Invalid repo responses', () => {
    vi.spyOn(console, 'error').mockReturnValue(undefined);
    const repoError = new Error('Network Error');
    const repoMock: ProductRepository = {
      getProducts: vi.fn().mockRejectedValue(repoError),
    } as unknown as ProductRepository;

    beforeEach(() => {
      const context = { productsRepo: repoMock } as AppContext;
      render(
        <AppContext value={context}>
          <Router initialEntries={['/']}>
            <Products />
          </Router>
          ,
        </AppContext>,
      );
    });

    test('should call console log', () => {
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching products:',
        repoError,
      );
    });
  });
});
