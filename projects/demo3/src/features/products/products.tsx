import { Link } from 'react-router';
import './products.css';

export const Products: React.FC = () => {
    return (
        <section className="products">
            <h2>Welcome to the Demo Project Products</h2>
            <ul className="products-list">
                <li>
                    <Link to={'/products/123-456-657?filter=active'}>
                        Detalles del 123-456-657
                    </Link>
                </li>
            </ul>
        </section>
    );
};

export default Products;
