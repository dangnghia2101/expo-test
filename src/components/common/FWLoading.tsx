import React, { useEffect } from 'react';

import { ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Colors, View, Text, Spacings } from 'react-native-ui-lib';

const FADE_IN_DURATION = 100;

interface FWLoadingProps {
  wrapStyle?: ViewStyle;
  backgroundColor?: string;
  color?: string;
  size?: number;
  text?: string;
}

export const FWLoading: React.FC<FWLoadingProps> = ({
  wrapStyle,
  backgroundColor = Colors.overlayGray,
  color = Colors.white,
  size = Spacings.xl,
  text = ''
}) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value
    }),
    [opacity]
  );

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: FADE_IN_DURATION
    });
  }, []);

  return (
    <Animated.View
      style={[{ backgroundColor }, styles.wrapper, wrapStyle, animatedStyle]}>
      <View width={size} height={size}>
        <ActivityIndicator color={color} size={size} />
      </View>
      {!!text && (
        <View marginT-xs>
          <Text bold white>
            {text}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject
  }
});
