import { Route, Routes } from 'react-router';
import Home from '@home/home';
import About from '@about/about';
import Products from '@products/products';
import { ProductsDetails } from '@products/details/product-details';

export const AppRouter: React.FC = () => {
    return (
        <div className="app-router">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductsDetails/>} />
                {/* <Route path="*" element={<div>Página no encontrada</div>} /> */}
                <Route path="*" element={<Home />} />
            </Routes>
        </div>
    );
} 
