import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import App from './App.jsx';
import { ToastProvider } from './components/ToastComponent/index.jsx';


createRoot(document.getElementById('root')).render(
  <ToastProvider>
    <App />
  </ToastProvider>,
);
