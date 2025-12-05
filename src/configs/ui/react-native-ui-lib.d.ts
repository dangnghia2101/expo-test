// react-native-ui-lib.d.ts
import { Assets as LibAssets } from 'react-native-ui-lib/src/assets/Assets';
import { Colors as ColorsStyle } from 'react-native-ui-lib/src/style/colors';
import { Spacings as SpacingsStyle } from 'react-native-ui-lib/src/style/spacings';
import { Typography as TypographyStyle } from 'react-native-ui-lib/src/style/typography';

import { CustomAssetsProps } from './assets';
import { CustomColorsProps } from './colors';
import {
  CustomImageProps,
  CustomTextProps,
  CustomTouchableOpacityProps,
  CustomViewProps
} from './components';
import { CustomSpacingsProps } from './spacings';
import { CustomTypographyProps } from './typography';

declare module 'react-native-ui-lib' {
  interface ViewProps extends LibViewProps, CustomViewProps {}
  interface TouchableOpacityProps
    extends LibTouchableOpacityProps, CustomTouchableOpacityProps {}

  export const Text: React.FC<CustomTextProps>;
  export const Image: React.FC<CustomImageProps>;
  export const Assets: LibAssets & CustomAssetsProps;
  export const Spacings: SpacingsStyle & CustomSpacingsProps;
  export const Colors: ColorsStyle & CustomColorsProps;
  export const Typography: TypographyStyle & CustomTypographyProps;
}
