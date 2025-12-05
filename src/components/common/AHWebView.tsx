import React from 'react';

import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { SkeletonView, View, ViewProps } from 'react-native-ui-lib';

import { API_URL_UPLOAD } from '@/configs/constants';
import { formatHtml } from '@/utils';

interface WebViewProps extends Omit<ViewProps, 'style' | 'customStyle'> {
  url?: string;
  html?: string;
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  customStyle?: string;
  style?: StyleProp<ViewStyle>;
}

const WebView: React.FC<WebViewProps> = ({
  url,
  html,
  scrollEnabled = false,
  showsVerticalScrollIndicator = false,
  customStyle = '',
  style,
  ...props
}) => {
  const source = url
    ? { uri: `${API_URL_UPLOAD}${url}` }
    : { html: formatHtml({ body: html || '' }) };

  const renderLoading = (): React.ReactElement => {
    return <SkeletonView template={SkeletonView.templates.TEXT_CONTENT} />;
  };

  return (
    <View {...props}>
      <AutoHeightWebView
        originWhitelist={['*']}
        startInLoadingState
        renderLoading={renderLoading}
        source={source}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        customStyle={customStyle}
        style={[styles.defaultStyle, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    width: '100%'
  }
});

export default WebView;
