

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

type ProductCategory = 'electronics' | 'clothing' | 'home' | 'books' | 'toys';

export interface Product {
    id: UUID;
    name: string;
    price: number;
    description?: string;
    category?: ProductCategory;
    inStock?: boolean;
    tags?: string[];
}

export type ProductList = Product[];

export type ProductDTO = Omit<Product, 'id' | 'inStock'>;

export type ProductUpdateDTO = Partial<Omit<Product, 'id'>>;


// Tuipos de utilidad de TypeScript

// export type ReadonlyProduct = Readonly<Product>;
// export type PartialProduct = Partial<Product>;
// export type PickProduct = Pick<Product, 'id' | 'name'>
// 
// export type RecordProduct = Record<string, Product>;


// type Values = {
//      [key: string]: string | number | boolean | null | undefined;
// }

type Values = Record<string, string | number | boolean | null | undefined>;


const object1: Values = {
    name: 'Sample Product',
    price: 29.99,
    inStock: true,
    description: 'A sample product for demonstration purposes.',
    category: 'electronics',
}

export const object = {
    name: 'Sample Product',
    price: 29.99,
    inStock: true,
    description: 'A sample product for demonstration purposes.',
    category: 'electronics',
}


for (const key in object1) {
        const element = object1[key];
        console.log(`${key}: ${element}`);
}
