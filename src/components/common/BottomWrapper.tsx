import React, { FC, ReactNode } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ViewProps } from 'react-native-ui-lib';

import { useKeyboard } from '@/hooks';

interface BottomWrapperProps extends ViewProps {
  disabled?: boolean;
  ignoreKeyboardHeight?: boolean;
  children?: ReactNode;
  keyboardShownChildren?: ReactNode;
  keyboardHideChildren?: ReactNode;
}

const BottomWrapper: FC<BottomWrapperProps> = ({
  disabled = false,
  ignoreKeyboardHeight = false,
  children,
  keyboardShownChildren,
  keyboardHideChildren,
  ...props
}) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { isKeyboardShow, keyboardHeight: marginBottom } = useKeyboard();

  return (
    <View
      customStyle={[
        !isKeyboardShow && !disabled && { paddingBottom },
        isKeyboardShow && !ignoreKeyboardHeight && { marginBottom }
      ]}
      {...props}>
      {children}
      {isKeyboardShow ? keyboardShownChildren : keyboardHideChildren}
    </View>
  );
};

export default BottomWrapper;
