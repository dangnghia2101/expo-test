import React, { useMemo, useState, useEffect } from 'react';

import isEqual from 'lodash/isEqual';
import { Pressable, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Colors,
  Spacings
} from 'react-native-ui-lib';

import { BottomWrapper, FList, NavBar } from '@/components/common';
import TextInput from '@/components/form/TextInput';
import WrapInput from '@/components/form/WrapInput';
import { useDebounce } from '@/hooks';
import { t } from '@/lang';
import { getBackgroundColor, getBorderColor, parseLabelSelect } from '@/utils';

import { FListProps } from '../common/FList';

const EMPTY: any[] = [];
const RADIUS = 8;

interface SelectItem {
  [key: string]: any;
  parentLabel?: string;
}

interface SelectProps {
  error?: string;
  keyId?: string;
  keyLabel?: string;
  formatLabel?: (item: any) => string;
  label?: string;
  title?: string;
  placeholder?: string;
  options?: SelectItem[];
  selected?: any;
  children?: ({ value }: { value: any }) => React.ReactNode;
  onSelect?: (value: any) => void;
  height?: number;
  hideIcon?: boolean;
  isUpdated?: boolean;
  required?: boolean;
  withColon?: boolean;
  description?: string;
  disabled?: boolean;
  flatlistProps?: FListProps<SelectItem>;
  unit?: string;
  bgColor?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

const findSelectedItem = (
  list: SelectItem[],
  selected: any,
  keyId?: string
): SelectItem | null => {
  if (!list || !selected) return null;
  return list.find(item => {
    const listItemValue =
      typeof item === 'object' && keyId ? item?.[keyId] : item;
    const selectedValue =
      typeof selected === 'object' && keyId ? selected?.[keyId] : selected;
    return isEqual(listItemValue, selectedValue);
  });
};

const Select: React.FC<SelectProps> = ({
  error,
  keyId,
  keyLabel,
  formatLabel,
  label,
  title,
  placeholder,
  options = EMPTY,
  selected,
  children,
  onSelect,
  height = 300,
  hideIcon = false,
  isUpdated = false,
  required = false,
  withColon = false,
  description,
  disabled = false,
  flatlistProps,
  unit,
  bgColor,
  showSearch = false,
  searchPlaceholder,
  ...props
}) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const [showActions, setShowActions] = useState<boolean>(false);
  const [value, setValue] = useState<any>(selected);
  const [itemSelected, setItemSelected] = useState<SelectItem | null>();
  const backgroundColor =
    bgColor || getBackgroundColor(disabled, error, false, value);
  const [search, setSearch] = useState<string>('');
  const searchDebounce = useDebounce(search, 350);

  const searchOptions = useMemo(() => {
    if (!searchDebounce || !showSearch) {
      return options;
    }

    const results = options?.filter?.(item => {
      const selectedLabel = parseLabelSelect(item, keyLabel, formatLabel);
      return selectedLabel
        ?.toLowerCase?.()
        ?.includes?.(searchDebounce?.toLowerCase?.() || '');
    });

    return results;
  }, [searchDebounce, showSearch, options, keyLabel, formatLabel]);

  const list = useMemo(
    () => (flatlistProps ? flatlistProps?.data : options),
    [flatlistProps, options]
  );

  useEffect(() => {
    if (selected) {
      setItemSelected(findSelectedItem(list, selected, keyId));
    } else {
      setItemSelected(null);
    }
  }, [options, list]);

  useEffect(() => {
    if (isUpdated) {
      if (selected) {
        setValue(selected);
        setItemSelected(findSelectedItem(list, selected, keyId));
      } else {
        setValue(null);
        setItemSelected(null);
      }
    }
  }, [selected, list]);

  const renderTitle = () => (
    <NavBar row paddingH-lg paddingT-md paddingB-sm>
      <TouchableOpacity onPress={() => setShowActions(false)}>
        <Text inputText>{t('common.cancel')}</Text>
      </TouchableOpacity>
      <View flex center>
        <Text bold text>
          {label}
        </Text>
      </View>
    </NavBar>
  );

  const onPressItem = (item: SelectItem) => {
    const selectedValue = keyId ? item?.[keyId] : item;
    setValue(selectedValue);
    setShowActions(false);
    onSelect?.(selectedValue);
    setItemSelected(selectedValue);
  };

  const renderAction = ({ item }: { item: SelectItem }) => {
    const isSelected = keyId ? item?.[keyId] === value : item === value;
    const selectedLabel = parseLabelSelect(item, keyLabel, formatLabel);
    return (
      <Pressable onPress={() => onPressItem(item)}>
        <View marginH-lg paddingV-sm borderB={0.3}>
          {!!item?.parentLabel && (
            <View marginL-nxs marginB-md>
              <Text mdText bold>
                {item?.parentLabel}
              </Text>
            </View>
          )}

          <View row spread>
            <Text inputText>{selectedLabel}</Text>
            <View height={16} center>
              {isSelected && (
                <Image medium assetName={'check'} tintColor={Colors.primary} />
              )}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const onDismiss = () => setShowActions(false);

  const renderSearch = () => {
    if (!showSearch) return null;

    return (
      <View flex padding-md>
        <TextInput
          iconLeft={'search'}
          iconLeftColor={Colors.subPurple}
          placeholder={searchPlaceholder}
          value={search}
          onChangeText={setSearch}
        />
      </View>
    );
  };

  const renderActions = () => (
    <Modal
      isVisible={showActions}
      useNativeDriver
      hideModalContentWhileAnimating
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
      onSwipeComplete={onDismiss}
      style={styles.modal}>
      <BottomWrapper disabled>
        <View
          height={height}
          width={'100%'}
          bg-white
          trRadius={RADIUS}
          tlRadius={RADIUS}>
          {renderTitle()}
          <View flex>
            {flatlistProps ? (
              <FList
                renderItem={renderAction}
                keyId={keyId}
                useSafeArea
                {...flatlistProps}
              />
            ) : (
              <FlatList
                keyExtractor={item => (keyId ? item?.[keyId] : item)}
                data={searchOptions}
                renderItem={renderAction}
                contentContainerStyle={{ paddingBottom }}
                ListHeaderComponent={renderSearch()}
              />
            )}
          </View>
        </View>
      </BottomWrapper>
    </Modal>
  );

  const renderSelected = () => {
    const selectedItem = findSelectedItem(list, itemSelected, keyId);
    const selectedLabel = selectedItem
      ? parseLabelSelect(selectedItem, keyLabel, formatLabel)
      : '';

    const borderColor = getBorderColor(disabled, error, selected);

    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          setShowActions(true);
        }}>
        {children?.({ value: itemSelected }) || (
          <View row centerV>
            <View
              row
              flex
              centerV
              padding-sm
              border
              borderColor={borderColor}
              backgroundColor={backgroundColor}
              bg-grey80={disabled}
              radius={Spacings.ii}>
              <View flex>
                <Text
                  marginR-iv
                  bodyText
                  grey={!selected}
                  alignCenter
                  numberOfLines={1}>
                  {selectedLabel || placeholder}
                </Text>
              </View>
              {!hideIcon && (
                <Image
                  normal
                  assetName={'chevron_down'}
                  resizeMode={'contain'}
                  tintColor={disabled ? Colors.lightBrown : Colors.darkGray}
                />
              )}
            </View>
            {!!unit && <Text marginL-sm>{unit}</Text>}
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

export default Select;
