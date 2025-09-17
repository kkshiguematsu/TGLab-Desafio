import { styled } from '@mui/material';

export const ModalBoxStyled = styled('div')(({ theme }) => ({
  width: '90%',
  maxWidth: '500px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));
