import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './pwa';
import { AuthProvider } from './context/AuthContext';
import { OSProvider } from './context/OSContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <OSProvider>
        <App />
      </OSProvider>
    </AuthProvider>
  </StrictMode>,
);
