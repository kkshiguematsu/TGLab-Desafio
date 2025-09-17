import type { LoginCredentialsType, RegisterCredentialsType } from '../types/auth';
import { api } from './api';

export const register = async (credentials: RegisterCredentialsType) => {
  const response = await api.post('/auth/register', credentials);
  return response.data;
};

export const login = async (credentials: LoginCredentialsType) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};
