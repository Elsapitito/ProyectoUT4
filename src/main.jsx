import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NavBar } from '../Components/NavBar.jsx'
import { LoginProvider } from '../context/LoginProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClaroOscuroProvider } from '../context/ClaroOscuroProvider.jsx'


createRoot(document.getElementById('root')).render(
  <ClaroOscuroProvider>
    <LoginProvider>
      <BrowserRouter>
        <StrictMode>
          <NavBar/>
            <App /> 
        </StrictMode>
      </BrowserRouter>
    </LoginProvider>
  </ClaroOscuroProvider>,
)
