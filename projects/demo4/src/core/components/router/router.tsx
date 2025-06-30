import type { RouteObject } from 'react-router';
import { App } from '../app/app';
import React from 'react';
import type { Product, UUID } from '@products/types/product';
import type { ProductRepository } from '@products/services/product.repo';

const Home = React.lazy(() => import('@home/home'));
const About = React.lazy(() => import('@about/about'));

interface Params { params: Record<string, unknown> }


export const createRoutes = (repo: ProductRepository): RouteObject[] => {


    const productsLoader = async (): Promise<{ products: Product[] }> => {
        return {  products: await repo.getProducts()};
    };

    const productsDetailsLoader = async ({ params: {id} }: Params): 
     Promise<{ product: Product }>  => {    
            const product = await repo.getProductById(id as UUID);
            return { product };
    };



    const routes: RouteObject[] = [
        {
            path: '/',
            Component: App,
            children: [
                {
                    index: true,
                    Component: Home,
                },
                {
                    path: '/home',
                    Component: Home,
                },
                {
                    path: '/about',
                    Component: About,
                },
                {
                    path: '/products',
                    lazy: {
                        Component: async () =>
                            (await import('@products/products')).Products,
                    },
                    loader: productsLoader,
                },
                {
                    path: '/product/:id',
                    lazy: {
                        Component: async () =>
                            (await import('@products/details/product-details'))
                                .ProductDetails,
                    },
                    loader: productsDetailsLoader,
                },
                {
                    path: '/cart',
                    lazy: {
                        Component: async () =>
                            (await import('@products/cart/cart')).Cart,
                    },  
                },
                {
                    path: '*',
                    Component: () => <div>404 Not Found</div>,
                },
            ],
        },
    ];

    return routes;
};
