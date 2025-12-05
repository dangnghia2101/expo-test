import { ImageProps as LibImageProps, ThemeManager } from 'react-native-ui-lib';
import { ImageSourceType } from 'react-native-ui-lib/src/components/image';

import { CustomImageSizeProps, IMAGE_SIZES } from '@/configs/constants';

interface ImageProps extends Omit<LibImageProps, 'source'> {
  source?: ImageSourceType;
}

export interface CustomImageProps
  extends ImageProps, CustomImageSizeProps<boolean> {
  source?: ImageSourceType;
  size?: number;
  radius?: number;
}

ThemeManager.setComponentTheme(
  'Image',
  (props: CustomImageProps): ImageProps => {
    let width = props.width || props.size;
    let height = props.height || props.size;

    Object.keys(props || {}).forEach(key => {
      const size = IMAGE_SIZES[key];
      if (size) {
        if (typeof size === 'object') {
          width = size.width;
          height = size.height;
        } else {
          width = size;
          height = size;
        }
      }
    });

    return {
      ...props,
      style: [{ width, height, borderRadius: props?.radius }, props.style]
    };
  }
);
