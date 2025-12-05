import { Assets } from 'react-native-ui-lib';

import { t } from '@/lang';

import { Screens } from '../screens';
import { ProfileSectionProps } from './profile';
import { API } from '../api';

export const SETTING_KEYS = {
  NOTIFICATION: 'notification',
  CHANGE_PASSWORD: 'change_password',
  PRIVACY_POLICY: 'privacy_policy',
  TERMS_OF_SERVICE: 'terms_of_service',
  COMMERCIAL_TRANSACTIONS: 'commercial_transactions',
  FAQ: 'faq',
  BLOCK_LIST: 'block_list',
  WITHDRAWAL: 'withdrawal',
  UPDATE: 'update',
  LOGOUT: 'logout'
};

export const SETTING_SECTIONS: ProfileSectionProps[] = [
  {
    name: 'setting.account_settings_security',
    data: [
      {
        screen: Screens.NotificationSettings,
        keyId: SETTING_KEYS.NOTIFICATION,
        name: 'setting.notify_settings',
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.setting.notification
      },
      {
        screen: Screens.ChangePassword,
        keyId: SETTING_KEYS.CHANGE_PASSWORD,
        name: 'setting.change_password',
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.setting.change_password
      }
    ]
  },
  {
    name: 'setting.policies_terms_of_use',
    data: [
      {
        keyId: SETTING_KEYS.PRIVACY_POLICY,
        name: 'setting.privacy_policy',
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.setting.policy,
        screen: Screens.WebView,
        params: {
          url: API.STATIC_CONTENT.PRIVACY_POLICY,
          title: t('setting.privacy_policy')
        }
      },
      {
        keyId: SETTING_KEYS.TERMS_OF_SERVICE,
        name: 'setting.terms_of_service',
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.setting.terms_service,
        screen: Screens.WebView,
        params: {
          url: API.STATIC_CONTENT.TERMS_OF_SERVICE,
          title: t('setting.terms_of_service')
        }
      },
      {
        keyId: SETTING_KEYS.COMMERCIAL_TRANSACTIONS,
        name: 'setting.commercial_traffic_law',
        iconLeft: Assets.setting.commercial_transactions,
        screen: Screens.WebView,
        params: {
          url: API.STATIC_CONTENT.COMMERCIAL_TRANSACTIONS,
          title: t('setting.commercial_traffic_law')
        }
      }
    ]
  },
  {
    name: 'setting.support_updates',
    data: [
      {
        keyId: SETTING_KEYS.FAQ,
        name: 'setting.faq',
        iconLeft: Assets.setting.faq,
        screen: Screens.FAQ
      }
      // {
      //   keyId: SETTING_KEYS.UPDATE,
      //   name: 'setting.check_for_update',
      //   iconLeft: Assets.setting.update
      // }
    ]
  },
  {
    name: 'setting.account_management',
    data: [
      {
        keyId: SETTING_KEYS.BLOCK_LIST,
        name: 'setting.block_list',
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.setting.block_list,
        screen: Screens.BlockList
      },
      {
        keyId: SETTING_KEYS.WITHDRAWAL,
        name: 'setting.withdrawal',
        screen: Screens.DeleteAccount,
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.setting.withdrawal
      },
      {
        keyId: SETTING_KEYS.LOGOUT,
        name: 'setting.logout',
        iconLeft: Assets.setting.logout
      }
    ]
  }
];

export const DELETE_ACCOUNT_REASON_OPTIONS = () => [
  { name: t('delete.reasons.0') },
  { name: t('delete.reasons.1') },
  { name: t('delete.reasons.2') },
  { name: t('delete.reasons.3') },
  { name: t('delete.reasons.4') },
  { name: t('delete.reasons.5') }
];

export const FOOTPRINT_TAB = {
  OTHER: 'other',
  MINE: 'mine'
};

export const BADGE_KEY = {
  FOOT_PRINT_UNREAD: 'footPrintUnread',
  NOTI_UNREAD: 'notiUnread',
  UNREAD_ACTION: 'unreadAction'
};
