import { AppContext } from '@context/context';
// import type { ProductRepository } from '@products/services/product.repo';

interface Props {
    children: React.ReactNode;
    title: string;
    // productsRepo: ProductRepository
}

export const AppContextProvider: React.FC<Props> = ({ children, title }) => {
    const context: AppContext = {
        title,
        // productsRepo
    };

    return <AppContext value={context}>{children}</AppContext>;
};
