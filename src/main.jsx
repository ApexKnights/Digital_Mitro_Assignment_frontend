import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ContextProvider } from './context/UserContext.jsx'


export const server = "https://digital-mitro-assignment-backend.onrender.com/api/v1"

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ContextProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </ContextProvider>
  </HashRouter>
)
