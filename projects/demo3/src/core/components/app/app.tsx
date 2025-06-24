// import { Layout } from '../layout/layout';
import { AppContext } from '@context/context';
import './app.css';
import { use } from 'react';

export const App: React.FC = () => {
    const { title } = use(AppContext);

    return (
        <div className="app">
            <h1>{title}</h1>
        </div>
    );
};
