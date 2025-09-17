import * as yup from 'yup';
import type { TFunction } from 'i18next';

export const getLoginSchema = (t: TFunction) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t('validation.email_invalid'))
      .required(t('validation.email_required')),
    password: yup.string().required(t('validation.password_required')),
  });
};

export type LoginFormData = yup.InferType<ReturnType<typeof getLoginSchema>>;
