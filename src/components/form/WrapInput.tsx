import React from 'react';

import { View, Text, Typography } from 'react-native-ui-lib';
import { ViewProps } from 'react-native-ui-lib/src/components/view';

import { t } from 'lang';

interface WrapInputProps extends ViewProps {
  description?: string;
  title?: string;
  withColon?: boolean;
  error?: string;
  children?: React.ReactNode;
  required?: boolean;
  isFocus?: boolean;
}

const WrapInput: React.FC<WrapInputProps> = ({
  description,
  title,
  withColon,
  error,
  children,
  required = false,
  isFocus = false,
  ...props
}) => {
  return (
    <View {...props}>
      {!!title && (
        <View row centerV marginB-xs>
          <Text bodyText medium>
            {title}
            {withColon ? '：' : ''}
          </Text>
          {required && (
            <View bg-systemRed paddingH-iv marginL-iv>
              <Text ixText white>
                {t('common.required')}
              </Text>
            </View>
          )}
        </View>
      )}
      {children}
      {!!error && (
        <Text subText systemRed marginL-md marginT-iv>
          {error}
        </Text>
      )}
      {!!description && (
        <Text subText gray subLightBlack={isFocus} marginH-md marginT-iv>
          {description}
        </Text>
      )}
    </View>
  );
};

export default WrapInput;
