import { useState } from 'react';
import useSWR from 'swr';
import { myBetsService } from '../services/myBetsService';
import type { MyBetsResponseType } from '../types/myBets';

const LIMIT = 10;

export const useMyBets = () => {
  const [idFilter, setIdFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const params = new URLSearchParams({
    page: String(page),
    limit: String(LIMIT),
    id: idFilter,
    status: statusFilter,
  });

  const handleIdFilterChange = (id: string) => {
    setPage(1);
    setIdFilter(id);
  };

  const handleStatusFilterChange = (status: string) => {
    setPage(1);
    setStatusFilter(status);
  };

  const { data, error, isLoading } = useSWR<MyBetsResponseType>(
    `/my-bets?${params.toString()}`,
    myBetsService,
    {
      keepPreviousData: true,
    },
  );

  return {
    bets: data?.data ?? [],
    totalBets: data?.total ?? 0,
    currentPage: data?.page ?? page,
    limit: data?.limit ?? LIMIT,
    isLoading,
    error,
    page,
    idFilter,
    statusFilter,
    setPage,
    handleIdFilterChange,
    handleStatusFilterChange,
  };
};
