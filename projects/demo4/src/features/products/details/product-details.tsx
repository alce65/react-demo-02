
import type { Product } from '@products/types/product';
import { useState } from 'react';
import { useLoaderData, useNavigate} from 'react-router';

export const ProductDetails: React.FC = () => {

    const {product: initialProduct} = useLoaderData<{ product: Product }>();
    const [product]  = useState<Product>(initialProduct);
    const navigate = useNavigate();

    // useEffect(() => {
    //     repo.getProductById(id as UUID)
    //         .then((data) => {
    //             setProduct(data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching product:', error);
    //         });
    // }, [id, repo]);

    const handleClick: React.MouseEventHandler = () => {
        navigate('/');
    };

    return (
        <div className="products-details">
            <h1>Product Detail: {product.id?.split('-')[0] as string}</h1>
            {product && (
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                </div>
            )}
            <button onClick={handleClick}>Inicio</button>
        </div>
    );
};

export default ProductDetails;
