import { Assets as AssetsLib } from 'react-native-ui-lib';

const icons = {
  calendar: require('@/assets/images/common/calendar.png'),
  check: require('@/assets/images/common/check.png'),
  error: require('@/assets/images/common/error.png'),
  eye: require('@/assets/images/common/eye.png'),
  hidden_eye: require('@/assets/images/common/hidden_eye.png'),
  no_internet: require('@/assets/images/common/no_internet.png'),
  close: require('@/assets/images/common/close.png'),
  chevron_left: require('@/assets/images/common/chevron_left.png'),
  chevron_down: require('@/assets/images/common/chevron_down.png'),
  logo: require('@/assets/images/common/logo.png'),
  search: require('@/assets/images/common/search.png'),
  arrow_back: require('@/assets/images/common/arrow_back.png'),
  arrow_right: require('@/assets/images/common/arrow_right.png')
};

const tabs = {
  home: require('@/assets/images/tabs/home.png'),
  home_fill: require('@/assets/images/tabs/home_fill.png'),
  watchlist: require('@/assets/images/tabs/watchlist.png'),
  watchlist_fill: require('@/assets/images/tabs/watchlist_fill.png')
};

const Assets = {
  icons,
  tabs
};

export type CustomAssetsProps = typeof Assets;

Object.entries(Assets).forEach(([key, value]) => {
  AssetsLib.loadAssetsGroup(key, value);
});
