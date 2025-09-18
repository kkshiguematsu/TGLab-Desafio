import type { MyBetsResponseType } from '../types/myBets';
import { api } from './api';

export const myBetsService = async (url: string): Promise<MyBetsResponseType> => {
  const response = await api.get(url);
  return response.data;
};
