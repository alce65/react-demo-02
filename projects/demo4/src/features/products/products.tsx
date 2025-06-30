import { Link, useLoaderData } from 'react-router';
import './products.css';
import type { Product } from './types/product';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './redux/cart.slice';
import type { RootState } from 'src/store';

// import { AppContext } from '@context/context';

export const Products: React.FC = () => {
    const { products: initialProducts } = useLoaderData<{
        products: Product[];
    }>(); // This is to ensure the loader data is fetched

    const { products: cartProducts } = useSelector(
        (state: RootState) => state.cartProducts,
    ); // This is to ensure the cart products are available in the store
    const dispatch = useDispatch();

    const [products] = useState<Product[]>(initialProducts);
    // const { productsRepo: repo } = use(AppContext);

    const handleClick = (product: Product): void => {
        // dispatch({
        //     type: 'cart/addProduct',
        //     payload: product,
        // });
        dispatch(actions.addProduct(product));
    };

    useEffect(() => {
        console.log('Current cart products:', cartProducts);
    }, [cartProducts]); // This is to ensure the component is mounted

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
