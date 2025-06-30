import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'src/store';
import './cart.css';
import { actions } from '@products/redux/cart.slice';
import type { Product } from '@products/types/product';

export const Cart: React.FC = () => {
    const { products } = useSelector((state: RootState) => state.cartProducts);
    const dispatch = useDispatch();
    const remove = (product: Product): void => {
        dispatch(actions.removeProduct(product));
    };

    const handleClear = (): void => {
        dispatch(actions.clearCart());
    };

    return (
        <div className="cart">
            <h1>Cart</h1>

            <button onClick={handleClear}>Clear all</button>
            {/* Cart content will go here */}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => remove(product)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
