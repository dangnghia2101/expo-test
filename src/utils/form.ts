import { Colors } from 'react-native-ui-lib';

export const getBackgroundColor = (
  disabled: boolean,
  error?: boolean | string | object,
  isFocus?: boolean,
  value?: any
) => {
  if (disabled) {
    return Colors.grey80;
  }
  if (error) {
    return Colors.superLightPink;
  }
  if (isFocus) {
    return Colors.grey90;
  }
  if (value) {
    return Colors.grayLightBG;
  }
  return Colors.white;
};

export const getBorderColor = (
  disabled: boolean,
  error?: boolean | string | object,
  value?: any,
  isFocus?: boolean
) => {
  if (disabled) {
    return Colors.grey60;
  }
  if (error) {
    return Colors.mainPink;
  }
  if (isFocus) {
    return Colors.primary;
  }
  if (value) {
    return Colors.superLightGray;
  }
  return Colors.lightGray;
};

export const getBorderColorFocus = (
  error: boolean | string | object,
  isFocus: boolean
) => {
  if (!isFocus) {
    return Colors.white;
  }
  if (error) {
    return Colors.systemRed;
  }
  return Colors.primary;
};

export const getValueColor = (disabled: boolean, value: any): string => {
  if (disabled) {
    return Colors.white;
  }

  if (value || value === 0) {
    return Colors.black;
  }
  return Colors.grey;
};
