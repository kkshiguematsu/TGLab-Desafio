import { styled } from '@mui/material';

export const DrawerItemStyled = styled('div')(({ theme }) => ({
  height: 50,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',

  transition: theme.transitions.create('background-color', {
    duration: '0.3s',
  }),

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));
