import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createContext, useContext, useMemo, useState } from 'react';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('themeMode');
    return saved === 'dark' || saved === 'light' ? saved : 'light';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const nextMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', nextMode);
      return nextMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#24A69C', contrastText: '#fff' },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#272727',
            paper: mode === 'light' ? '#fff' : '#333333',
            // 383838: '#383838',
            // 242424: '#242424',
            // 1E1E1E: '#1E1E1E',
          },
        },
        shape: {
          borderRadius: 8,
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
