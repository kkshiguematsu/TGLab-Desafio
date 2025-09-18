import { DataGrid, GridActionsCellItem, type GridColDef } from '@mui/x-data-grid';
import { Box, Portal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { useMyBets } from '../../../../hooks/useMyBets';
import { formatInTimeZone } from 'date-fns-tz';
import { DeleteIconStyled } from '../DeleteIcon/styled';
import { CancelBetModal } from '../CancelBetModal';
import { TableListMyBetsFilters } from './TableListMyBetsFilters';
import { dateFormatter } from '../../../../utils/dateFormatter';

export const TableListMyBets = () => {
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [betIdToCancel, setBetIdToCancel] = useState<string | null>(null);

  const { t } = useTranslation();
  const {
    bets,
    totalBets,
    limit,
    isLoading,
    error,
    page,
    idFilter,
    statusFilter,
    setPage,
    handleIdFilterChange,
    handleStatusFilterChange,
  } = useMyBets();

  const onOpenCancelModal = (id: string) => {
    setBetIdToCancel(id);
    setOpenCancelModal(true);
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 300 },
      {
        field: 'createdAt',
        headerName: t('myBetsPage.tableColumns.date'),
        width: 150,
        valueFormatter: (value) => dateFormatter(value),
      },
      { field: 'amount', headerName: t('myBetsPage.tableColumns.value'), width: 90 },
      { field: 'status', headerName: t('myBetsPage.tableColumns.status'), width: 90 },
      { field: 'winAmount', headerName: t('myBetsPage.tableColumns.reward'), width: 90 },
      {
        field: 'actions',
        type: 'actions',
        headerName: t('myBetsPage.tableColumns.actions'),
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIconStyled />}
            label={t('myBetsPage.tableColumns.actionLabel')}
            onClick={() => onOpenCancelModal(params.id as string)}
          />,
        ],
      },
    ],
    [t],
  );

  // @TODO create loading skeletion
  // @TODO create empty list feedback
  // @TODO create error feedback

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', my: 4 }}>
      <TableListMyBetsFilters
        idFilter={idFilter}
        statusFilter={statusFilter}
        onIdChange={handleIdFilterChange}
        onStatusChange={handleStatusFilterChange}
      />
      <DataGrid
        rows={bets}
        columns={columns}
        loading={isLoading}
        paginationMode="server"
        rowCount={totalBets}
        pageSizeOptions={[limit]}
        paginationModel={{
          page: page - 1,
          pageSize: limit,
        }}
        onPaginationModelChange={(newModel) => {
          setPage(newModel.page + 1);
        }}
      />
      <Portal>
        <CancelBetModal
          open={openCancelModal}
          onClose={() => setOpenCancelModal(false)}
          betIdToCancel={betIdToCancel}
        />
      </Portal>
    </Box>
  );
};
