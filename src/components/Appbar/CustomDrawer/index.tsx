import { Box, useTheme } from '@mui/material';
import { DrawerItem } from './DrawerItem';
import { DrawerStyled } from './styled';
import { ThemeModeSelector } from './ThemeModeSelector';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface CustomDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export const CustomDrawer = ({ open, toggleDrawer }: CustomDrawerProps) => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const linkItens = [
    {
      label: t('drawerItem.drawerBet'),
      navigate: () => navigate('/bet'),
    },
    {
      label: t('drawerItem.drawerMyBets'),
      navigate: () => navigate('/my-bets'),
    },
    {
      label: t('drawerItem.drawerTransactions'),
      navigate: () => navigate('/my-transactions'),
    },
  ];

  return (
    <DrawerStyled open={open} onClose={toggleDrawer(false)}>
      <Box display={'flex'} flexDirection={'column'} gap={2} flexGrow={1}>
        {linkItens.map(({ label, navigate }) => (
          <DrawerItem text={label} navigate={navigate} />
        ))}
      </Box>
      <ThemeModeSelector />
    </DrawerStyled>
  );
};
