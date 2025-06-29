import type { Product } from "../types/product.d";

export const PRODUCTS: Product[] = [
    {
        id: crypto.randomUUID(),
        name: "Laptop Dell XPS 13",
        price: 1299.99,
        description: "Ultrabook de 13 pulgadas con pantalla InfinityEdge y procesador Intel Core i7.",
        category: "Laptops",
        stock: 10,
        image: "https://example.com/images/dell-xps-13.jpg"
    },
    {
        id: crypto.randomUUID(),
        name: "Auriculares Sony WH-1000XM4",
        price: 349.99,
        description: "Auriculares inalámbricos con cancelación de ruido líder en la industria.",
        category: "Audio",
        stock: 25,
        image: "https://example.com/images/sony-wh-1000xm4.jpg"
    },
    {
        id: crypto.randomUUID(),
        name: "Monitor LG UltraWide 34''",
        price: 499.99,
        description: "Monitor UltraWide de 34 pulgadas con resolución QHD y relación de aspecto 21:9.",
        category: "Monitores",
        stock: 0,
        image: "https://example.com/images/lg-ultrawide-34.jpg"
    },
    {
        id: crypto.randomUUID(),
        name: "Teclado Mecánico Keychron K2",
        price: 89.99,
        description: "Teclado mecánico compacto con conectividad Bluetooth y retroiluminación RGB.",
        category: "Teclados",
        stock: 15,
        image: "https://example.com/images/keychron-k2.jpg"
    },
    {
        id: crypto.randomUUID(),
        name: "Mouse Logitech MX Master 3",
        price: 99.99,
        description: "Ratón inalámbrico avanzado con desplazamiento electromagnético y múltiples botones programables.",
        category: "Ratones",
        stock: 20,
        image: "https://example.com/images/logitech-mx-master-3.jpg"
    }
];
   