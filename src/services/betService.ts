import type { BetResponseType, BetType } from '../types/bet';
import { api } from './api';

export const betService = async (url: string, { arg }: { arg: BetType }) => {
  const response = await api.post<BetResponseType>(url, arg);
  return response.data;
};
