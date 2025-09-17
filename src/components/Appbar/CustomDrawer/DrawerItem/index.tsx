import { styled } from '@mui/material';

interface DrawerItemProps {
  text: string;
}

export const DrawerItemStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
}));

export const DrawerItem = ({ text }: DrawerItemProps) => {
  return <DrawerItemStyled>{text}</DrawerItemStyled>;
};
