import { Link } from 'react-router';
import './products.css';
import type { Product } from './types/product';
import { useEffect, useState } from 'react';
import { InMemoryProductRepository } from './services/in-memory.product.repo';

const repo = new InMemoryProductRepository();

export const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const handleClick = (product: Product): void => {
        console.log('Product added to cart:', product);
    };

    useEffect(() => {
        console.log('Products loaded from useEffect');
        repo.getProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <section className="products">
            <h2>Welcome to the Demo Project Products</h2>
            <ul className="products-list">
                {products.map((item) => (
                    <li className="product-item" key={item.id}>
                        <Link to={'/product/' + item.id}>{item.name}</Link>
                        <button onClick={() => handleClick(item)}>
                            Add to cart
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Products;
