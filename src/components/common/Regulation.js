import React from 'react';

import { Text, View } from 'react-native-ui-lib';

import { API } from '@/configs/constants';
import { t } from '@/lang';
import Navigator from '@/navigations/Navigator';

export const Regulation = () => {
  return (
    <View row center>
      <Text
        subText
        underline
        marginR-md
        gray
        onPress={() =>
          Navigator.navigate('WebView', {
            url: API.STATIC_CONTENT.TERMS_OF_SERVICE,
            title: t('setting.terms_of_service')
          })
        }>
        {t('setting.terms_of_service')}
      </Text>
      <Text
        subText
        underline
        gray
        onPress={() =>
          Navigator.navigate('WebView', {
            url: API.STATIC_CONTENT.PRIVACY_POLICY,
            title: t('setting.privacy_policy')
          })
        }>
        {t('setting.privacy_policy')}
      </Text>
    </View>
  );
};
