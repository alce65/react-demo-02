import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppContextProvider } from '@core/context/provider.tsx'

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <AppContextProvider>
        <App />
    </AppContextProvider>
  </StrictMode>,
)
