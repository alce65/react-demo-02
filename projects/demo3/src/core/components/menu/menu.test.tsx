import { render, screen } from '@testing-library/react';
import { Menu } from './menu';
import {
    unstable_HistoryRouter as Router,
    type HistoryRouterProps,
} from 'react-router';
import { createMemoryHistory } from 'history';

describe('Menu component', () => {
    const history = createMemoryHistory();

    it('should render the menu with links', () => {
        history.push('/test');
        history.push = vi.fn();
        render(
            <Router
                history={history as unknown as HistoryRouterProps['history']}
            >
                <Menu />
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
