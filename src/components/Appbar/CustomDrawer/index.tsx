import { Box, useTheme } from '@mui/material';
import { DrawerItem } from './DrawerItem';
import { DrawerStyled } from './styled';
import { ThemeModeSelector } from './ThemeModeSelector';
import { useAuth } from '../../../context/AuthContext';
interface CustomDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export const CustomDrawer = ({ open, toggleDrawer }: CustomDrawerProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <DrawerStyled open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ flexGrow: 1 }}>
        <DrawerItem text="Item 1" />
      </Box>
      <ThemeModeSelector />
    </DrawerStyled>
  );
};
