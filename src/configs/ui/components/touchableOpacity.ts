import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ThemeManager } from 'react-native-ui-lib';
import { TouchableOpacityProps } from 'react-native-ui-lib/src/components/touchableOpacity';

import { CommonViewProps, commonViewProps } from './common';

export interface CustomTouchableOpacityProps
  extends ViewStyle, CommonViewProps {
  customStyle?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
}

ThemeManager.setComponentTheme(
  'TouchableOpacity',
  ({
    customStyle = {},
    ...props
  }: CustomTouchableOpacityProps): TouchableOpacityProps => {
    return {
      style: StyleSheet.flatten([
        {
          ...(commonViewProps(props)?.style || {})
        },
        customStyle
      ]),
      activeOpacity: 0.9
    };
  }
);
