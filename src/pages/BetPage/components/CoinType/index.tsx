import { useTranslation } from 'react-i18next';
import { DisplayTextStyled } from './styled';

export const CoinType = () => {
  const { t } = useTranslation();

  return <DisplayTextStyled>{t('coin.type')}</DisplayTextStyled>;
};
