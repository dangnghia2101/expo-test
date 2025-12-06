import React, { FC, ReactNode } from 'react';

import {
  ActivityIndicator,
  Pressable,
  TextStyle,
  ViewStyle
} from 'react-native';
import {
  Colors,
  Image,
  Spacings,
  Text,
  Typography,
  View,
  ViewProps
} from 'react-native-ui-lib';

import { IMAGE_SIZES } from 'configs/constants';

interface ButtonProps extends Omit<ViewProps, 'outline'> {
  label?: string;
  subLabel?: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  onPress?: () => void;
  bgColor?: string;
  children?: ReactNode;
  radius?: number;
  iconLeft?: string;
  iconLeftGroup?: string;
  iconRight?: string;
  iconRightGroup?: string;
  sizeIcon?: number;
  colorIcon?: string;
  textColor?: string;
  unBold?: boolean;
  disabled?: boolean;
  loading?: boolean;
  disableIconColor?: boolean;
  outline?: boolean;
  border?: number;
  borderColor?: string;
  shadow?: boolean;
  typography?: TextStyle;
  renderLeft?: ReactNode;
  renderRight?: ReactNode;
  forceTextColor?: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
  forceBgColor?: boolean;
}

const Button: FC<ButtonProps> = ({
  size,
  label,
  subLabel,
  textStyle,
  buttonStyle,
  onPress,
  bgColor = Colors.primary,
  children,
  radius = 40,
  iconLeft,
  iconLeftGroup = 'icons',
  iconRight,
  iconRightGroup = 'icons',
  sizeIcon = IMAGE_SIZES.medium,
  colorIcon = Colors.white,
  textColor = Colors.white,
  unBold = false,
  disabled = false,
  loading = false,
  disableIconColor = false,
  outline = false,
  border: _border = 0,
  borderColor = Colors.primary,
  shadow,
  typography = Typography.mdText,
  renderLeft,
  renderRight,
  forceTextColor,
  forceBgColor,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const getBg = () => {
    if (forceBgColor) return bgColor;
    if (disabled) return Colors.lightGray;
    if (outline) return Colors.white;
    return bgColor;
  };

  const getColor = () => {
    if (forceTextColor) return textColor;
    if (disabled) return Colors.white;
    if (outline) return bgColor;
    return textColor;
  };

  const bg = getBg();
  const color = getColor();
  const _colorIcon = outline ? bgColor : colorIcon;
  const border = outline ? 1 : _border;

  const componentLeft = (): ReactNode => {
    if (renderLeft) {
      return renderLeft;
    }

    return (
      !!iconLeft && (
        <Image
          size={sizeIcon}
          assetName={iconLeft}
          assetGroup={iconLeftGroup}
          tintColor={disableIconColor ? '' : _colorIcon}
        />
      )
    );
  };

  const componentRight = (): ReactNode => {
    if (renderRight) {
      return renderRight;
    }

    return (
      !!iconRight && (
        <Image
          size={sizeIcon}
          assetName={iconRight}
          assetGroup={iconRightGroup}
          tintColor={_colorIcon}
        />
      )
    );
  };

  const _onPress = (): void => {
    onPress?.();
  };

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={_onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      {children || (
        <View
          row={!subLabel}
          center
          shadow={!disabled && shadow}
          padding-xs
          radius={radius}
          backgroundColor={bg}
          customStyle={buttonStyle}
          border={border}
          borderColor={borderColor}
          width={size}
          height={size}
          {...props}>
          {componentLeft()}
          {!!label && (
            <Text
              marginH-xs
              color={color}
              bold={!unBold}
              customStyle={[textStyle, typography]}>
              {label}
            </Text>
          )}
          {!!subLabel && (
            <Text
              marginH-xs
              color={color}
              bold={!unBold}
              customStyle={[textStyle, typography]}>
              {subLabel}
            </Text>
          )}
          {componentRight()}
        </View>
      )}
      {loading && (
        <View
          absF
          center
          radius={radius}
          backgroundColor={bg}
          customStyle={buttonStyle}
          {...props}>
          <ActivityIndicator
            color={disabled ? Colors.primary : textStyle?.color || color}
            size={textStyle?.lineHeight || Spacings.xviii}
          />
        </View>
      )}
    </Pressable>
  );
};
export default Button;
