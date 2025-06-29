
import type { RouteObject } from 'react-router';
import { App } from '../app/app';
import React from 'react';

const Home = React.lazy(() => import('@home/home'));
const About = React.lazy(() => import('@about/about'));

export const routes: RouteObject[] = [
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
            },
            {
                path: '/product/:id',
                lazy: {
                    Component: async () => (await import('@products/details/product-details')).ProductDetails,
                }
            },
            {
                path: '*',
                Component: () => <div>404 Not Found</div>,
            },
        ],
    },
];
