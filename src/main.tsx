import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './pwa';
import { AuthProvider } from './context/AuthContext';
import { OSProvider } from './context/OSContext';
import { RoleProvider } from './context/RoleContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <OSProvider>
        <RoleProvider>
          <App />
        </RoleProvider>
      </OSProvider>
    </AuthProvider>
  </StrictMode>,
);
