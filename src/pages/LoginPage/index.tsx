import { Page } from '../../components/Page';
import heroImage from '../../../public/assets/hero_static.png';
import { GlassPaper } from '../../components/GlassPaper';
import { LoginForm } from './components/LoginForm';
import { Portal } from '@mui/material';
import { RegisterPopup } from './components/RegisterPopup';
import { useState } from 'react';

export const LoginPage = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  return (
    <Page backgroundImage={heroImage} alignItems="center" justifyContent="center">
      <GlassPaper>
        <LoginForm onOpenRegister={handleOpenRegister} />
      </GlassPaper>
      <Portal>
        <RegisterPopup open={isRegisterOpen} onClose={handleCloseRegister} />
      </Portal>
    </Page>
  );
};
