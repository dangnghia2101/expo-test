import React, { useState } from 'react';

import { ImageSource } from 'expo-image';
import {
  View,
  Image as RNImage,
  LayoutChangeEvent,
  ImageStyle,
  ViewStyle,
  ImageResizeMode
} from 'react-native';
import { Assets } from 'react-native-ui-lib';

import Image from './FImage';

interface ImageState {
  isInit: boolean;
  width: number;
  height: number;
}

interface FWImageProps {
  source: ImageSource;
  ratio?: number;
  style?: ViewStyle;
  initialWidth?: number;
  initialHeight?: number;
  useRNImage?: boolean;
  imageStyle?: ImageStyle;
  resizeMode?: ImageResizeMode;
  tintColor?: string;
  sourceWidth?: number;
  sourceHeight?: number;
  onLoadEnd?: () => void;
}

const FWImage: React.FC<FWImageProps> = ({
  source,
  ratio,
  style,
  initialWidth,
  initialHeight,
  useRNImage,
  imageStyle,
  resizeMode = 'cover',
  tintColor,
  sourceWidth,
  sourceHeight,
  onLoadEnd
}) => {
  const [imageState, setImageState] = useState<ImageState>({
    isInit: true,
    width: initialWidth || 0,
    height: initialHeight || 0
  });
  const imageSize = { width: imageState.width, height: imageState.height };

  let src = source;
  if (typeof src === 'object' && !src?.uri) {
    src = Assets.icons.no_image;
  }

  const safeSetImageState = (newState: Partial<ImageState>): void => {
    setImageState(prev => {
      const nextState = {
        ...prev,
        ...newState
      };
      nextState.width = nextState.width || 0;
      nextState.height = nextState.height || 0;
      return nextState;
    });
  };

  const _onLayout = (event: LayoutChangeEvent): void => {
    if (imageState.isInit || !imageState.width || !imageState.height) {
      const containerWidth = event.nativeEvent.layout.width;
      const newState: Partial<ImageState> = { isInit: false };

      if (ratio) {
        newState.width = containerWidth;
        newState.height = containerWidth * ratio;
        safeSetImageState(newState);
      } else if (typeof source?.uri === 'string') {
        if (sourceWidth && sourceHeight) {
          newState.width = containerWidth;
          newState.height = (containerWidth * sourceHeight) / sourceWidth;
          safeSetImageState(newState);
        } else {
          RNImage.getSize(source?.uri, (width: number, height: number) => {
            newState.width = containerWidth;
            newState.height = (containerWidth * height) / width;
            safeSetImageState(newState);
          });
        }
      } else {
        const resolveResult = RNImage.resolveAssetSource(src);
        newState.width = containerWidth;
        newState.height =
          (containerWidth * resolveResult.height) / resolveResult.width;
        safeSetImageState(newState);
      }
    }
  };

  const renderImage = (): JSX.Element => {
    if (useRNImage) {
      return (
        <RNImage
          source={src}
          style={[imageSize, imageStyle]}
          resizeMode={resizeMode}
          tintColor={tintColor}
        />
      );
    }
    return (
      <View style={imageSize}>
        <Image
          source={src}
          style={[imageSize, imageStyle]}
          resizeMode={resizeMode}
          tintColor={tintColor}
          onLoadEnd={onLoadEnd}
        />
      </View>
    );
  };
  return (
    <View style={style} onLayout={_onLayout}>
      {renderImage()}
    </View>
  );
};

export default FWImage;
