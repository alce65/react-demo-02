import { Link, useLoaderData } from 'react-router';
import './products.css';
import type { Product } from './types/product';
import { useState } from 'react';
// import { AppContext } from '@context/context';

export const Products: React.FC = () => {
    const {products: initialProducts} = useLoaderData<{products: Product[]}>(); // This is to ensure the loader data is fetched

    const [products] = useState<Product[]>(initialProducts);
    // const { productsRepo: repo } = use(AppContext);

    const handleClick = (product: Product): void => {
        console.log('Product added to cart:', product);
    };

    // useEffect(() => {
    //     console.log('Products loaded from useEffect');
    //     repo.getProducts()
    //         .then((data) => {
    //             setProducts(data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching products:', error);
    //         });
    // }, []);

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
