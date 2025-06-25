import type { PropsWithChildren } from 'react';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';
// import { Menu } from '../menu/menu';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header>
              <Menu />
            </Header>
            <main>{children}</main>
            <Footer />
        </>
    );
};
