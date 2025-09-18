import { Button, Grid, Modal, Portal, Snackbar, Typography } from '@mui/material';
import { ModalBoxStyled } from '../../../LoginPage/components/RegisterPopup/styled';
import { useTranslation } from 'react-i18next';
import { BigDeleteIconStyled } from '../DeleteIcon/styled';
import { useCancelBet } from '../../../../hooks/useCancelBet';
import { mutate } from 'swr';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../store/store';
import { setBalance } from '../../../../store/user/userBalance';

interface CancelBetModalProps {
  open: boolean;
  betIdToCancel: string | null;
  onClose: () => void;
}

export const CancelBetModal = ({ open, betIdToCancel, onClose }: CancelBetModalProps) => {
  const { t } = useTranslation();
  const { cancelBetTrigger, isCanceling } = useCancelBet();
  const dispatch = useDispatch<AppDispatch>();

  const handleCancelBet = async () => {
    if (!betIdToCancel) return;

    try {
      const response = await cancelBetTrigger({ id: betIdToCancel });

      onClose();

      dispatch(setBalance(response.balance));

      mutate((key) => typeof key === 'string' && key.startsWith('/my-bets'));
      mutate('/my-transactions');
    } catch (error: any) {
      console.error(`Erro ao cancelar aposta: ${error.message}`);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBoxStyled>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h5" align="center">
              {t('myBetsPage.cancelModal.title')}
            </Typography>
          </Grid>
          <Grid display={'flex'} justifyContent={'center'} size={12}>
            <BigDeleteIconStyled />
          </Grid>
          <Grid size={12}>
            <Typography align="center" variant="body1">
              {t('myBetsPage.cancelModal.body')}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button fullWidth variant="outlined" onClick={onClose}>
              {t('myBetsPage.cancelModal.backButton')}
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              color={'error'}
              fullWidth
              variant="contained"
              onClick={handleCancelBet}
              loading={isCanceling}
            >
              {t('myBetsPage.cancelModal.cancelButton')}
            </Button>
          </Grid>
        </Grid>
      </ModalBoxStyled>
    </Modal>
  );
};
