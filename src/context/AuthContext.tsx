import { createContext, useContext, useEffect, useState } from 'react';
import type { LoginCredentialsType, RegisterCredentialsType } from '../types/auth';
import { api } from '../services/api';

interface AuthContextType {
  user: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentialsType) => Promise<void>;
  register: (credentials: RegisterCredentialsType) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (credentials: LoginCredentialsType) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('authToken', token);
    } catch (error) {
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentialsType) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', credentials);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('authToken', token);
    } catch (error) {
      setError('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = token !== null;

  return <AuthContext.Provider value={{ user: token, login, logout, register, isLoading, error, isAuthenticated }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
