import { Spacings } from 'react-native-ui-lib';

import { Modifier } from '@/types';

export const SPACINGS = {
  // app-based
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,

  // special cases
  z: 0,
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
  x: 10,
  xi: 11,
  xii: 12,
  xiii: 13,
  xiv: 14,
  xv: 15,
  xvi: 16,
  xvii: 17,
  xviii: 18,
  xix: 19,
  xx: 20,
  xxii: 22,
  xxv: 25,
  xxviii: 28,
  xxx: 30,
  xxxi: 31,
  xxxii: 32,
  xxxiv: 34,
  xxxvi: 36,
  xxxx: 40,
  xlii: 42,
  xliv: 44,
  xlvi: 46,
  xlviii: 48,
  l: 50,
  lx: 60,
  lxiv: 64,
  lxviii: 68,
  lxxi: 71,
  lxxx: 80,
  xc: 90,
  xcvii: 97,
  cii: 102,
  civ: 104,
  cxix: 119,
  cxx: 120,
  cxxx: 130,
  cxliii: 143,
  clxv: 165
};

export type CustomSpacingsProps<T = number> = Modifier<
  keyof typeof SPACINGS,
  T
>;

Object.keys(SPACINGS).forEach(key => {
  SPACINGS[`n${key}`] = SPACINGS[key] * -1;
});

Spacings.loadSpacings(SPACINGS);
