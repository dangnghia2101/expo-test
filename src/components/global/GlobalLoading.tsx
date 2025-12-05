import React, { useState, useImperativeHandle, forwardRef } from 'react';

import { FWLoading } from '@/components/common/FWLoading';

export interface GlobalLoadingRef {
  show: () => void;
  update: (value: boolean) => void;
  hide: () => void;
}

export const GlobalLoading = forwardRef<
  GlobalLoadingRef,
  React.PropsWithChildren<object>
>((_, ref) => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const update = (value: boolean) => {
    setVisible(value);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    show,
    update,
    hide
  }));

  return visible ? <FWLoading /> : null;
});
