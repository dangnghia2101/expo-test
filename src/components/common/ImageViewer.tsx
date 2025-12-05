import React from 'react';

import { Zoomable } from '@likashefqet/react-native-image-zoom';
import { Image as ExpoImage, ImageProps } from 'expo-image';
import { ActivityIndicator, Modal, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Colors,
  Image,
  Spacings,
  TouchableOpacity,
  View
} from 'react-native-ui-lib';

import { useFlag } from '@/hooks';

interface ImageViewerProps extends Partial<ImageProps> {
  visible: boolean;
  onHide: () => void;
  uri: string;
  doubleTapScale?: number;
  isSingleTapEnabled?: boolean;
  isDoubleTapEnabled?: boolean;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  visible,
  uri,
  onHide,
  contentFit = 'contain',
  doubleTapScale = 3,
  isSingleTapEnabled = true,
  isDoubleTapEnabled = true,
  ...props
}) => {
  const { top: paddingTop } = useSafeAreaInsets();
  const [isLoading, showLoading, hideLoading] = useFlag(true);

  const onClose = () => {
    showLoading();
    onHide();
  };

  return (
    <Modal visible={visible} transparent>
      <GestureHandlerRootView>
        <View flex bg-white>
          {isLoading && (
            <View absF center>
              <ActivityIndicator color={Colors.grey} size={Spacings.xl} />
            </View>
          )}

          <Zoomable
            isDoubleTapEnabled={isDoubleTapEnabled}
            isSingleTapEnabled={isSingleTapEnabled}
            doubleTapScale={doubleTapScale}
            style={styles.container}>
            <ExpoImage
              source={{
                uri
              }}
              onLoadEnd={hideLoading}
              contentFit={contentFit}
              style={styles.container}
              {...props}
            />
          </Zoomable>

          <View
            absR
            absT
            marginTop={paddingTop}
            marginR-sm
            bg-white
            radius={Spacings.xl}>
            <TouchableOpacity padding-iii onPress={onClose}>
              <Image assetName={'close'} xxxii />
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ImageViewer;
