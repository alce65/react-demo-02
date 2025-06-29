import { render, screen } from '@testing-library/react';
import { Menu } from './menu';
import {
    unstable_HistoryRouter as Router,
    type HistoryRouterProps,
} from 'react-router';
import { createMemoryHistory } from 'history';
import type { MenuOption } from '../layout/layout';

describe('Menu component', () => {
    const history = createMemoryHistory();

    const menuOptions: MenuOption[] = [ 
        {label: "Home", path: "/"},
        {label: "About", path: "/about"},
        {label: "Products", path: "/products"}
    ]

    it('should render the menu with links', () => {
        history.push('/test');
        history.push = vi.fn();
        render(
            <Router
                history={history as unknown as HistoryRouterProps['history']}
            >
                <Menu options={menuOptions}/>
            </Router>,
        );

        const link1 = screen.getByText('Home');

        expect(link1).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();

        link1.click();
        expect(history.push).toHaveBeenCalledWith(
            expect.objectContaining({
                hash: '',
                pathname: '/',
                search: '',
            }),
            undefined,
            expect.anything(),
        );
    });
});
