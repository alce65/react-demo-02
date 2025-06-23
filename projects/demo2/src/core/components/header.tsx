import { useContext } from 'react';
import { AppContext } from '../context/context';

export const Header: React.FC = () => {
    const { language, setLanguage } = useContext(AppContext);

    const handleClick: React.MouseEventHandler = () => {
        // Aquí podrías cambiar el idioma, por ejemplo:
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    return (
        <header>
            <h1>
                Demo 2 en <button onClick={handleClick}>{language}</button>
            </h1>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/users">Users</a>
                    </li>
                    <li>
                        <a href="/settings">Settings</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
