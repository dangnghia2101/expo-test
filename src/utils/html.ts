import { Platform } from 'react-native';
import { Colors } from 'react-native-ui-lib';

import Fonts from '@/configs/ui/fonts';

export const generateAssetsFontCss = (
  fontFileName: string,
  fileFormat: string = 'ttf'
): string => {
  const fileUri = Platform.select({
    ios: `${fontFileName}.${fileFormat}`,
    android: `file:///android_asset/fonts/${fontFileName}.${fileFormat}`
  });

  return `
	@font-face {
    font-family: '${fontFileName}';
    src: local('${fontFileName}'), url('${fileUri}') format('${
      fileFormat === 'ttf' ? 'truetype' : 'opentype'
    }');
	}
	`;
};

interface FormatHtmlOptions {
  size?: number;
  fontWeight?: string;
  color?: string;
  body: string;
  fontFamily?: string;
}

export const formatHtml = ({
  size = 15,
  body,
  fontWeight = 'regular',
  color = Colors.darkGray,
  fontFamily = Fonts.REGULAR
}: FormatHtmlOptions): string => `
<!DOCTYPE html>
  <html>
  <head>
    <style type="text/css">
      body {
        color: ${color};
        font-size: ${size}px;
        font-weight: ${fontWeight};
        font-family: ${fontFamily}
      }
      img {
        max-width: 100%;
        object-fit: contain;
        height: auto;
      }
      .map {
        height: 300px;
        max-width: 100%;
      }
      .container-audio {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ${generateAssetsFontCss(fontFamily)}
      a {
        color: ${Colors.systemBlue};
      }
    </style>
  </head>

  <body>
    ${body}
  </body>
</html>
`;
