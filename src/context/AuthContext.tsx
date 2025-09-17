import { createContext, useContext, useEffect, useState } from 'react';
import type { LoginCredentialsType, RegisterCredentialsType } from '../types/auth';
import { loginService, registerService } from '../services/authService';

import { setBalance } from '../store/user/userBalance';
import type { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

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
      const response = await loginService(credentials);
      const token = response.accessToken;

      dispatch(setBalance(response.balance));
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
      await registerService(credentials);
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

  return (
    <AuthContext.Provider
      value={{ user: token, login, logout, register, isLoading, error, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
