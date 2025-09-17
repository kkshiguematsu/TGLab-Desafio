import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './Router';
import { AuthProvider } from './context/AuthContext';
import { CustomAppBar } from './components/Appbar';
import { ThemeProvider } from './context/ThemeContext';

import './locales/i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CustomAppBar />
        <Router />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
