import React, { useEffect, useState } from 'react';

import { useNetworkState } from 'expo-network';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, View, Text, Spacings, Colors } from 'react-native-ui-lib';

import { IMAGE_SIZES } from 'configs/constants';
import { t } from 'lang';

const NetworkStatus = () => {
  const { top } = useSafeAreaInsets();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { isConnected } = useNetworkState();

  const showError: boolean = !isConnected && isMounted;

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => setIsMounted(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (!showError) return null;

  return (
    <View bg-systemRed absH zIndex={1}>
      <View height={top} />
      <View row paddingB-x marginH-md>
        <View width={IMAGE_SIZES.small + Spacings.xs * 2} />
        <View paddingH-xs paddingT-iv paddingB-xs center row flex>
          <Image assetName={'no_internet'} small tintColor={Colors.white} />
          <Text inputText bold white marginL-xs>
            {t('code_error.no_internet')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NetworkStatus;
