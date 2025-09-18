import { useSelector } from 'react-redux';
import { selectBalance } from '../../store/user/userBalance';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { BalanceDisplayStyled } from './styled';

export const BalanceDisplay = () => {
  const { t } = useTranslation();

  const balance = useSelector(selectBalance);

  return (
    <BalanceDisplayStyled>
      <Typography variant="body1" color="inherit">{`${t('coin.type')} `}</Typography>
      <Typography variant="body1" color="inherit" fontWeight={'bold'}>
        {` ${t('coin.typeFormatter')} ${balance}`}
      </Typography>
    </BalanceDisplayStyled>
  );
};
