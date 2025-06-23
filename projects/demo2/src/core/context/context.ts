import { createContext } from "react";

export type ThemeState = "dark" | "light";
export type LanguageState = "es" | "en";

export interface AppContext {
  theme: ThemeState;
  setTheme: React.Dispatch<React.SetStateAction<ThemeState>>;
  language: LanguageState;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageState>>;
}


export const AppContext = createContext<AppContext>({} as AppContext);

