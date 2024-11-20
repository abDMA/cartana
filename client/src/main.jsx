import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import RecoilProvider from './components/RecoilProvider.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <RecoilProvider>
    <App />
    </RecoilProvider>
    <Toaster/>
    </BrowserRouter>
  </StrictMode>,
)
