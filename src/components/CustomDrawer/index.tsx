import { Box, useTheme } from '@mui/material';
import { DrawerItem } from './DrawerItem';
import { BoxStyled, DrawerStyled } from './styled';
import { ThemeModeSelector } from './ThemeModeSelector';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../Appbar/LanguageSelect';
interface CustomDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export const CustomDrawer = ({ open, toggleDrawer }: CustomDrawerProps) => {
  const { logout } = useAuth();
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DrawerStyled open={open} onClose={toggleDrawer(false)}>
      <BoxStyled flexGrow={1}>
        {linkItens.map(({ label, navigate }, index) => (
          <DrawerItem key={index} text={label} navigate={navigate} />
        ))}
      </BoxStyled>
      <BoxStyled>
        <LanguageSelect />
        <ThemeModeSelector />
        <DrawerItem text={'Logout'} navigate={handleLogout} />
      </BoxStyled>
    </DrawerStyled>
  );
};
