import type { Product, ProductDTO } from '@products/types/product';

export interface ProductRepository {
    getProducts(): Promise<Product[]>;
    getProductById(id: Product['id']): Promise<Product>;
    createProduct(user: ProductDTO): Promise<Product>;
    updateProduct(
        id: Product['id'],
        product: Partial<ProductDTO>,
    ): Promise<Product>;
    deleteProduct(id: Product['id']): Promise<void>;
}
