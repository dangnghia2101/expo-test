import {
  ColorValue,
  DimensionValue,
  StyleSheet,
  ViewStyle
} from 'react-native';
import { Colors } from 'react-native-ui-lib';

import { CustomImageSizeProps, IMAGE_SIZES } from '@/configs/constants';
import { BgColorsType, GapType, MarginPaddingType } from '@/types';

export interface CommonViewProps
  extends
    GapType,
    BgColorsType,
    MarginPaddingType,
    CustomImageSizeProps<boolean> {
  border?: boolean | number;
  borderT?: boolean | number;
  borderB?: boolean | number;
  borderL?: boolean | number;
  borderR?: boolean | number;
  borderColor?: ColorValue | undefined;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | undefined;
  minHeight?: DimensionValue | undefined;
  maxHeight?: DimensionValue | undefined;
  minWidth?: DimensionValue | undefined;
  maxWidth?: DimensionValue | undefined;
  overflowHidden?: boolean;
  selfStart?: boolean;
  selfEnd?: boolean;
  selfCenter?: boolean;
  selfStretch?: boolean;
  tlRadius?: number;
  trRadius?: number;
  blRadius?: number;
  brRadius?: number;
  blColor?: string;
  brColor?: string;
  bbColor?: string;
  btColor?: string;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
  radius?: number;
  zIndex?: number;
  isRound?: boolean;
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  size?: number;
  shadow?: boolean;
  reverseShadow?: boolean;
}

const checkBoolean = (
  value: boolean | number | undefined,
  trueValue: number = 1,
  falseValue: number | undefined = undefined
): number | undefined => {
  if (typeof value === 'boolean') {
    return value ? trueValue : falseValue;
  }
  return value ?? undefined;
};

export const commonViewProps = (
  props: CommonViewProps
): { style: ViewStyle } => {
  const {
    border,
    borderT,
    borderB,
    borderL,
    borderR,
    borderColor,
    borderStyle,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    overflowHidden,
    selfStart,
    selfEnd,
    selfCenter,
    selfStretch,
    tlRadius,
    trRadius,
    blRadius,
    brRadius,
    blColor,
    brColor,
    bbColor,
    btColor,
    flexWrap,
    radius,
    zIndex,
    isRound,
    width: propWidth,
    height: propHeight,
    size,
    shadow,
    reverseShadow
  } = props;

  let width = propWidth || size;
  let height = propHeight || size;

  Object.keys(props).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const sizeValue = IMAGE_SIZES[key];
      if (sizeValue && props[key]) {
        if (typeof sizeValue === 'object') {
          width = sizeValue.width;
          height = sizeValue.height;
        } else {
          width = sizeValue;
          height = sizeValue;
        }
      }
    }
  });

  return {
    style: StyleSheet.flatten([
      {
        borderStyle,
        overflow: overflowHidden ? 'hidden' : undefined,
        alignSelf: selfCenter
          ? 'center'
          : selfStart
            ? 'flex-start'
            : selfEnd
              ? 'flex-end'
              : selfStretch
                ? 'stretch'
                : undefined,
        minHeight,
        maxHeight,
        maxWidth,
        minWidth,
        flexWrap,
        zIndex,
        borderLeftColor: blColor || borderColor || Colors.grey50,
        borderBottomColor: bbColor || borderColor || Colors.grey50,
        borderRightColor: brColor || borderColor || Colors.grey50,
        borderTopColor: btColor || borderColor || Colors.grey50,
        borderWidth: checkBoolean(border),
        borderTopWidth: checkBoolean(borderT || border),
        borderBottomWidth: checkBoolean(borderB || border),
        borderLeftWidth: checkBoolean(borderL || border),
        borderRightWidth: checkBoolean(borderR || border),
        borderRadius: isRound
          ? typeof width === 'number'
            ? width / 2
            : 0
          : checkBoolean(radius),
        borderTopLeftRadius: checkBoolean(tlRadius),
        borderTopRightRadius: checkBoolean(trRadius),
        borderBottomLeftRadius: checkBoolean(blRadius),
        borderBottomRightRadius: checkBoolean(brRadius),
        width,
        height
      },
      shadow && styles.shadow,
      reverseShadow && styles.reverseShadow
    ])
  };
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 1
  },
  reverseShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -20
    },
    shadowOpacity: 0.03,
    shadowRadius: 24,
    elevation: 1
  }
});
