import { useContext } from 'react';
import { AppContext } from '@core/context/context';

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
                <p>Aquí irá el menú</p>
            </nav>
        </header>
    );
};
