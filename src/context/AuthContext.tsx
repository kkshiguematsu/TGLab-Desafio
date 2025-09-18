import { createContext, useContext, useEffect, useState } from 'react';
import type { LoginCredentialsType, RegisterCredentialsType } from '../types/auth';
import { loginService, registerService } from '../services/authService';

import { setBalance } from '../store/user/userBalance';
import type { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import type { WebSocketBalanceUpdateType } from '../types/websocket';

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

  const createWebSocketConnection = (token: string) => {
    console.log(`Creating webSocket connection with ${token}`);

    const ws = new WebSocket('ws://localhost:9999');

    ws.onopen = () => {
      const authMessageWebSocket = { type: 'auth', token: token };
      console.log(authMessageWebSocket);

      ws.send(JSON.stringify(authMessageWebSocket));
    };

    ws.onmessage = (event) => {
      const data: WebSocketBalanceUpdateType = JSON.parse(event.data);
      console.log('Novo saldo recebido:', data);
      if (data.type === 'balance_update') {
        console.log('Novo saldo recebido:', data.payload.balance);

        dispatch(setBalance(data.payload.balance));
      }
    };
  };

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

      // dispatch(setBalance(response.balance));
      setToken(token);
      createWebSocketConnection(token);

      localStorage.setItem('authToken', token);
    } catch (error: any) {
      setError(error.response.data.message);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentialsType) => {
    setIsLoading(true);
    setError(null);
    try {
      await registerService(credentials);
    } catch (error: any) {
      setError('Registration failed');
      throw new Error(error);
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
