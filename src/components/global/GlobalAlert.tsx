import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';

import { ALERT_TYPE } from '@/configs/constants';

import { AlertPopup, AlertPopupProps, FWAlert, FWAlertProps } from '../common';

export interface AlertState extends FWAlertProps, AlertPopupProps {
  visible?: boolean;
  type?: (typeof ALERT_TYPE)[keyof typeof ALERT_TYPE];
}

const INIT_STATE: AlertState = {
  visible: false
};

export interface GlobalAlertRef {
  show: (params: AlertState) => void;
  hide: () => void;
}

export const GlobalAlert = forwardRef((_, ref: React.Ref<GlobalAlertRef>) => {
  const [state, setState] = useState<AlertState>(INIT_STATE);
  const opacity = useSharedValue(0);

  const onShow = () => {
    opacity.value = withTiming(1, { duration: 200 });
  };

  const show = ({ type, ...rest }: AlertState) => {
    setState({ visible: true, type, ...rest });
    if (ALERT_TYPE.POPUP === type) {
      onShow();
    }
  };

  const hide = () => {
    setState(INIT_STATE);
    opacity.value = 0;
  };

  const onHide = () => {
    opacity.value = withTiming(2, { duration: 150 }, () => {
      runOnJS(hide)();
    });
  };

  const handleDismiss = () => {
    if (typeof state?.onHide === 'function') {
      state.onHide();
    }
    hide();
  };

  useImperativeHandle(ref, () => ({
    show,
    hide
  }));

  if (ALERT_TYPE.POPUP === state.type) {
    return <AlertPopup onHide={onHide} opacity={opacity} {...state} />;
  }

  return state.visible && <FWAlert onDismiss={handleDismiss} {...state} />;
});
