import * as yup from 'yup';
import type { TFunction } from 'i18next';
import { validationBalanceToBet } from '../../utils/validationBalanceToBet';

export const getBetSchema = (t: TFunction) => {
  return yup.object().shape({
    amount: yup
      .number()
      .required(t('validation.bet_required'))
      .min(1, t('validation.bet_min'))
      .positive(t('validation.bet_positive'))
      .test('is-sufficient-balance', t('validation.bet_insufficient_balance'), (amount, context) =>
        validationBalanceToBet(amount, context),
      )
      .typeError(t('validation.bet_required')),
  });
};

export type LoginFormData = yup.InferType<ReturnType<typeof getBetSchema>>;
