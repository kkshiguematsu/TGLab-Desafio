export type MyBetType = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  winAmount: number | null;
};

export type MyBetsResponseType = {
  data: MyBetType[];
  total: number;
  page: number;
  limit: number;
};
