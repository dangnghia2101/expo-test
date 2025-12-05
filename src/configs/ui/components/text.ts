import { Animated, StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Colors, ThemeManager, Typography } from 'react-native-ui-lib';
import { TextPropTypes } from 'react-native-ui-lib/src/components/text';

import { MarginType } from '@/types';

import { CustomColorsProps } from '../colors';
import Fonts from '../fonts';
import { CustomTypographyProps } from '../typography';

export type CustomTextProps = {
  size?: number;
  bold?: boolean;
  medium?: boolean;
  alignRight?: boolean;
  lineHeight?: number;
  textDecorationLine?:
    | 'underline'
    | 'none'
    | 'line-through'
    | 'underline line-through'
    | undefined;
  customStyle?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
} & TextPropTypes &
  MarginType &
  CustomColorsProps<boolean> &
  CustomTypographyProps<boolean>;

const DEFAULT_TYPOGRAPHY: TextStyle = Typography.text;

ThemeManager.setComponentTheme(
  'Text',
  ({
    color,
    size,
    bold,
    medium,
    lineHeight,
    underline,
    customStyle,
    alignRight,
    textDecorationLine = 'none',
    ...rest
  }: CustomTextProps) => {
    let propsColor: string | null = null;
    let propsStyle: TextStyle = {};

    Object.keys(rest).forEach(key => {
      if (typeof rest[key] === 'boolean' && !rest[key]) {
        return;
      }
      if (Colors[key]) {
        propsColor = Colors[key];
      }
      if (Typography[key]) {
        propsStyle = { ...propsStyle, ...Typography[key] };
      }
    });

    let fontFamily = Fonts.REGULAR;
    if (bold) {
      fontFamily = Fonts.BOLD;
    } else if (medium) {
      fontFamily = Fonts.MEDIUM;
    }

    const customPropsStyle: TextStyle = {
      ...DEFAULT_TYPOGRAPHY,
      fontFamily,
      color: color || propsColor || Colors.darkGray,
      textDecorationLine: underline ? 'underline' : textDecorationLine
    };

    if (alignRight) {
      customPropsStyle.textAlign = 'right';
    }
    if (lineHeight) {
      customPropsStyle.lineHeight = lineHeight;
    } else {
      customPropsStyle.lineHeight = underline ? 1.5 : undefined; // Default line height
    }
    if (size) {
      customPropsStyle.fontSize = size;
    }

    const style = StyleSheet.flatten([
      customPropsStyle,
      propsStyle,
      customStyle
    ]);

    return {
      style,
      ...rest
    };
  }
);
