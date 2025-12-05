import React, { useState, ReactNode } from 'react';

import { LayoutChangeEvent } from 'react-native';
import { View, ViewProps } from 'react-native-ui-lib';

interface NavBarProps extends ViewProps {
  children?: ReactNode[];
}

const NavBar: React.FC<NavBarProps> = ({ children, ...props }) => {
  const [minWidth, setMinWidth] = useState<number>(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutWidth = event.nativeEvent?.layout?.width;
    if (layoutWidth) {
      setMinWidth(prev => Math.max(prev, layoutWidth));
    }
  };

  return (
    <View row {...props}>
      <View onLayout={onLayout} minWidth={minWidth}>
        {children?.[0]}
      </View>
      {children?.[1]}
      <View onLayout={onLayout} minWidth={minWidth}>
        {children?.[2]}
      </View>
    </View>
  );
};

export default NavBar;
