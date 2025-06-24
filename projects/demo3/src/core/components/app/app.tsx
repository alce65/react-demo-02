
import { Layout } from '../layout/layout';
import './app.css';


export const App: React.FC = () => {
    
    return (
        <div className="app">
            <Layout>
                <p className="app-description">
                    This is a demo application showcasing the use of React Context for state management.
                </p>
            </Layout>
        </div>
    );
};
