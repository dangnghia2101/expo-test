import { Assets } from 'react-native-ui-lib';

import { Screens } from '../screens';
import { AUTH_FORM } from './auth';
import { BADGE_KEY } from './setting';

export const PROFILE_KEYS = {
  PROFILE_EDITING: 'profile_editing',
  YOUR_FRIEND: 'your_friend',
  TWEET: 'tweet',
  FOOTPRINT: 'footprint',
  FAVORITE: 'favorite',
  SETTING: 'setting',
  ACTION: 'action'
};

export interface ProfileSectionItemProps {
  keyId: string;
  name: string;
  screen?: string;
  params?: any;
  iconLeft?: any;
  iconRight?: any;
  badge?: string;
  hasBadge?: boolean;
}

export interface ProfileSectionProps {
  name: string;
  data: ProfileSectionItemProps[];
}

export const PROFILE_SECTIONS: ProfileSectionProps[] = [
  {
    name: 'profile_and_connections',
    data: [
      {
        keyId: PROFILE_KEYS.PROFILE_EDITING,
        name: 'profile.profile_editing',
        screen: Screens.EditProfile,
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.profile.profile_editing
      },
      {
        keyId: PROFILE_KEYS.YOUR_FRIEND,
        name: 'profile.your_friend',
        screen: Screens.Friends,
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.profile.your_friend
      }
    ]
  },
  {
    name: 'activity_and_follows',
    data: [
      {
        keyId: PROFILE_KEYS.ACTION,
        name: 'profile.action',
        screen: Screens.ActionList,
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.profile.action,
        badge: BADGE_KEY.UNREAD_ACTION
      },
      {
        keyId: PROFILE_KEYS.TWEET,
        name: 'profile.tweet',
        screen: Screens.MyTweet,
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.profile.tweet
      },
      {
        keyId: PROFILE_KEYS.FOOTPRINT,
        name: 'profile.footprint',
        screen: Screens.Footprint,
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.profile.footprint,
        badge: BADGE_KEY.FOOT_PRINT_UNREAD
      },
      {
        keyId: PROFILE_KEYS.FAVORITE,
        name: 'profile.favorite',
        screen: Screens.Favorite,
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.profile.favorite
      }
    ]
  },
  {
    name: 'setting_and_notification',
    data: [
      {
        keyId: PROFILE_KEYS.SETTING,
        name: 'profile.setting',
        screen: Screens.Setting,
        iconRight: Assets.icons.arrow_right,
        iconLeft: Assets.profile.setting
      }
    ]
  }
];

export const MAX_SUB_PHOTO = 3;

export const PROFILE_INFO = [
  {
    id: 1,
    name: 'onboarding.self_introduction',
    screen: Screens.EditIntroduction,
    key: AUTH_FORM.INTRODUCTION
  },
  {
    id: 2,
    name: 'edit_profile.basic_profile',
    screen: Screens.EditBasicInfo,
    data: [
      {
        key: AUTH_FORM.FULL_NAME,
        name: 'onboarding.name',
        placeholder: 'onboarding.name_placeholder'
      },
      {
        key: AUTH_FORM.GENDER,
        name: 'onboarding.sex',
        placeholder: 'common.please_select'
      },
      {
        key: AUTH_FORM.BIRTHDAY,
        name: 'onboarding.birthday',
        placeholder: 'onboarding.birthday_placeholder'
      },
      {
        key: AUTH_FORM.HEIGHT,
        name: 'onboarding.height',
        placeholder: 'onboarding.height_placeholder'
      },
      {
        key: AUTH_FORM.BODY_SHAPE,
        name: 'onboarding.body_type',
        keyLabel: 'title',
        placeholder: 'onboarding.not_selected'
      },
      {
        key: AUTH_FORM.LOCATION,
        name: 'onboarding.residence',
        keyLabel: 'name',
        placeholder: 'onboarding.tokyo'
      },
      {
        key: AUTH_FORM.OCCUPATION,
        name: 'onboarding.occupation',
        placeholder: 'onboarding.occupation_placeholder'
      }
    ]
  },
  {
    id: 3,
    name: 'onboarding.friends_profile',
    screen: Screens.EditTargetInfo,
    data: [
      {
        key: AUTH_FORM.TARGET_MIN_AGE,
        key2: AUTH_FORM.TARGET_MAX_AGE,
        name: 'onboarding.age',
        placeholder: 'onboarding.friend_age_placeholder'
      },
      {
        key: AUTH_FORM.TARGET_MIN_HEIGHT,
        key2: AUTH_FORM.TARGET_MAX_HEIGHT,
        name: 'onboarding.height',
        placeholder: 'onboarding.friend_height_placeholder'
      },
      {
        key: AUTH_FORM.TARGET_BODY_SHAPE,
        name: 'onboarding.body_type',
        keyLabel: 'title',
        placeholder: 'onboarding.not_selected'
      },
      {
        key: AUTH_FORM.TARGET_LOCATION,
        name: 'onboarding.residence',
        keyLabel: 'name',
        placeholder: 'onboarding.tokyo'
      },
      {
        key: AUTH_FORM.TARGET_OCCUPATION,
        name: 'onboarding.occupation',
        placeholder: 'onboarding.occupation_placeholder'
      }
    ]
  }
];
