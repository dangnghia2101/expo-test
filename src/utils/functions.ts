import dayjs from 'dayjs';
import { get, isEmpty } from 'lodash';

import {
  FORMAT_FILTER_USER,
  OPERATOR_FILTER,
  TYPE_FILTER_USER,
  UNIT_AGE
} from '@/configs/constants';
import { t } from '@/lang';

export const parseLabelSelect = (
  item: any,
  keyLabel?: string,
  formatLabel?: (_item: any) => string
): string => {
  if (!item) {
    return '';
  }
  if (formatLabel) {
    return formatLabel(item);
  }
  return typeof item === 'object' && keyLabel ? item?.[keyLabel] : item;
};

export const parseArrayToObject = <T>({
  array = [],
  keyId = '',
  customChild
}: {
  array: T[];
  keyId?: string;
  customChild?: (item: T) => any;
}): Record<string, T | any> =>
  Object.fromEntries(
    array?.map?.(item => [
      keyId ? item?.[keyId as keyof T] : item,
      customChild ? customChild(item) : item
    ]) || []
  );

export const joinArray = <T extends Record<string, any> | string | number>(
  arr: T[],
  {
    separator = '、',
    formatter,
    labelKey,
    filter
  }: {
    separator?: string;
    formatter?: (item: T) => string;
    labelKey?: keyof T;
    filter?: (item: T) => boolean;
  } = {}
): string => {
  if (!Array.isArray(arr)) {
    return '';
  }

  let clone = Array.from(arr);
  if (typeof filter === 'function') {
    clone = clone.filter(filter);
  }
  if (typeof formatter === 'function') {
    return clone.map(formatter).join(separator);
  }
  return clone
    .map(item =>
      typeof item === 'object' ? item?.[labelKey as keyof T] : item
    )
    .join(separator);
};

export const filterObject = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  const result = { ...obj };

  Object.keys(result).forEach(key => {
    const val = result[key];
    const isEmptyValue = val == null || val === '' || Number.isNaN(val);

    if (val && typeof val === 'object' && !Array.isArray(val)) {
      (result as any)[key] = filterObject(val);
      if (Object.keys(result[key] as object).length === 0) {
        delete result[key];
      }
    } else if (isEmptyValue) {
      delete result[key];
    }
  });

  return result;
};

export function deDuplicate<TData>(arr: TData[], key = 'id') {
  const map = new Map();
  return arr?.filter?.(item => {
    const keyValue = get(item, key);
    if (map.has(keyValue)) {
      return false;
    }
    map.set(keyValue, true);
    return true;
  });
}
export const formatFilterUser = (obj: Record<string, any>) => {
  return Object.keys(obj || {})
    .filter(key => !isEmpty(obj?.[key]))
    .map(key => {
      try {
        const { field } = FORMAT_FILTER_USER[key] || {};
        let value = obj?.[key];
        const { operator } = FORMAT_FILTER_USER[key];
        switch (FORMAT_FILTER_USER[key]?.type) {
          case TYPE_FILTER_USER.DATE: {
            const data = Object.keys(value)
              .filter(k => value?.[k])
              .map(k => ({
                field,
                operator: FORMAT_FILTER_USER?.[key].operator?.[k],
                value: dayjs()
                  .subtract(value[k] - UNIT_AGE[k], 'y')
                  .format(t('format_string.date_minus'))
              }));
            return data;
          }
          case TYPE_FILTER_USER.NAME:
            value = value?.name;
            break;
          case TYPE_FILTER_USER.CHECKBOX:
            return {
              operator: 'or',
              value: Object.keys(value)?.map(item => ({
                field,
                operator,
                value: item
              }))
            };
          case TYPE_FILTER_USER.MULTIPLE:
            return {
              operator: 'or',
              value: Object.keys(value)?.map(item => ({
                field,
                operator,
                value: item
              }))
            };
          case TYPE_FILTER_USER.KEYWORD:
            return {
              operator: 'or',
              value: [
                {
                  field: 'user.fullName',
                  operator: OPERATOR_FILTER.CONTAINSS,
                  value: value?.trim?.()
                },
                {
                  field: 'user.introduction',
                  operator: OPERATOR_FILTER.CONTAINSS,
                  value: value?.trim?.()
                },
                {
                  field: 'user.occupation',
                  operator: OPERATOR_FILTER.CONTAINSS,
                  value: value?.trim?.()
                },
                {
                  field: 'user.targetOccupation',
                  operator: OPERATOR_FILTER.CONTAINSS,
                  value: value?.trim?.()
                }
              ]
            };
          case TYPE_FILTER_USER.OBJECT:
            value = Object.values(value);
            break;
          case TYPE_FILTER_USER.OBJECT_ID:
            value = Object.values(value)?.map(
              (item: { id: string }) => item?.id
            );
            break;
          default:
            break;
        }
        return {
          field: FORMAT_FILTER_USER[key].field,
          operator,
          value
        };
      } catch {
        return {};
      }
    })
    .filter(item => !isEmpty(item))
    .flat();
};

export const getDefaultAvatar = (avatars: any[], avatar: string) => {
  const defaultAvatar = avatars?.find?.(_avatar => _avatar.isDefault);

  if (defaultAvatar) {
    return defaultAvatar?.url;
  }

  return avatar;
};
