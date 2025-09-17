import type {
  AuthResponseType,
  LoginCredentialsType,
  RegisterCredentialsType,
  RegisterResponseType,
} from '../types/auth';
import { api } from './api';

export const registerService = async (credentials: RegisterCredentialsType) => {
  const response = await api.post<RegisterResponseType>('/register', credentials);
  return response.data;
};

export const loginService = async (credentials: LoginCredentialsType) => {
  const response = await api.post<AuthResponseType>('/login', credentials);
  return response.data;
};
