import { useState } from 'react';

import * as ImageManipulator from 'expo-image-manipulator';
import {
  ImagePickerOptions,
  launchImageLibraryAsync,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
  ImagePickerResult,
  ImagePickerAsset,
  requestCameraPermissionsAsync
} from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

import { t } from '@/lang';

import { useFlag } from './useFlag';
import { usePrevious } from './usePrevious';

export interface UseImagePickerProps {
  handleImage: (assets: ImagePickerAsset[]) => void;
  options?: ImagePickerOptions;
  defaultImages?: ImagePickerAsset[];
}

export const useImagePicker = ({
  handleImage,
  options = { allowsEditing: true },
  defaultImages = null
}: UseImagePickerProps) => {
  const [loading, showLoading, hideLoading] = useFlag(false);
  const prevLoading = usePrevious(loading);
  const [images, setImages] = useState<ImagePickerAsset[]>(defaultImages);

  const handlePickImageSuccess = async (result: ImagePickerResult) => {
    if (result.assets) {
      if (Platform.OS === 'android') {
        await Promise.all(
          result.assets.map(async asset => {
            const fixedImage = ImageManipulator.ImageManipulator.manipulate(
              asset.uri
            );
            const formatImage = await (
              await fixedImage.rotate(0).renderAsync()
            ).saveAsync({ base64: true });

            return { ...asset, ...formatImage };
          })
        )
          .then(assets => {
            handleImage(assets);
          })
          .catch(() => {
            handleImage(result.assets);
          });
      } else {
        handleImage(result.assets);
      }
    }
  };

  const onLauchLibrary = async () => {
    try {
      const { status, canAskAgain } =
        await requestMediaLibraryPermissionsAsync();

      if (status === 'denied' && !canAskAgain) {
        Alert.alert('', t('code_error.block_access_photo'), [
          { text: t('common.confirm'), style: 'cancel' }
        ]);
        return;
      }

      if (status !== 'granted') {
        Alert.alert('', t('code_error.block_access_photo'), [
          {
            text: t('common.confirm'),
            onPress: () => requestMediaLibraryPermissionsAsync()
          }
        ]);
        return;
      }

      showLoading();
      const result = await launchImageLibraryAsync(options);
      hideLoading();
      handlePickImageSuccess(result);
    } catch (error) {
      Alert.alert('', t('code_error.error_occurred'));
    }
  };

  const onLauchCamera = async () => {
    try {
      const { status, canAskAgain } = await requestCameraPermissionsAsync();

      if (status === 'denied' && !canAskAgain) {
        Alert.alert('', t('code_error.block_access_camera'), [
          { text: t('common.confirm'), style: 'cancel' }
        ]);
        return;
      }

      if (status !== 'granted') {
        Alert.alert('', t('code_error.block_access_camera'), [
          {
            text: t('common.confirm'),
            onPress: () => requestCameraPermissionsAsync()
          }
        ]);
        return;
      }

      showLoading();
      const result = await launchCameraAsync(options);
      hideLoading();
      handlePickImageSuccess(result);
    } catch (error) {
      Alert.alert('', t('code_error.error_occurred'));
    }
  };

  return {
    images,
    loading,
    prevLoading,
    setImages,
    onLauchLibrary,
    onLauchCamera
  };
};
