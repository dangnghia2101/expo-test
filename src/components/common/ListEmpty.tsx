import React from 'react';

import { View, Text, Image, ViewProps } from 'react-native-ui-lib';

import { IMAGE_SIZES } from '@/configs/constants';

import Button from './Button';

interface ListEmptyProps extends ViewProps {
  image?: string;
  imageSize?: number;
  assetGroup?: string;
  content: string;
  label?: string;
  onPress?: () => void;
}

const ListEmpty: React.FC<ListEmptyProps> = ({
  image,
  imageSize = IMAGE_SIZES.big,
  assetGroup,
  content,
  label,
  onPress,
  ...props
}) => {
  return (
    <View flex centerV marginH-xl {...props}>
      <View center>
        {!!image && (
          <Image size={imageSize} assetName={image} assetGroup={assetGroup} />
        )}
        <Text bold xiiiText marginT-xx center>
          {content}
        </Text>
      </View>
      {!!label && <Button marginT-xl label={label} onPress={onPress} />}
    </View>
  );
};

export default ListEmpty;
