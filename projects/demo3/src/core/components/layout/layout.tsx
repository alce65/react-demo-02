import type { PropsWithChildren } from 'react';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';


export interface MenuOption {
    label: string;  
    path: string;
}

const menuOptions: MenuOption[] = [ 
    {label: "Home", path: "/"},
    {label: "About", path: "/about"},
    {label: "Products", path: "/products"}
]

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header>
              <Menu options={menuOptions}/>
            </Header>
            <main>{children}</main>
            <Footer />
        </>
    );
};
