import { styled } from '@mui/material';

export const DisplayTextStyled = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  borderRadius: 10,
  padding: theme.spacing(2),
}));
