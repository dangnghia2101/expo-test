import React, { useState, useImperativeHandle, forwardRef } from 'react';

import { ImageViewer } from '@/components/common';

interface ViewerState {
  visible: boolean;
  uri: string;
}

export interface ViewerRef {
  show: (uri: string | number) => void;
  hide: () => void;
}

export const GlobalImageViewer = forwardRef<ViewerRef>((_, ref) => {
  const [state, setState] = useState<ViewerState>({
    visible: false,
    uri: ''
  });

  const show = (uri: string): void => {
    setState({
      visible: true,
      uri
    });
  };

  const hide = (): void => {
    setState({
      visible: false,
      uri: null
    });
  };

  useImperativeHandle(ref, () => ({
    show,
    hide
  }));

  return <ImageViewer visible={state.visible} onHide={hide} uri={state.uri} />;
});
