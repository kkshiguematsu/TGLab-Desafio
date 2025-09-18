import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TableListMyTransactionsFiltersProps {
  idFilter: string;
  typeFilter: string;
  onIdChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export const TableListMyTransactionsFilters = ({
  idFilter,
  typeFilter,
  onIdChange,
  onTypeChange,
}: TableListMyTransactionsFiltersProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('myTransactionssPage.filter.filterId')}
            variant="outlined"
            size="small"
            value={idFilter}
            onChange={(e) => onIdChange(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl size="small" sx={{ minWidth: 200 }} fullWidth>
            <InputLabel>{t('myTransactionssPage.filter.filterType.label')}</InputLabel>
            <Select
              value={typeFilter}
              label="Filtrar por Situação"
              onChange={(e) => onTypeChange(e.target.value)}
            >
              <MenuItem value="">{t('myTransactionssPage.filter.filterType.allItem')}</MenuItem>
              <MenuItem value="bet">{t('myTransactionssPage.filter.filterType.betItem')}</MenuItem>
              <MenuItem value="win">{t('myTransactionssPage.filter.filterType.winItem')}</MenuItem>
              <MenuItem value="cancel">
                {t('myTransactionssPage.filter.filterType.cancelItem')}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
