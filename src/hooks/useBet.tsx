import useSWRMutation from 'swr/mutation';
import { betService } from '../services/betService';
import { useTranslation } from 'react-i18next';
import type { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { setBalance } from '../store/user/userBalance';

export const useBet = () => {
  const { trigger, isMutating, error } = useSWRMutation('/bet', betService);

  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const betTrigger = async (amount: number) => {
    const response = await trigger({ amount: amount });

    if (response && response.winAmount > 0) {
      alert(`${t('betPage.betWinLabel')} ${t('coin.type')} ${response.winAmount.toFixed(2)}`);
    }

    dispatch(setBalance(response.balance));
  };

  return {
    betTrigger: betTrigger,
    isMutating: isMutating,
    error: error,
  };
};
