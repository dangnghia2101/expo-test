import { Assets as AssetsLib } from 'react-native-ui-lib';

const icons = {
  calendar: require('@/assets/images/common/calendar.png'),
  check: require('@/assets/images/common/check.png'),
  error: require('@/assets/images/common/error.png'),
  eye: require('@/assets/images/common/eye.png'),
  hidden_eye: require('@/assets/images/common/hidden_eye.png'),
  no_internet: require('@/assets/images/common/no_internet.png'),
  close: require('@/assets/images/common/close.png'),
  arrow_back: require('@/assets/images/common/arrow_back.png'),
  arrow_right: require('@/assets/images/common/arrow_right.png'),
  chevron_left: require('@/assets/images/common/chevron_left.png'),
  chevron_up: require('@/assets/images/common/chevron_up.png'),
  chevron_down: require('@/assets/images/common/chevron_down.png'),
  double_setting: require('@/assets/images/common/double_setting.png'),
  no_image: require('@/assets/images/common/no_image.png'),
  logo: require('@/assets/images/common/logo.png'),
  support: require('@/assets/images/common/support.png'),
  menu: require('@/assets/images/common/menu.png'),
  main_menu: require('@/assets/images/common/main_menu.png'),
  hamburger_menu: require('@/assets/images/common/hamburger_menu.png'),
  send: require('@/assets/images/common/send.png'),
  image: require('@/assets/images/common/image.png'),
  camera: require('@/assets/images/common/camera.png'),
  edit: require('@/assets/images/common/edit.png'),
  comment: require('@/assets/images/common/comment.png'),
  arrow_top: require('@/assets/images/common/arrow_top.png'),
  like: require('@/assets/images/common/like.png'),
  unlike: require('@/assets/images/common/unlike.png'),
  lock: require('@/assets/images/common/lock.png'),
  warning_triangular: require('@/assets/images/common/warning_triangular.png'),
  add: require('@/assets/images/common/add.png'),
  minus: require('@/assets/images/common/minus.png'),
  heart: require('@/assets/images/common/heart.png'),
  search: require('@/assets/images/common/search.png'),
  empty: require('@/assets/images/common/empty.png'),
  block: require('@/assets/images/common/block.png'),
  report: require('@/assets/images/common/report.png'),
  message: require('@/assets/images/tabs/message.png')
};

const auth = {
  welcome: require('@/assets/images/auth/welcome.png'),
  change_password_success: require('@/assets/images/auth/change_password_success.png')
};

const tabs = {
  home: require('@/assets/images/tabs/home.png'),
  home_fill: require('@/assets/images/tabs/home_fill.png'),
  message: require('@/assets/images/tabs/message.png'),
  message_fill: require('@/assets/images/tabs/message_fill.png'),
  tweet: require('@/assets/images/tabs/tweet.png'),
  tweet_fill: require('@/assets/images/tabs/tweet_fill.png'),
  profile: require('@/assets/images/tabs/profile.png'),
  profile_fill: require('@/assets/images/tabs/profile_fill.png')
};

const chat = {
  chat_empty: require('@/assets/images/chat/chat_empty.png')
};

const userVerify = {
  blurry_image: require('@/assets/images/userVerify/blurry_image.png'),
  cut_image: require('@/assets/images/userVerify/cut_image.png'),
  driver_card: require('@/assets/images/userVerify/driver_card.png'),
  frame_camera: require('@/assets/images/userVerify/frame_camera.png'),
  health_card: require('@/assets/images/userVerify/health_card.png'),
  hidden_image: require('@/assets/images/userVerify/hidden_image.png'),
  number_card: require('@/assets/images/userVerify/number_card.png'),
  passport_card: require('@/assets/images/userVerify/passport_card.png'),
  valid_image: require('@/assets/images/userVerify/valid_image.png'),
  eye_background: require('@/assets/images/userVerify/eye_background.png'),
  camera_background: require('@/assets/images/userVerify/camera_background.png'),
  below_verify: require('@/assets/images/userVerify/below_verify.png'),
  verify_success: require('@/assets/images/userVerify/verify_success.png')
};

const profile = {
  noti: require('@/assets/images/profile/noti.png'),
  check_circle: require('@/assets/images/profile/check_circle.png'),
  error: require('@/assets/images/profile/error.png'),
  crown: require('@/assets/images/profile/crown.png'),
  verify_banner: require('@/assets/images/profile/verify_banner.png'),
  favorite: require('@/assets/images/profile/favorite.png'),
  footprint: require('@/assets/images/profile/footprint.png'),
  tweet: require('@/assets/images/profile/tweet.png'),
  profile_editing: require('@/assets/images/profile/profile_editing.png'),
  your_friend: require('@/assets/images/profile/your_friend.png'),
  setting: require('@/assets/images/profile/setting.png'),
  add_image: require('@/assets/images/profile/add_image.png'),
  action: require('@/assets/images/profile/action.png')
};

const setting = {
  block_list: require('@/assets/images/setting/block_list.png'),
  change_password: require('@/assets/images/setting/change_password.png'),
  commercial_transactions: require('@/assets/images/setting/commercial_transactions.png'),
  faq: require('@/assets/images/setting/faq.png'),
  logout: require('@/assets/images/setting/logout.png'),
  notification: require('@/assets/images/setting/notification.png'),
  policy: require('@/assets/images/setting/policy.png'),
  terms_service: require('@/assets/images/setting/terms_service.png'),
  update: require('@/assets/images/setting/update.png'),
  withdrawal: require('@/assets/images/setting/withdrawal.png'),
  search: require('@/assets/images/setting/search.png')
};

const empty = {
  favorite_empty: require('@/assets/images/empty/favorite_empty.png'),
  footprint_empty: require('@/assets/images/empty/footprint_empty.png'),
  notification_empty: require('@/assets/images/empty/notification_empty.png')
};

const user = {
  celebrate: require('@/assets/images/user/celebrate.png')
};

const premium = {
  crown: require('@/assets/images/premium/crown.png'),
  membership: require('@/assets/images/premium/membership.png'),
  perk1: require('@/assets/images/premium/perk1.png'),
  perk2: require('@/assets/images/premium/perk2.png'),
  perk3: require('@/assets/images/premium/perk3.png')
};

const Assets = {
  icons,
  auth,
  tabs,
  chat,
  userVerify,
  profile,
  setting,
  user,
  empty,
  premium
};

export type CustomAssetsProps = typeof Assets;

Object.entries(Assets).forEach(([key, value]) => {
  AssetsLib.loadAssetsGroup(key, value);
});
