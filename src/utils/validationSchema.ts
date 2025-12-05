import dayjs from 'dayjs';
import * as yup from 'yup';

import {
  AUTH_FORM,
  DELETE_ACCOUNT_FORM,
  JP_PHONE_REGEX,
  MIN_AGE,
  MIN_LEN_PASSWORD,
  MIN_TARGET_AGE,
  RESET_PASSWORD_FORM
} from '@/configs/constants';
import { t } from '@/lang';

export const emptySchema = yup.object();

export const signinSchema = yup.object().shape({
  [AUTH_FORM.PHONE]: yup
    .string()
    .trim()
    .matches(JP_PHONE_REGEX, t('code_error.phone_error'))
    .required()
    .label(t('auth.phone')),
  [AUTH_FORM.PASSWORD]: yup
    .string()
    .trim()
    .required()
    .min(MIN_LEN_PASSWORD, t('code_error.please_enter_password_with_8'))
    .label(t('auth.password_placeholder'))
});

export const forgotPasswordSchema = yup.object().shape({
  [AUTH_FORM.PHONE]: yup
    .string()
    .trim()
    .matches(JP_PHONE_REGEX, t('code_error.phone_error'))
    .required()
    .label(t('auth.phone'))
});

export const resetPasswordSchema = yup.object().shape({
  [RESET_PASSWORD_FORM.NEW_PASSWORD]: yup
    .string()
    .trim()
    .required()
    .min(MIN_LEN_PASSWORD, t('code_error.please_enter_password_with_8'))
    .label(t('change_password.new_password')),
  [RESET_PASSWORD_FORM.CONFIRM_PASSWORD]: yup
    .string()
    .trim()
    .required()
    .min(MIN_LEN_PASSWORD, t('code_error.please_enter_password_with_8'))
    .oneOf(
      [yup.ref(RESET_PASSWORD_FORM.NEW_PASSWORD)],
      t('change_password.password_do_not_match')
    )
    .label(t('change_password.confirm_password'))
});

export const signupSchema = yup.object().shape({
  [AUTH_FORM.PHONE]: yup
    .string()
    .trim()
    .matches(JP_PHONE_REGEX, t('code_error.phone_error'))
    .required()
    .label(t('auth.phone')),
  [AUTH_FORM.PASSWORD]: yup
    .string()
    .trim()
    .required()
    .min(MIN_LEN_PASSWORD, t('code_error.please_enter_password_with_8'))
    .label(t('auth.password_placeholder')),
  [AUTH_FORM.CONFIRM_PASSWORD]: yup
    .string()
    .trim()
    .required()
    .min(MIN_LEN_PASSWORD, t('code_error.please_enter_password_with_8'))
    .oneOf(
      [yup.ref(AUTH_FORM.PASSWORD)],
      t('change_password.password_do_not_match')
    )
    .label(t('change_password.confirm_password')),
  [AUTH_FORM.AGREE]: yup.boolean().required().oneOf([true])
});

export const onboardingSchema = yup.object().shape({
  [AUTH_FORM.FULL_NAME]: yup.string().required().label(t('onboarding.name')),
  [AUTH_FORM.BIRTHDAY]: yup
    .date()
    .required()
    .label(t('auth.birthday'))
    .max(dayjs().subtract(MIN_AGE, 'year').endOf('day').toDate()),
  [AUTH_FORM.TARGET_MIN_AGE]: yup
    .number()
    .nullable()
    .min(MIN_TARGET_AGE)
    .label(t('onboarding.age'))
});

export const userVerifySchema = yup.object().shape({
  [AUTH_FORM.PASSPORT]: yup.object().shape({
    uri: yup.string().required()
  }),
  [AUTH_FORM.BIRTHDAY]: yup
    .date()
    .required()
    .label(t('onboarding.birthday'))
    .max(dayjs().subtract(MIN_AGE, 'year').toDate())
});

export const editIntroductionSchema = yup.object().shape({
  [AUTH_FORM.INTRODUCTION]: yup
    .string()
    .label(t('onboarding.self_introduction'))
});

export const deleteSchema = () =>
  yup.object().shape({
    [DELETE_ACCOUNT_FORM.REASON]: yup
      .string()
      .required()
      .trim()
      .label(t('delete.reason'))
  });

export const deleteConfirmSchema = () =>
  yup.object().shape({
    [AUTH_FORM.PASSWORD]: yup
      .string()
      .required()
      .min(MIN_LEN_PASSWORD, t('code_error.please_enter_password_with_8'))
      .label(t('change_password.current_password'))
  });

export const changePasswordSchema = yup.object().shape({
  [AUTH_FORM.OLD_PASSWORD]: yup
    .string()
    .required()
    .min(MIN_LEN_PASSWORD)
    .label(t('change_password.current_password')),
  [AUTH_FORM.NEW_PASSWORD]: yup
    .string()
    .required()
    .min(MIN_LEN_PASSWORD)
    .label(t('change_password.new_password')),
  [AUTH_FORM.CONFIRM_PASSWORD]: yup
    .string()
    .required()
    .min(MIN_LEN_PASSWORD)
    .oneOf(
      [yup.ref(AUTH_FORM.NEW_PASSWORD), null],
      t('change_password.password_do_not_match')
    )
    .label(t('change_password.confirm_password'))
});

export const editTargetInfoSchema = yup.object().shape({
  [AUTH_FORM.TARGET_MIN_AGE]: yup
    .number()
    .nullable()
    .min(MIN_TARGET_AGE)
    .label(t('onboarding.age'))
});
