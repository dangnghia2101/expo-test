export const AUTH_FORM = {
  PHONE: 'phone',
  PASSWORD: 'password',
  OLD_PASSWORD: 'oldPassword',
  NEW_PASSWORD: 'newPassword',
  CONFIRM_PASSWORD: 'confirmPassword',
  AGREE: 'agree',
  FULL_NAME: 'fullName',
  GENDER: 'gender',
  BIRTHDAY: 'birthday',
  AVATAR: 'avatar',
  INTRODUCTION: 'introduction',
  HEIGHT: 'height',
  BODY_SHAPE_ID: 'bodyShapeId',
  OCCUPATION: 'occupation',
  LOCATION_ID: 'locationId',
  TARGET_MIN_AGE: 'targetMinAge',
  TARGET_MAX_AGE: 'targetMaxAge',
  TARGET_MIN_HEIGHT: 'targetMinHeight',
  TARGET_MAX_HEIGHT: 'targetMaxHeight',
  TARGET_BODY_SHAPE_ID: 'targetBodyShapeId',
  TARGET_LOCATION_ID: 'targetLocationId',
  TARGET_OCCUPATION: 'targetOccupation',
  IMAGE: 'image',
  LOCATION: 'location',
  BODY_SHAPE: 'bodyShape',
  TARGET_BODY_SHAPE: 'targetBodyShape',
  TARGET_LOCATION: 'targetLocation',
  PASSPORT: 'passport'
};

export const RESET_PASSWORD_FORM = {
  NEW_PASSWORD: 'newPassword',
  CONFIRM_PASSWORD: 'confirmPassword'
};

export const DELETE_ACCOUNT_FORM = {
  REASON: 'reason'
};

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHERS: 'others'
};

export const GENDER_OPTIONS = [
  { id: GENDER.MALE, name: 'gender.male' },
  { id: GENDER.FEMALE, name: 'gender.female' }
];

export const MAX_LENGTH_INTRODUCTION = 500;
export const MIN_AGE = 20;
export const MIN_TARGET_AGE = 18;

export const VERIFY_OTP_TYPE = {
  VERIFY_ACCOUNT: 'verify_account',
  FORGOT: 'forgot'
};

export const RECEIVE_OTP_TYPE = {
  SMS: 'sms',
  CALL: 'call'
};

export const AUTH_ERROR_MESSAGES = {
  INVALID_USER: 'Invalid user',
  WRONG_OTP: 'WRONG_OTP',
  INVALID_USER_2: 'INVALID_USER',
  INVALID_REQUEST: 'INVALID_REQUEST',
  USER_DELETED: 'USER_DELETED'
};

export const AGE_VERIFY_STATUS = {
  REJECTED: 'rejected',
  PENDING: 'pending',
  APPROVED: 'approved'
};

export const TAG_CATEGORY = {
  BODY_SHAPE: 'body_shape'
};
