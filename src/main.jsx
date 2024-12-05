import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Store } from './redux/Store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode store={Store}>
    <App />
  </StrictMode>,
)
