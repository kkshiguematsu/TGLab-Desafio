import { useState } from 'react';
import useSWR from 'swr';
import { myTransactionsService } from '../services/myTransactions';
import type { MyTransactionsResponseType } from '../types/myTransactions';

const LIMIT = 10;

export const useMyTransactions = () => {
  const [idFilter, setIdFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);

  const params = new URLSearchParams({
    page: String(page),
    limit: String(LIMIT),
    id: idFilter,
    type: typeFilter,
  });

  const handleIdFilterChange = (id: string) => {
    setPage(1);
    setIdFilter(id);
  };

  const handleTypeFilterChange = (type: string) => {
    setPage(1);
    setTypeFilter(type);
  };

  const { data, error, isLoading } = useSWR<MyTransactionsResponseType>(
    `/my-transactions?${params.toString()}`,
    myTransactionsService,
    {
      keepPreviousData: true,
    },
  );

  return {
    transactions: data?.data ?? [],
    totalTransactions: data?.total ?? 0,
    currentPage: data?.page ?? page,
    limit: data?.limit ?? LIMIT,
    isLoading,
    error,
    page,
    idFilter,
    typeFilter,
    setPage,
    handleIdFilterChange,
    handleTypeFilterChange,
  };
};
