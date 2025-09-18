import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FiltersProps {
  idFilter: string;
  statusFilter: string;
  onIdChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const TableListMyBetsFilters = ({
  idFilter,
  statusFilter,
  onIdChange,
  onStatusChange,
}: FiltersProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('myBetsPage.filter.filterId')}
            variant="outlined"
            size="small"
            value={idFilter}
            onChange={(e) => onIdChange(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl size="small" sx={{ minWidth: 200 }} fullWidth>
            <InputLabel>{t('myBetsPage.filter.filterStatus.label')}</InputLabel>
            <Select
              value={statusFilter}
              label="Filtrar por Situação"
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <MenuItem value="">{t('myBetsPage.filter.filterStatus.allItem')}</MenuItem>
              <MenuItem value="win">{t('myBetsPage.filter.filterStatus.winItem')}</MenuItem>
              <MenuItem value="lost">{t('myBetsPage.filter.filterStatus.lostItem')}</MenuItem>
              <MenuItem value="canceled">
                {t('myBetsPage.filter.filterStatus.canceledItem')}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
