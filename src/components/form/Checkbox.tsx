import React, { useState, useEffect } from 'react';

import { Pressable, StyleProp, TextStyle } from 'react-native';
import {
  View,
  Text,
  Colors,
  Image,
  Typography,
  ViewProps,
  TypographyModifiers,
  Spacings
} from 'react-native-ui-lib';

import { IMAGE_SIZES } from '@/configs/constants';

interface CheckboxProps extends ViewProps {
  size?: number;
  sizeIcon?: number;
  selected?: boolean;
  label?: string;
  labelComponent?: React.ReactNode;
  onSelect: (value: boolean) => void;
  textStyle?: StyleProp<TextStyle>;
  typography?: TypographyModifiers;
  disabled?: boolean;
  preventSelect?: boolean;
  colorUncheck?: string;
  isUpdated?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  size = IMAGE_SIZES.normal,
  sizeIcon = IMAGE_SIZES.small,
  selected = false,
  label,
  labelComponent,
  onSelect,
  textStyle,
  typography = Typography.text,
  disabled = false,
  preventSelect = false,
  colorUncheck = Colors.grey50,
  isUpdated = false,
  ...props
}) => {
  const [value, setValue] = useState(selected);

  const bg = value ? Colors.primary : Colors.white;
  const bgDisable = value ? Colors.grey : Colors.grey50;

  useEffect(() => {
    if (isUpdated) {
      setValue(selected);
    }
  }, [selected]);

  const handleSelect = () => {
    setValue(prev => {
      onSelect?.(!prev);
      return !prev;
    });
  };
  return (
    <Pressable disabled={disabled || preventSelect} onPress={handleSelect}>
      <View row {...props}>
        <View
          marginT-xsss
          width={size}
          height={size}
          border={disabled ? 0 : !value && 2}
          radius={Spacings.ii}
          borderColor={disabled ? '' : colorUncheck}
          backgroundColor={disabled ? bgDisable : bg}
          center>
          {value && (
            <Image
              size={sizeIcon}
              tintColor={Colors.white}
              assetName={'check'}
            />
          )}
        </View>
        {labelComponent || (
          <Text marginL-xs style={[typography as TextStyle, textStyle]}>
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  );
};
export default Checkbox;
