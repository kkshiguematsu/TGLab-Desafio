import { Box, styled } from '@mui/material';

export const BalanceDisplayStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderColor: theme.palette.text.primary,
  borderRadius: theme.spacing(1),
}));
