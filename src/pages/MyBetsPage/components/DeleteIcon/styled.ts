import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material';
import { red } from '@mui/material/colors';

export const DeleteIconStyled = styled(DeleteIcon)(({ theme }) => ({
  color: red[500],
}));

export const BigDeleteIconStyled = styled(DeleteIcon)(({ theme }) => ({
  fontSize: 70,
  color: red[500],
  backgroundColor: red[200],
  padding: theme.spacing(1),
  borderRadius: theme.spacing(100),
}));
