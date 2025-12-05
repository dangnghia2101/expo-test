import i18n, { TOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export const LANGUAGE = {
  EN: 'en'
};

type LocaleSources = Record<
  string,
  {
    translation: typeof en;
  }
>;

const resources: LocaleSources = {
  [LANGUAGE.EN]: { translation: en }
};

const lng = LANGUAGE.EN;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng, // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

type Key = NestedKeyOf<typeof en> | NestedKeyOf<typeof en>[];

export const t = (
  ...args:
    | [key: Key | string | string[], options?: TOptions]
    | [key: Key, options: TOptions]
    | [key: Key, defaultValue: string, options?: TOptions]
) => i18n.t(...args);

export default i18n;
