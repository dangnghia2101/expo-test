import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import { Keyboard, Pressable, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Colors,
  ViewProps,
  Spacings
} from 'react-native-ui-lib';

import { useFlag } from 'hooks';
import { t } from 'lang';
import {
  parseArrayToObject,
  joinArray,
  parseLabelSelect,
  getBorderColor,
  getBackgroundColor
} from 'utils';

import WrapInput from './WrapInput';
import { FList, NavBar } from '../common';
import { FListProps } from '../common/FList';

const EMPTY: any[] = [];

interface SelectItem {
  [key: string]: any;
}

interface SelectMultipleProps extends Omit<ViewProps, 'children'> {
  withColon?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  description?: string;
  keyId?: string;
  keyLabel?: string;
  formatLabel?: (item: any) => string;
  label?: string;
  title?: string;
  placeholder?: string;
  options?: SelectItem[];
  selected?: any;
  children?: ({ value }: { value: any }) => React.ReactNode;
  onDone?: (value: any) => void;
  height?: number;
  hideIcon?: boolean;
  isUpdated?: boolean;
  numberOfLines?: number;
  maxSelect?: number;
  borderColor?: string;
  bgColor?: string;
  flatlistProps?: FListProps<SelectItem>;
}

const SelectMultiple: React.FC<SelectMultipleProps> = ({
  withColon = false,
  required = false,
  disabled,
  error,
  description,
  keyId,
  keyLabel,
  formatLabel,
  label,
  title,
  placeholder,
  options = EMPTY,
  selected,
  children,
  onDone,
  height = 300,
  hideIcon = false,
  isUpdated = false,
  numberOfLines = 1,
  maxSelect,
  borderColor: _borderColor,
  bgColor,
  flatlistProps,
  ...props
}) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const [isShowActions, _onShowActions, onHideActions] = useFlag(false);
  const [value, setValue] = useState<any>(selected);
  const [itemSelected, setItemSelected] = useState<Record<string, any>>({});
  const [prevSelected, setPrevSelected] = useState<Record<string, any>>({});

  const borderColor = _borderColor || getBorderColor(disabled, error, value);
  const bg = bgColor || getBackgroundColor(disabled, error);

  const onShowActions = (): void => {
    Keyboard.dismiss();
    _onShowActions();
  };

  const customChild = (child: any): SelectItem | undefined => {
    const list = flatlistProps?.data?.length > 0 ? flatlistProps.data : options;
    return list?.find?.(e => (keyId ? e?.[keyId] === child : e === child));
  };

  useEffect(() => {
    if (!_.isEmpty(selected)) {
      const item = parseArrayToObject({
        array: selected,
        customChild
      });
      setItemSelected(item);
      setPrevSelected(item);
    }
    // eslint-disable-next-line
  }, [options]);

  useEffect(() => {
    if (isUpdated) {
      if (!_.isEmpty(selected)) {
        setValue(selected);
        const newSelected = parseArrayToObject({
          array: selected,
          customChild
        });
        setItemSelected(newSelected);
      } else {
        setValue(undefined);
        setItemSelected(undefined);
        setPrevSelected(undefined);
      }
    }
    // eslint-disable-next-line
  }, [selected]);

  const onPressItem = (item: SelectItem): void => {
    const key = keyId ? item[keyId] : item;
    setItemSelected(prev => {
      if (prev?.[key]) {
        const { [key]: temp, ...rest } = prev || {};
        return rest;
      }
      return { ...prev, [key]: item };
    });
  };

  const handleCancel = (): void => {
    setItemSelected(prevSelected);
    onHideActions();
  };

  const handleDone = (): void => {
    setPrevSelected(itemSelected);
    onDone?.(itemSelected);
    onHideActions();
  };

  const renderTitle = (): JSX.Element => (
    <NavBar row paddingH-md paddingT-md paddingB-sm>
      <TouchableOpacity onPress={handleCancel}>
        <Text bodyText>{t('common.cancel')}</Text>
      </TouchableOpacity>
      <View flex center>
        <Text bold bodyText>
          {label}
        </Text>
      </View>
      <TouchableOpacity right onPress={handleDone}>
        <Text bodyText bold primary>
          {t('common.done')}
        </Text>
      </TouchableOpacity>
    </NavBar>
  );

  const renderAction = ({ item }: { item: SelectItem }): JSX.Element => {
    const selectedItem = !!itemSelected?.[keyId ? item?.[keyId] : item];
    const selectedLength = itemSelected ? Object.keys(itemSelected).length : 0;
    const _disabled = !selectedItem && maxSelect === selectedLength;
    const _label = parseLabelSelect(item, keyLabel, formatLabel);
    return (
      <Pressable onPress={() => !_disabled && onPressItem(item)}>
        <View row spread marginH-md paddingV-sm borderB={0.3}>
          <Text inputText>{_label}</Text>
          <View height={Spacings.md} center>
            {selectedItem && (
              <Image medium assetName={'check'} tintColor={Colors.primary} />
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  const renderActions = (): JSX.Element => (
    <Modal
      isVisible={isShowActions}
      useNativeDriver
      hideModalContentWhileAnimating
      onBackButtonPress={handleCancel}
      onBackdropPress={handleCancel}
      onSwipeComplete={handleCancel}
      style={styles.modal}>
      <View
        height={height}
        width={'100%'}
        bg-white
        trRadius={Spacings.xs}
        tlRadius={Spacings.xs}>
        {renderTitle()}
        <View flex>
          {flatlistProps ? (
            <FList
              data={options}
              renderItem={renderAction}
              keyId={keyId}
              useSafeArea
              {...flatlistProps}
            />
          ) : (
            <FlatList
              keyExtractor={(item: SelectItem) =>
                keyId ? item?.[keyId] : item
              }
              data={options}
              renderItem={renderAction}
              contentContainerStyle={{ paddingBottom }}
            />
          )}
        </View>
      </View>
    </Modal>
  );

  const renderSelected = (): JSX.Element => {
    const _selected = joinArray(
      prevSelected ? Object.values(prevSelected) : [],
      {
        formatter: formatLabel,
        labelKey: keyLabel
      }
    );

    return (
      <TouchableOpacity onPress={onShowActions} {...props}>
        {children?.({ value: prevSelected }) || (
          <View
            row
            centerV
            padding-sm
            border
            borderColor={borderColor}
            backgroundColor={bg}
            radius={Spacings.xs}>
            <View flex>
              <Text
                marginR-xs
                inputText
                grey={!_selected}
                numberOfLines={numberOfLines}>
                {_selected || placeholder}
              </Text>
            </View>
            {!hideIcon && (
              <Image
                medium
                assetName={'chevron_down'}
                resizeMode={'contain'}
                tintColor={disabled ? Colors.grey50 : Colors.primary}
              />
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <WrapInput
        title={title}
        withColon={withColon}
        required={required}
        error={error}
        description={description}
        {...props}>
        {renderSelected()}
      </WrapInput>

      {renderActions()}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  }
});

export default SelectMultiple;
