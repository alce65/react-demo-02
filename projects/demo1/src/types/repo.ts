import type { Product, ProductDTO, UUID } from "./products";

export interface Repo<T extends {id: UUID}, U> {
    getAll: () => Promise<T[]>;
    getById: (id: string) => Promise<T | null>;
    create: (item: U) => Promise<T>;
    update: (id: T['id'], item: Partial<U>) => Promise<T>;
    delete: (id: T['id']) => Promise<void>;
}



export class ProductRepo implements Repo<Product, ProductDTO> {
    private products: Product[] = [];

    getAll = async (): Promise<Product[]> => {
        return this.products;
    };

    getById = async (id: string): Promise<Product | null> => {
        const product = this.products.find(p => p.id === id);
        return product ?? null;
    };

    create = async (item: ProductDTO): Promise<Product> => {
        const product: Product = { ...item, id: crypto.randomUUID() };
        this.products.push(product);
        return product;
    };

    update = async (id: string, item: Partial<ProductDTO>): Promise<Product> => {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) throw new Error("Product not found");
        this.products[index] = { ...this.products[index], ...item };
        return this.products[index];
    };

    delete = async (id: string): Promise<void> => {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) throw new Error("Product not found");
        this.products.splice(index, 1);
    };


}
