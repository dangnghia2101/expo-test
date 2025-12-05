import React, { useCallback, useState } from 'react';

import { ActionSheet } from 'react-native-ui-lib';

import { t } from 'lang';

import { useImagePicker, UseImagePickerProps } from './useImagePicker';

export const useImagePickerSheet = (props: UseImagePickerProps) => {
  const { onLauchCamera, onLauchLibrary, ...rest } = useImagePicker(props);

  const [visible, setVisible] = useState(false);

  const onShow = useCallback(() => setVisible(true), []);

  const renderActionSheet = () => {
    return (
      <ActionSheet
        useNativeIOS
        cancelButtonIndex={2}
        options={[
          {
            label: t('common.select_library'),
            onPress: onLauchLibrary
          },
          {
            label: t('common.take_photo'),
            onPress: onLauchCamera
          },
          {
            label: t('common.cancel')
          }
        ]}
        visible={visible}
        onDismiss={() => setVisible(false)}
      />
    );
  };

  return {
    onShow,
    renderActionSheet,
    ...rest
  };
};
