import React from 'react';

import { ImageSource } from 'expo-image';
import { Colors, Spacings, View, ViewProps } from 'react-native-ui-lib';

import { useUser } from '@/hooks/api';
import Navigator, { Screens } from '@/navigations/Navigator';
import { UserProps } from '@/types';
import { getDiff } from '@/utils';

import FImage from './FImage';

interface AvatarProps extends ViewProps {
  source?: ImageSource;
  preview?: boolean;
  lastActivedAt?: string;
  sizeActive?: number;
  user?: UserProps;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  preview = false,
  lastActivedAt,
  radius = Spacings.sm,
  sizeActive = Spacings.xii,
  user,
  ...props
}) => {
  const { me } = useUser();
  const { id: userId } = user || {};
  const isMine = userId?.toString?.() === me?.id?.toString?.();

  const goDetail = () => {
    // if (!isMine && !!user) {
    //   Navigator.navigate(Screens.UserDetail, { userId });
    // }
  };

  const isActive = !!lastActivedAt && getDiff(lastActivedAt, 'm') <= 5;

  return (
    <View bg-grey70 avatar radius={radius} onTouchStart={goDetail} {...props}>
      <View flex radius={radius} overflowHidden>
        <FImage preview={preview} source={source} />
      </View>
      {!!isActive && (
        <View absB absR marginB-niv marginR-niii>
          <View
            isRound
            size={sizeActive}
            bg-systemSuccess
            border={Spacings.ii}
            borderColor={Colors.subWhite}
          />
        </View>
      )}
    </View>
  );
};
export default Avatar;
