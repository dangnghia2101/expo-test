import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ThemeManager } from 'react-native-ui-lib';
import { ViewProps } from 'react-native-ui-lib/src/components/view';

import { CommonViewProps, commonViewProps } from './common';

export interface CustomViewProps extends ViewStyle, CommonViewProps {
  customStyle?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
}

ThemeManager.setComponentTheme(
  'View',
  ({ customStyle, ...props }: CustomViewProps): ViewProps => {
    return {
      style: StyleSheet.flatten([
        {
          ...(commonViewProps(props)?.style || {})
        },
        customStyle
      ])
    };
  }
);
