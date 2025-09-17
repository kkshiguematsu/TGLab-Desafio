import { AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  position: 'static',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  width: '100%',
}));
