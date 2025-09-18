import type { MyTransactionsResponseType } from '../types/myTransactions';
import { api } from './api';

export const myTransactionsService = async (url: string): Promise<MyTransactionsResponseType> => {
  const response = await api.get(url);
  return response.data;
};
