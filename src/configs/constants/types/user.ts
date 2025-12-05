import { AUTH_FORM } from './auth';
import { OPERATOR_FILTER, TYPE_FILTER_USER } from './filter';

export const ROLE = {
  ADMIN: 'admin',
  MEMBER: 'member'
};

export const SORT_USER = [{ field: 'lastActivedAt', value: 'desc' }];

export const SEARCH_USER_FORM = {
  KEYWORD: 'keyword',
  TARGET_MIN_AGE: 'age.targetMinAge',
  TARGET_MAX_AGE: 'age.targetMaxAge',
  GENDER: 'gender',
  LOCATION_ID: 'locationId',
  AGE: 'age',
  BODY_SHAPE_ID: 'bodyShapeId'
};

export const FORMAT_FILTER_USER = {
  [SEARCH_USER_FORM.KEYWORD]: {
    operator: OPERATOR_FILTER.CONTAINSS,
    type: TYPE_FILTER_USER.KEYWORD
  },
  [SEARCH_USER_FORM.GENDER]: {
    operator: OPERATOR_FILTER.IN,
    field: `user.${SEARCH_USER_FORM.GENDER}`,
    type: TYPE_FILTER_USER.STRING
  },
  [SEARCH_USER_FORM.AGE]: {
    field: 'user.birthday',
    type: TYPE_FILTER_USER.DATE,
    operator: {
      [AUTH_FORM.TARGET_MIN_AGE]: OPERATOR_FILTER.LESS_THAN,
      [AUTH_FORM.TARGET_MAX_AGE]: OPERATOR_FILTER.GREATER_THAN
    }
  },
  [SEARCH_USER_FORM.LOCATION_ID]: {
    operator: OPERATOR_FILTER.EQUAL,
    field: `user.${SEARCH_USER_FORM.LOCATION_ID}`,
    type: TYPE_FILTER_USER.MULTIPLE
  },
  [SEARCH_USER_FORM.BODY_SHAPE_ID]: {
    operator: OPERATOR_FILTER.EQUAL,
    field: `user.${SEARCH_USER_FORM.BODY_SHAPE_ID}`,
    type: TYPE_FILTER_USER.MULTIPLE
  }
};

export const UNIT_AGE = {
  [AUTH_FORM.TARGET_MIN_AGE]: 0,
  [AUTH_FORM.TARGET_MAX_AGE]: -1
};
