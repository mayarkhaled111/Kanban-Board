import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer} from 'react-toastify';
import App from './App.tsx'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />
    <App />
  </StrictMode>,
)
