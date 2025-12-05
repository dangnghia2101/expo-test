import React, { FC, ReactNode } from 'react';

import { StyleSheet } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import {
  Colors,
  Spacings,
  Text,
  TouchableOpacity,
  View
} from 'react-native-ui-lib';

import { t } from 'lang';

export interface AlertPopupProps {
  title?: string;
  message?: string;
  opacity?: SharedValue<number>;
  customButton?: (onHide: () => void) => ReactNode;
  labelButton?: string;
  cancelLabel?: string;
  onPress?: () => void;
  onHide?: () => void;
  onCancel?: () => void;
}

export const AlertPopup: FC<AlertPopupProps> = ({
  title,
  message,
  opacity,
  customButton,
  labelButton = t('common.yes'),
  cancelLabel,
  onHide,
  onPress,
  onCancel
}) => {
  const handlePress = () => {
    onHide?.();
    onPress?.();
  };

  const handleCancel = () => {
    onHide?.();
    onCancel?.();
  };

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View bg-white radius={Spacings.xs}>
        <View paddingH-xx paddingT-xx gap-sm>
          {!!title && (
            <Text titleText center bold>
              {title}
            </Text>
          )}
          {!!message && (
            <Text bodyText center>
              {message}
            </Text>
          )}
        </View>
        {customButton?.(onHide) || (
          <View
            row
            spread
            centerV
            marginT-md
            gap-md
            paddingH-xx
            borderT={StyleSheet.hairlineWidth}
            borderColor={Colors.border}>
            {!!cancelLabel && (
              <TouchableOpacity
                flex
                center
                paddingV-sm
                borderR={StyleSheet.hairlineWidth}
                borderColor={Colors.border}
                onPress={handleCancel}>
                <Text bodyText>{cancelLabel}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity flex center paddingV-sm onPress={handlePress}>
              <Text bodyText primary bold>
                {labelButton}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    backgroundColor: Colors.overlayGray,
    paddingHorizontal: Spacings.md,
    justifyContent: 'center'
  }
});
