import { createContext } from "react";

type ThemeState = "dark" | "light";
type LanguageState = "es" | "en";

interface AppContext {
  theme: ThemeState;
  setTheme: React.Dispatch<React.SetStateAction<ThemeState>>;
  language: LanguageState;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageState>>;
}


export const AppContext = createContext<AppContext>({} as AppContext);
