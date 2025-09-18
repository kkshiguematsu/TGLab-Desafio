import useSWRMutation from 'swr/mutation';
import { cancelBetService } from '../services/betService';

export const useCancelBet = () => {
  const { trigger, isMutating } = useSWRMutation('/my-bet', cancelBetService);

  return {
    cancelBetTrigger: trigger,
    isCanceling: isMutating,
  };
};
