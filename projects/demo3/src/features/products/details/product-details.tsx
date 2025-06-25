import { useNavigate, useParams, useSearchParams } from "react-router";

export const ProductsDetails: React.FC = () => {

    const {id} = useParams<{id: string}>();

    const [ search ] = useSearchParams();
    const navigate = useNavigate();
    
    const handleClick: React.MouseEventHandler = () => {
        navigate('/');
    }
    
    console.log(search.get('filter'));
    
    return (
        <div className="products-details">
            <h1>Product Details</h1>
            <p>This is the product details for {id}.</p>
            <button onClick={handleClick}>Go home</button>
        </div>
    );
} 
