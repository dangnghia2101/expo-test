import React, { useMemo, ReactNode } from 'react';

import { StyleSheet, ViewStyle } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { View, Colors, ViewProps } from 'react-native-ui-lib';

import { filterObject } from '@/utils';

interface ShadowProps extends ViewProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  dropShadow?: boolean;
  bottomShadow?: boolean;
  actionSheet?: boolean;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  height?: number;
}

const Shadow: React.FC<ShadowProps> = ({
  children,
  style,
  dropShadow = false,
  bottomShadow = false,
  actionSheet = false,
  shadowColor,
  shadowOpacity,
  shadowRadius,
  height,
  ...props
}) => {
  const shadowProps = useMemo(
    () =>
      filterObject({
        shadowColor,
        shadowOpacity,
        shadowOffset: height !== undefined ? { height, width: 0 } : undefined,
        shadowRadius
      }),
    [shadowColor, shadowOpacity, shadowRadius, height]
  );

  return (
    <DropShadow
      style={[
        dropShadow && styles.dropShadow,
        bottomShadow && styles.bottomShadow,
        actionSheet && styles.actionSheet,
        shadowProps,
        style
      ]}>
      <View {...props}>{children}</View>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  dropShadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 4
  },
  bottomShadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6
  },
  actionSheet: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.12,
    shadowRadius: 12
  }
});

export default Shadow;
