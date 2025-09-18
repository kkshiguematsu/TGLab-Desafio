import { Box, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DrawerStyled = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 250,
    padding: theme.spacing(2),
  },
}));

export const BoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));
