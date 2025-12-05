import React, { useState } from 'react';

import isEqual from 'react-fast-compare';
import {
  Linking,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextLayoutEventData
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Colors, Text, View, ViewProps } from 'react-native-ui-lib';

import { layoutConfig } from '@/utils';
import { t } from 'lang';

interface ReadMoreState {
  showActions: boolean;
  collapsing: boolean;
}

interface ReadMoreProps extends ViewProps {
  numberOfLines?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({
  children,
  numberOfLines = 3,
  ...props
}) => {
  const [state, setState] = useState<ReadMoreState>({
    showActions: false,
    collapsing: false
  });

  const onTextLayout = (
    event: NativeSyntheticEvent<TextLayoutEventData>
  ): void => {
    const isOverflow = event?.nativeEvent?.lines?.length > numberOfLines;

    if (isOverflow && !state.showActions) {
      setState({
        showActions: true,
        collapsing: true
      });
    } else if (!isOverflow && state.showActions) {
      setState({
        showActions: false,
        collapsing: false
      });
    }
  };

  const onToggle = (): void => {
    layoutConfig(150);
    setState(prev => ({
      ...prev,
      collapsing: !prev.collapsing
    }));
  };

  const onPress = (url: string): void => {
    try {
      Linking.openURL(url);
    } catch (error) {
      // Handle error silently
    }
  };

  const parsedText: React.ReactNode =
    typeof children === 'string'
      ? children
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n')
          .replace(/\n\n/g, '\n \n')
      : children;

  return (
    <View {...props}>
      <View overflowHidden>
        <View absH opacity={0}>
          <Text onTextLayout={onTextLayout}>{parsedText}</Text>
        </View>
        <Hyperlink linkStyle={styles.link} onPress={onPress}>
          <Text
            numberOfLines={
              state.showActions && !state.collapsing ? undefined : numberOfLines
            }>
            {parsedText}
          </Text>
        </Hyperlink>
      </View>
      {state.showActions && (
        <Pressable onPress={onToggle}>
          <Text bodyText systemBlue marginT-xss>
            {state.collapsing ? t('common.see_more') : t('common.see_less')}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: Colors.systemBlue
  }
});

export default React.memo(ReadMore, isEqual);
