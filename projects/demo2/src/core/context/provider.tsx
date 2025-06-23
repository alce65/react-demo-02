import { useState, type PropsWithChildren } from 'react';
import { AppContext, type LanguageState, type ThemeState } from './context';

export const AppContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [theme, setTheme] = useState<ThemeState>('light');
    const [language, setLanguage] = useState<LanguageState>('en');

    const context: AppContext = {
        theme,
        setTheme,
        language,
        setLanguage,
    };

    // Hasta React 19

    // return <AppContext.Provider value={context}>{
    //     children
    // }</AppContext.Provider>;

    // Desde React 19

    return <AppContext value={context}>{children}</AppContext>;
};
