import React, { useState, useEffect } from 'react';

import {
  View,
  Colors,
  Switch as RNUISwitch,
  ViewProps
} from 'react-native-ui-lib';

interface SwitchProps extends ViewProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  width?: number;
  height?: number;
  thumbSize?: number;
  isUpdated?: boolean;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onChange,
  width = 40,
  height = 20,
  thumbSize = 16,
  isUpdated = false,
  disabled = false,
  ...props
}) => {
  const [toggle, setToggle] = useState<boolean>(value || false);

  const disabledColor = toggle ? Colors.subLightPrimary : Colors.grey;

  useEffect(() => {
    if (isUpdated) {
      setToggle(value || false);
    }
  }, [value, isUpdated]);

  const onValueChange = (val: boolean): void => {
    setToggle(val);
    onChange?.(val);
  };

  return (
    <View {...props}>
      <RNUISwitch
        disabled={disabled}
        value={toggle}
        onValueChange={onValueChange}
        height={height}
        width={width}
        thumbSize={thumbSize}
        offColor={Colors.lightGray}
        onColor={Colors.primary}
        disabledColor={disabledColor}
        thumbColor={Colors.white}
      />
    </View>
  );
};

export default Switch;
