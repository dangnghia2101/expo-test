import React, { ReactNode } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Colors } from 'react-native-ui-lib';

import { useLoading } from '@/hooks/useLoading';

interface WrapperProps {
  barStyle?: 'default' | 'light-content' | 'dark-content';
  children: ReactNode;
  disableAvoidKeyboard?: boolean;
  disableAvoidStatusBar?: boolean;
  backgroundColor?: string;
  contentBgColor?: string;
  bottomSafeArea?: boolean;
  statusBarColor?: string;
  statusBarBgColor?: string;
  showLoading?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  barStyle = 'dark-content',
  children,
  disableAvoidKeyboard = false,
  disableAvoidStatusBar = false,
  backgroundColor = Colors.white,
  contentBgColor,
  bottomSafeArea = false,
  statusBarColor,
  statusBarBgColor = 'transparent',
  showLoading
}) => {
  const { top, bottom: paddingBottom } = useSafeAreaInsets();

  useLoading(showLoading);

  return (
    <View flex backgroundColor={backgroundColor}>
      <KeyboardAvoidingView
        style={[styles.flexFill, bottomSafeArea && { paddingBottom }]}
        behavior={'padding'}
        enabled={Platform.OS === 'ios' && !disableAvoidKeyboard}>
        <StatusBar
          barStyle={barStyle}
          translucent
          backgroundColor={statusBarBgColor}
        />
        {!disableAvoidStatusBar && (
          <View height={top} backgroundColor={statusBarColor} />
        )}
        <View flex backgroundColor={contentBgColor}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexFill: {
    flex: 1
  }
});

export default Wrapper;
