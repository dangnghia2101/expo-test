import React, { useEffect, useState } from 'react';

import { Image, ImageProps, ImageSource } from 'expo-image';
import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet
} from 'react-native';
import { Assets, TouchableOpacity } from 'react-native-ui-lib';

import { showImageView } from '@/utils/global';

interface FImageProps extends Omit<ImageProps, 'source'> {
  source?: ImageSource;
  url?: string;
  radius?: number;
  style?: StyleProp<ImageStyle>;
  defaultImage?: ImageSourcePropType;
  preview?: boolean;
}

const FImage: React.FC<FImageProps> = ({
  source,
  url = '',
  radius,
  style,
  defaultImage,
  preview = false,
  ...props
}) => {
  const [_source, setSource] = useState<ImageSourcePropType>(source);

  useEffect(() => {
    if (url) {
      setSource({ uri: url });
    } else if (
      (typeof source === 'object' && !source?.uri) ||
      (typeof source !== 'number' && !source)
    ) {
      if (defaultImage) {
        setSource(defaultImage);
      } else {
        setSource(Assets.icons.no_image);
      }
    } else {
      setSource(source);
    }
  }, [source, url]);

  const onPreview = () => showImageView(source?.uri || url);

  return (
    <TouchableOpacity
      disabled={!preview}
      style={styles.touch}
      onPress={onPreview}>
      <Image
        onError={() => setSource(Assets.icons.no_image)}
        source={_source}
        style={[styles.flex, style, { borderRadius: radius }]}
        {...props}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    flex: 1
  },
  flex: {
    flex: 1
  }
});

export default FImage;
