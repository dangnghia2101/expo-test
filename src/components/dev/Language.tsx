import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { StyleSheet, Pressable } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import i18n, { LANGUAGE } from '@/lang';
import { zustandStorage } from '@/store/mmkv';

const Language = ({ children }) => {
  const [lang, setLang] = useState(
    zustandStorage.getItem('language') || LANGUAGE.JA
  );
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      dayjs.locale(lang);
      zustandStorage.setItem('language', lang);
      setRefresh(true);
    }
  }, [lang]);

  const renderSwitch = (item: string) => {
    const isSelected = item === lang;
    return (
      <Pressable key={item} onPress={() => setLang(item)}>
        <View
          background-white
          background-primary={isSelected}
          center
          padding-xxs>
          <Text white={isSelected}>{item}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View flex>
      {!refresh && children}
      <View bg-black absR absB border customStyle={styles.language}>
        {Object.values(LANGUAGE).map(renderSwitch)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  language: {
    bottom: 120
  }
});

export default Language;
