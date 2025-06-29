import type { Product, ProductDTO, UUID } from '@products/types/product';
import { PRODUCTS } from '../data/products.data';
import { type ProductRepository } from './product.repo';

export class InMemoryProductRepository implements ProductRepository {
    private products: Product[] = PRODUCTS;

    async getProducts(): Promise<Product[]> {
        return this.products;
    }
    async getProductById(id: UUID): Promise<Product> {
        const product = this.products.find((product) => product.id === id);
        if (!product) throw new Error('Product not found');
        return product;
    }

    async createProduct(product: ProductDTO): Promise<Product> {
        const newProduct = { ...product, id: crypto.randomUUID() };
        this.products.push(newProduct);
        return newProduct;
    }

    async updateProduct(
        id: UUID,
        product: Partial<ProductDTO>,
    ): Promise<Product> {
        const index = this.products.findIndex((u) => u.id === id);
        if (index === -1) throw new Error('Product not found');
        this.products[index] = { ...this.products[index], ...product };
        return this.products[index];
    }

    async deleteProduct(id: UUID): Promise<void> {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) throw new Error('Product not found');
        this.products.splice(index, 1);
    }
}
