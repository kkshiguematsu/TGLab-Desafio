import { styled } from '@mui/material';
import { Typography } from '@mui/material';

export const TitleHeaderStyled = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  textShadow: `3px 3px 1px ${theme.palette.primary.main}`,
}));
