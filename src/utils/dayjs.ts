import dayjs, { OpUnitType, QUnitType } from 'dayjs';

import { t } from '@/lang';
import { DateType } from '@/types';

export const compareDate = (date: DateType) => {
  if (dayjs().isSame(date)) {
    return 0;
  }
  if (dayjs().isBefore(date)) {
    return -1;
  }
  return 1;
};

export const getAge = (birthday: DateType) =>
  birthday ? dayjs().diff(dayjs(birthday), 'y') : '';

export const getDiff = (date: DateType, unit: QUnitType | OpUnitType = 'h') =>
  dayjs().diff(date, unit);

export const getHumanizeDiff = date => {
  if (getDiff(date, 'd') < 3) {
    return dayjs(date).fromNow();
  }
  return dayjs(date).format(t('format_string.datetime'));
};
