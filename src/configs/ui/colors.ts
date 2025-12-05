import { Colors } from 'react-native-ui-lib';

import { Modifier } from '@/types';

export const COLORS = {
  primary: '#FA9E9F',
  black: '#231F20',
  white: '#ffffff',
  grey: '#757575',

  textDisabled: '#D0D3E2',
  systemRed: '#EB5757',
  systemBlue: '#1C83FC',
  systemGreen: '#27AE60',
  systemOrange: '#FFC727',
  systemSuccess: '#27AE60',

  mainPink: '#FA9E9F',

  subLightPrimary: '#D690a1',
  subLightPink: '#FDD8D9',
  subGray: '#999999',
  subLightGray: '#F2F2F2',
  subWhite: '#FFFFFF',
  subPurple: '#E0C9E0',
  subLightBlack: '#4C4C4C',

  superLightPink: '#FEF0F1',
  superLightGray: '#F5F5F5',

  gray: '#999999',
  grayLightBG: '#FDFDFD',
  lightGray: '#DEDEDE',
  darkGray: '#282828',
  radicalRed: '#FE3D78',
  border: '#3C3C435C',
  doveGray: '#616161',

  overlayGray: 'rgba(0,0,0,0.4)',
  loadingOverlay: 'rgba(0,0,0,0.4)',

  success: '#52C41A'
};

export type CustomColorsProps<T = string> = Modifier<keyof typeof COLORS, T>;

Colors.loadColors(COLORS);
