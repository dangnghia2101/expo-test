export const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const API_URL_UPLOAD = 'https://api.com/api/v1';
export const SOCKET_IO = 'https://api.com/';
export const STALE_TIME = 30000;
export const TIMEOUT = 10000;

// TMDB API
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const TMDB_TOKEN = process.env.EXPO_PUBLIC_TMDB_TOKEN || '';

export const API = {
  ACTION: {
    LIST: '/1.0.7/user_action'
  },
  AUTH: {
    LOGIN: 'auth/login',
    SIGNUP: 'auth/register',
    VERIFY_OTP: 'auth/otp',
    VERIFY_FORGOT_PASSWORD_OTP: 'auth/verify_reset_token',
    RESEND_OTP: 'auth/resend_otp',
    FORGET_PASSWORD: 'auth/forget_password',
    RESET_PASSWORD: 'auth/reset_password',
    TAG_GROUPS: '/tag/groups',
    AGE_VERIFY: '/age_verify',
    DEVICE: '/device'
  },
  ME: {
    GET_ME: 'me',
    UPDATE_ME: 'me',
    DELETE_ACCOUNT: 'me/delete',
    CHANGE_PASSWORD: 'me/change_password',
    UNREAD: '/me/unread'
  },
  CONVERSATION: {
    LIST: '/conversation',
    CREATE: '/conversation',
    DELETE: 'conversation/:id/hide',
    DETAIL: '/conversation/:id',
    MESSAGES: '/conversation/:id/messages',
    SEND: '/conversation/:id',
    DELETE_MESSAGE: '/message/:id',
    CONCEIRGE: '/conversation/conceirge'
  },
  USER: {
    BLOCK: '/user/:id/block',
    UNBLOCK: '/user/:id/unblock',
    REPORT: '/user/:id/report',
    BLOCK_LIST: '/user_block',
    LIST: '/user',
    LIKE: '/user/:id/like',
    DETAIL: '/user/:id',
    LEAVE_FOOTPRINT: '/user/:id/footprint',
    UNLIKE: '/user/:id/unlike'
  },
  TWEET: {
    LIST: '/tweet',
    CREATE: '/tweet',
    LIKE: '/tweet/:id/like',
    UPDATE: '/1.0.7/community_tweet/:id',
    DELETE: '/tweet/:id',
    REPORT: '/tweet/:id/report',
    REPORT_COMMENT: '/tweet_comment/:id/report',
    DELETE_COMMENT: '/tweet_comment/:id'
  },
  COMMENT: {
    LIST: '/tweet/:id/comments',
    CREATE: '/tweet/:id/comments',
    COMMENT_DETAIL: '/tweet_comment/:id',
    LIKE: '/tweet_comment/:id/like',
    UNLIKE: '/tweet_comment/:id/unlike'
  },
  LOCATION: {
    LIST: '/location'
  },
  USER_AVATAR: {
    BLOCK_USER: '/user_avatar/:id/blocked',
    CREATE: '/user_avatar',
    DELETE_ALL: '/user_avatar/all',
    DELETE_SINGLE: '/user_avatar/:id',
    LIST: '/user_avatar',
    LIST_BLOCK: '/user_avatar/:id/blocked',
    SET_DEFAULT: '/user_avatar/:id/setDefault',
    UNBLOCK_USER: '/user_avatar/:id/blocked/:userId',
    UPDATE: '/user_avatar/:id'
  },
  NOTIFICATION: {
    LIST: '/notification',
    LIST_SETTING: '/notification_setting',
    DETAIL: '/notification/:id/read',
    DELETE: '/notification/:id/delete',
    DELETE_ALL: '/notification/delete_all',
    READ_NOTIFICATION: '/notification/:id/read'
  },
  STATIC_CONTENT: {
    PRIVACY_POLICY: '/static_content/privacy/html',
    TERMS_OF_SERVICE: '/static_content/terms/html',
    COMMERCIAL_TRANSACTIONS: '/static_content/about_us/html'
  },
  FAQ: {
    LIST: '/faq/all'
  },
  FOOTPRINT: {
    LIST: '/footprint',
    MINE: '/footprint/from_me'
  },
  MATCHED: {
    LIST: '/user_like/matched'
  },
  FAVORITE: {
    LIST: '/user_like',
    UNFAVORITE: '/user/:id/unfavorite'
  },
  IAP: {
    PACKAGE: '/package',
    SUBSCRIPTION: '/subscription'
  },
  MOVIE: {
    NOW_PLAYING: '/movie/now_playing',
    POPULAR: '/movie/popular',
    UPCOMING: '/movie/upcoming',
    DETAILS: '/movie/:id',
    CREDITS: '/movie/:id/credits',
    RECOMMENDATIONS: '/movie/:id/recommendations',
    SEARCH: '/search/movie'
  }
};
