import * as yup from 'yup';

import { t } from 'lang';

import * as yupLocaleJA from './yupJA';

yup.setLocale({
  ...yupLocaleJA.suggestive,
  mixed: {
    ...yupLocaleJA.suggestive.mixed,
    required: t('code_error.required')
  }
});
