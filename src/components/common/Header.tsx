import React from 'react';

import { Pressable, ViewProps } from 'react-native';
import { Colors, Image, Spacings, Text, View } from 'react-native-ui-lib';

import Navigator from '@/navigations/Navigator';
import { IMAGE_SIZES } from 'configs/constants';

import NavBar from './NavBar';

interface HeaderProps extends ViewProps {
  title?: string;
  logo?: string;
  sizeLogo?: {
    height: number;
    width: number;
  };
  iconLeft?: string;
  iconRight?: string;
  onPressRight?: () => void;
  onPressLeft?: () => void;
  leftComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode | number;
  bgColor?: string;
  shadow?: boolean;
  showBadgeLeft?: boolean;
  showBadgeRight?: boolean;
  iconLeftColor?: string;
  iconRightColor?: string;
  groupIconLeft?: string;
  groupIconRight?: string;
  leftIconSize?: number;
  rightIconSize?: number;
  numberOfLines?: number;
}

const Header: React.FC<HeaderProps> = ({
  title,
  logo,
  sizeLogo = { width: IMAGE_SIZES.lxxx, height: IMAGE_SIZES.xxviii },
  iconLeft,
  iconRight,
  onPressRight,
  onPressLeft,
  leftComponent,
  centerComponent,
  rightComponent,
  showBadgeLeft = false,
  showBadgeRight = false,
  iconLeftColor,
  iconRightColor,
  groupIconLeft,
  groupIconRight,
  leftIconSize = IMAGE_SIZES.medium,
  rightIconSize = IMAGE_SIZES.medium,
  numberOfLines,
  ...props
}) => {
  const renderLeft = (): React.ReactNode => {
    return (
      leftComponent || (
        <View paddingH-md left>
          {iconLeft ? (
            <Pressable hitSlop={15} onPress={onPressLeft || Navigator.goBack}>
              <Image
                size={leftIconSize}
                assetName={iconLeft}
                assetGroup={groupIconLeft}
                resizeMode={'contain'}
                tintColor={iconLeftColor}
              />
              {!!showBadgeLeft && (
                <View
                  absR
                  isRound
                  width={Spacings.sm}
                  height={Spacings.sm}
                  background-systemRed
                  border
                  borderColor={Colors.white}
                />
              )}
            </Pressable>
          ) : (
            <View width={leftIconSize} height={leftIconSize} />
          )}
        </View>
      )
    );
  };

  const renderCenter = (): React.ReactNode => {
    if (centerComponent) {
      return centerComponent;
    }
    return (
      <View flex center>
        {logo ? (
          <Image
            assetName={logo}
            height={sizeLogo.height}
            width={sizeLogo.width}
            resizeMode={'contain'}
          />
        ) : (
          <Text titleText bold numberOfLines={numberOfLines}>
            {title}
          </Text>
        )}
      </View>
    );
  };

  const renderRight = (): React.ReactNode => {
    return (
      rightComponent || (
        <View paddingH-md right>
          {iconRight ? (
            <Pressable hitSlop={15} onPress={onPressRight}>
              <Image
                size={rightIconSize}
                assetName={iconRight}
                assetGroup={groupIconRight}
                resizeMode={'contain'}
                tintColor={iconRightColor}
              />
              {!!showBadgeRight && (
                <View
                  absR
                  isRound
                  width={Spacings.sm}
                  height={Spacings.sm}
                  bg-primary
                  border
                  borderColor={Colors.white}
                />
              )}
            </Pressable>
          ) : (
            <View width={rightIconSize} height={rightIconSize} />
          )}
        </View>
      )
    );
  };

  return (
    <View
      paddingV-vi
      zIndex={2}
      bg-white
      borderB
      borderColor={Colors.subLightGray}
      {...props}>
      <NavBar centerV minHeight={Spacings.lg}>
        {renderLeft()}
        {renderCenter()}
        {renderRight()}
      </NavBar>
    </View>
  );
};

export default Header;
