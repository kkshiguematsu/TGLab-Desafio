export type MyTransactionsType = {
  id: string;
  amount: number;
  type: string;
  createdAt: string;
};

export type MyTransactionsResponseType = {
  data: MyTransactionsType[];
  total: number;
  page: number;
  limit: number;
};
