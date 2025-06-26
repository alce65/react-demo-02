import React from 'react';
import { Route, Routes } from 'react-router';
const Home = React.lazy(() => import('@home/home'));
const About = React.lazy(() => import('@about/about'));
const Products = React.lazy(() => import('@products/products'));
const ProductsDetails = React.lazy(
    () => import('@products/details/product-details'),
);

export const AppRouter: React.FC = () => {
    return (
        <div className="app-router">
            <Routes>
                <Route
                    path="/"
                    element={
                        // Using React.Suspense to handle the lazy loading of the Home component
                        // This will show a fallback UI while the Home component is being loaded
                        // Suspense no es ya necesario en React19
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Home />
                        </React.Suspense>
                    }
                />
                <Route path="/about" element={<About />}>
                    <Route
                        path="team"
                        element={
                            <React.Suspense fallback={<div>Loading Team...</div>}>
                                <div>Team Page</div>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="history"
                        element={       
                            <React.Suspense fallback={<div>Loading History...</div>}>
                                <div>History Page</div>
                            </React.Suspense>
                        }
                    />
                </Route>
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductsDetails />} />
                {/* <Route path="*" element={<div>Página no encontrada</div>} /> */}
                <Route path="*" element={<Home />} />
            </Routes>
        </div>
    );
};
