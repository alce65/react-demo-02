
import { Outlet } from 'react-router';
import { Layout } from '../layout/layout';
import './app.css';




export const App: React.FC = () => {
    return (
        <div className="app">
            <Layout>
                <Outlet />
            </Layout>
        </div>
    );
};
