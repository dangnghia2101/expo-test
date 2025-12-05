// react-native-ui-lib.d.ts
import { MarginModifiers, PaddingModifiers } from 'react-native-ui-lib';

import { COLORS } from '@/configs/ui/colors';
import { SPACINGS } from '@/configs/ui/spacings';

export type ModifierName<
  T extends string,
  N extends string,
  E extends string = ''
> = Partial<Record<`${N}-${E}${T}`, boolean>>;
export type Modifier<T extends string, N> = Partial<Record<T, N>>;

export type NegativeType<
  T extends keyof typeof SPACINGS,
  N extends string
> = ModifierName<T, N, 'n'> & ModifierName<T, N, ''>;
export type MarginType = NegativeType<
  keyof typeof SPACINGS,
  keyof MarginModifiers
>;
export type MarginPaddingType = NegativeType<
  keyof typeof SPACINGS,
  keyof MarginModifiers | keyof PaddingModifiers
>;
export type GapType = NegativeType<keyof typeof SPACINGS, 'gap'>;
export type BgColorsType = ModifierName<keyof typeof COLORS, 'bg'>;
