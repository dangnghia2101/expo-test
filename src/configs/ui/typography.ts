import { TextStyle } from 'react-native';
import { Typography } from 'react-native-ui-lib';

import { Modifier } from '@/types';

export const TYPOGRAPHY = {
  xxxxText: {
    fontSize: 40,
    lineHeight: 46
  },
  xxxviText: {
    fontSize: 36,
    lineHeight: 36
  },
  lgText: {
    fontSize: 24,
    lineHeight: 36
  },
  titleText: {
    fontSize: 18,
    lineHeight: 26
  },
  mdText: {
    fontSize: 16,
    lineHeight: 24
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24
  },
  subTitleText: {
    fontSize: 15,
    lineHeight: 24
  },
  inputText: {
    fontSize: 15,
    lineHeight: 18
  },
  text: {
    fontSize: 14,
    lineHeight: 14
  },
  xiiiText: {
    fontSize: 13,
    lineHeight: 20
  },
  subText: {
    fontSize: 12,
    lineHeight: 16
  },
  ixText: {
    fontSize: 9,
    lineHeight: 12
  },
  captionText: {
    fontSize: 9,
    lineHeight: 12
  }
};

export type CustomTypographyProps<T = TextStyle> = Modifier<
  keyof typeof TYPOGRAPHY,
  T
>;

Typography.loadTypographies(TYPOGRAPHY);
