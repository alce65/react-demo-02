
import { Layout } from '../layout/layout';
import './app.css';

import { AppRouter } from '../router/router';

export const App: React.FC = () => {
    return (
        <div className="app">
            <Layout>
                <AppRouter />
            </Layout>
        </div>
    );
};
