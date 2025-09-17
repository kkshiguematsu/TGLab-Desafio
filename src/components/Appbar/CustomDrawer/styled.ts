import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DrawerStyled = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 200,
    padding: theme.spacing(2),
  },
}));
