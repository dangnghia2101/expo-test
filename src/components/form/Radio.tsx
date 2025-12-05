import React, { useState, useEffect } from 'react';

import { Pressable, ViewStyle } from 'react-native';
import { View, Text, Colors, ViewProps } from 'react-native-ui-lib';

import WrapInput from './WrapInput';

interface RadioProps extends Omit<ViewProps, 'children'> {
  items: Array<any>;
  keyId: string | number;
  keyLabel?: string;
  formatlabel?: (item: any) => string;
  children?: (item: any) => React.ReactNode;
  onSelect: (item: any) => void;
  defaultValue?: any;
  rowStyle?: ViewStyle;
  size?: number;
  sizeSelected?: number;
  disabled?: boolean;
  title?: string;
  widthItem?: number;
  row?: boolean;
  error?: string;
  isUpdated?: boolean;
  selected?: any;
  required?: boolean;
  withColon?: boolean;
  description?: string;
}

const Radio: React.FC<RadioProps> = ({
  items = [],
  keyId = '',
  keyLabel = '',
  formatlabel,
  children,
  onSelect,
  defaultValue,
  rowStyle,
  size = 20,
  sizeSelected = 10,
  disabled = false,
  title = '',
  widthItem,
  row = false,
  error,
  isUpdated = false,
  selected,
  required = false,
  withColon = false,
  description,
  ...props
}) => {
  const [value, setValue] = useState<any>(defaultValue);

  useEffect(() => {
    if (isUpdated) {
      setValue(selected);
    }
  }, [selected, isUpdated]);

  const onSelected = (item: any): void => {
    const id = keyId ? (item as Record<string, any>)?.[keyId] : item;
    onSelect?.(id);
    setValue(id);
  };

  const renderItems = (item: any, index: number): JSX.Element => {
    const id = keyId ? (item as Record<string, any>)?.[keyId] : item;
    const label = keyLabel
      ? (item as Record<string, string>)?.[keyLabel]
      : item;
    const _selected = value === id;

    const bg = _selected ? Colors.primary : Colors.white;
    const bgDisable = _selected ? Colors.grey : Colors.textDisabled;

    return (
      <View
        key={id as React.Key}
        flex
        marginT-sm={!!index && !row}
        customStyle={rowStyle}
        width={widthItem}>
        <Pressable disabled={disabled} onPress={() => onSelected(item)}>
          <View row centerV>
            <View
              width={size}
              height={size}
              radius={size / 2}
              border={disabled ? 0 : !_selected && 2}
              backgroundColor={disabled ? bgDisable : bg}
              center>
              {_selected && (
                <View
                  width={sizeSelected}
                  height={sizeSelected}
                  radius={sizeSelected / 2}
                  bg-white
                />
              )}
            </View>
            <View flex marginL-xs>
              {children?.(item) || (
                <Text mainBlack inputText>
                  {formatlabel ? formatlabel(label) : label}
                </Text>
              )}
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <WrapInput
      title={title}
      withColon={withColon}
      required={required}
      error={error}
      description={description}
      {...props}>
      <View row={row} flexWrap={row ? 'wrap' : 'nowrap'} marginT-xx>
        {items?.map?.(renderItems)}
      </View>
    </WrapInput>
  );
};

export default React.memo(Radio);
