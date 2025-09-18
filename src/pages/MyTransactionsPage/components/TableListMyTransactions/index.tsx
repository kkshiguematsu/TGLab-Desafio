import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { dateFormatter } from '../../../../utils/dateFormatter';
import { useMyTransactions } from '../../../../hooks/useMyTransactions';
import { TableListMyTransactionsFilters } from '../TableListMyTransactionsFilters';

export const TableListMyTransactions = () => {
  const { t } = useTranslation();
  const {
    transactions,
    totalTransactions,
    currentPage,
    limit,
    isLoading,
    error,
    page,
    idFilter,
    typeFilter,
    setPage,
    handleIdFilterChange,
    handleTypeFilterChange,
  } = useMyTransactions();

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 300 },
      {
        field: 'createdAt',
        headerName: t('myTransactionssPage.tableColumns.date'),
        width: 150,
        valueFormatter: (value) => dateFormatter(value),
      },
      { field: 'amount', headerName: t('myTransactionssPage.tableColumns.value'), width: 90 },
      { field: 'type', headerName: t('myTransactionssPage.tableColumns.type'), width: 90 },
    ],
    [t],
  );

  // @TODO create loading skeletion
  // @TODO create empty list feedback
  // @TODO create error feedback

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', my: 4 }}>
      <TableListMyTransactionsFilters
        idFilter={idFilter}
        typeFilter={typeFilter}
        onIdChange={handleIdFilterChange}
        onTypeChange={handleTypeFilterChange}
      />
      <DataGrid
        rows={transactions}
        columns={columns}
        loading={isLoading}
        paginationMode="server"
        rowCount={totalTransactions}
        pageSizeOptions={[limit]}
        paginationModel={{
          page: page - 1,
          pageSize: limit,
        }}
        onPaginationModelChange={(newModel) => {
          setPage(newModel.page + 1);
        }}
      />
    </Box>
  );
};
