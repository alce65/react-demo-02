import type { Product, ProductDTO, UUID } from '../types/product';
import type { ProductRepository } from './product.repo';

const URL_BASE = import.meta.env.VITE_URL_API || 'http://localhost:3000';

export class ApiProductRepository implements ProductRepository {
    private apiProductsUrl = new URL(URL_BASE, 'products').href;
    async getProductById(id: UUID): Promise<Product> {
        const response = await fetch(`${this.apiProductsUrl}/${id}`);
        return response.json();
    }

    async getProducts(): Promise<Product[]> {
        const response = await fetch(this.apiProductsUrl);
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        return response.json();
    }

    async createProduct(user: ProductDTO): Promise<Product> {
        const response = await fetch(this.apiProductsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        return response.json();
    }

    async updateProduct(id: UUID, user: Partial<ProductDTO>): Promise<Product> {
        const response = await fetch(`${this.apiProductsUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error('Error updating users');
        }
        return response.json();
    }
    async deleteProduct(id: UUID): Promise<void> {
        const response = await fetch(`${this.apiProductsUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error updating users');
        }
    }
}

