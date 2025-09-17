import { Modal } from '@mui/material';
import { RegisterForm } from '../RegisterForm';
import { ModalBoxStyled } from './styled';

interface RegisterPopupProps {
  open: boolean;
  onClose: () => void;
}

export const RegisterPopup = ({ open, onClose }: RegisterPopupProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBoxStyled>
        <RegisterForm />
      </ModalBoxStyled>
    </Modal>
  );
};
