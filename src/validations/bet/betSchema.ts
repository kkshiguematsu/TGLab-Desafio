import * as yup from 'yup';
import type { TFunction } from 'i18next';

export const getBetSchema = (t: TFunction) => {
  return yup.object().shape({
    amount: yup
      .number()
      .required(t('validation.bet_required'))
      .min(1, t('validation.bet_min'))
      .positive(t('validation.bet_positive'))
      .typeError(t('validation.bet_required')),
  });
};

export type LoginFormData = yup.InferType<ReturnType<typeof getBetSchema>>;
