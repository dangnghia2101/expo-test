import { Modifier } from '@/types';

export const IMAGE_SIZES = {
  small: 16,
  normal: 20,
  medium: 24,
  avatar: 100,
  big: 120,
  empty: 196,
  alert: 232,

  x: 10,
  xii: 12,
  xxii: 22,
  xxviii: 28,
  xxx: 30,
  xxxii: 32,
  xxxv: 35,
  xxxvi: 36,
  xlviii: 48,
  l: 50,
  lvi: 56,
  lxxx: 80,
  xcviii: 98
};

export type CustomImageSizeProps<T = number> = Modifier<
  keyof typeof IMAGE_SIZES,
  T
>;
