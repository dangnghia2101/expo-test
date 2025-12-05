import React, { useEffect } from 'react';

import { StyleSheet, TextStyle } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { Colors, Image, Spacings, Text } from 'react-native-ui-lib';

import { IMAGE_SIZES } from '@/configs/constants';

export interface FWAlertProps {
  message?: string;
  onDismiss?: () => void;
  assetGroup?: string;
  assetName?: string;
  bg?: string;
  textColor?: string;
  size?: number;
  width?: number;
  height?: number;
  textStyle?: TextStyle;
  gap?: number;
  iconColor?: string;
}

export const FWAlert: React.FC<FWAlertProps> = ({
  message,
  assetGroup = 'alert',
  assetName,
  bg = Colors.overlayGray,
  textColor = Colors.white,
  size = IMAGE_SIZES.alert,
  width,
  height,
  textStyle,
  gap = Spacings.clxv,
  iconColor,
  onDismiss
}) => {
  const w = width || size;
  const h = height || size;
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 250 }),
      withDelay(
        700,
        withTiming(0, { duration: 250 }, () => {
          runOnJS(onDismiss)();
        })
      )
    );
  }, []);

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: bg, gap }, animatedStyle]}>
      {!!assetName && (
        <Image
          size={size}
          width={w}
          height={h}
          assetName={assetName}
          assetGroup={assetGroup}
          resizeMode={'contain'}
          tintColor={iconColor}
        />
      )}
      <Text
        marginH-lg
        center
        bold
        titleText
        color={textColor}
        customStyle={textStyle}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
