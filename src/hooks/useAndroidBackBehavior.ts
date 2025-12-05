import { useCallback, useEffect } from 'react';

import { BackHandler } from 'react-native';

export const useAndroidBackBehavior = (onBack?: () => void) => {
  const handleBack = useCallback(() => {
    onBack?.();
    return true;
  }, [onBack]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack
    );
    return () => backHandler.remove();
  }, [handleBack]);
};
