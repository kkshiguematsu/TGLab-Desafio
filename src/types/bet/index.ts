export type BetType = {
  amount: number;
};

export type BetResponseType = {
  transactionId: string;
  currency: string;
  balance: number;
  winAmount: number;
};

export type CancelBetType = {
  id: string;
};

export type CancelBetResponseType = {
  transactionId: string;
  balance: number;
  currency: string;
};
