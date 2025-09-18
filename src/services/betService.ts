import type { BetResponseType, BetType, CancelBetResponseType, CancelBetType } from '../types/bet';
import { api } from './api';

export const betService = async (
  url: string,
  { arg }: { arg: BetType },
): Promise<BetResponseType> => {
  const response = await api.post(url, arg);
  return response.data;
};

export const cancelBetService = async (
  url: string,
  { arg }: { arg: CancelBetType },
): Promise<CancelBetResponseType> => {
  const response = await api.delete(`${url}/${arg.id}`);
  return response.data;
};
