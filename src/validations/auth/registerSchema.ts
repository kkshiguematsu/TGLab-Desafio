import * as yup from 'yup';
import type { TFunction } from 'i18next';

export const getRegisterSchema = (t: TFunction) => {
  return yup.object().shape({
    name: yup.string().required(t('validation.name_required')),
    email: yup
      .string()
      .email(t('validation.email_invalid'))
      .required(t('validation.email_required')),
    password: yup
      .string()
      .required(t('validation.password_required'))
      .min(6, t('validation.password_min', { min: 6 })),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('validation.confirm_password_match'))
      .required(t('validation.confirm_password_required')),
  });
};

export type RegisterFormData = yup.InferType<ReturnType<typeof getRegisterSchema>>;
