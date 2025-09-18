import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './Router';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './locales/i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <Toaster position="top-right" />
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
