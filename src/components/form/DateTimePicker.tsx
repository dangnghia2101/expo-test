import React, { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import i18n from 'i18next';
import { Pressable, Keyboard, ViewStyle } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { View, Colors, Text, Image, Spacings } from 'react-native-ui-lib';
import { ViewProps } from 'react-native-ui-lib/src/components/view';

import { useFlag } from '@/hooks';
import { t } from 'lang';
import { compareDate, getBackgroundColor, getBorderColor } from 'utils';

import WrapInput from './WrapInput';

interface DateTimePickerProps extends Omit<ViewProps, 'children' | 'style'> {
  bgColor?: string;
  placeholder?: string;
  error?: string;
  icon?: string;
  iconGroup?: string;
  style?: ViewStyle;
  mode?: 'date' | 'time' | 'datetime';
  date: Date;
  description?: string;
  formatDate?: string;
  children?: (value: Date) => React.ReactNode;
  onConfirm?: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  title?: string;
  required?: boolean;
  disabled?: boolean;
  isUpdated?: boolean;
  withColon?: boolean;
  borderColor?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  bgColor: _bgColor,
  placeholder,
  error = '',
  icon = 'calendar',
  iconGroup,
  style,
  mode = 'date',
  date = null,
  description,
  formatDate,
  children,
  onConfirm,
  minimumDate,
  maximumDate,
  title,
  required = false,
  disabled = false,
  isUpdated = false,
  withColon = false,
  borderColor: _borderColor,
  ...props
}) => {
  const [isVisible, _onShow, onHide] = useFlag(false);
  const [value, setValue] = useState<Date>(date);
  const borderColor = _borderColor || getBorderColor(disabled, error, value);
  const bgColor = _bgColor || getBackgroundColor(disabled, error);

  const getInitDate = () => {
    if (maximumDate && compareDate(maximumDate) > 0) {
      return maximumDate;
    }
    if (minimumDate && compareDate(minimumDate) < 0) {
      return minimumDate;
    }
    return dayjs().toDate();
  };

  const initDate = getInitDate();

  const onShow = () => {
    Keyboard.dismiss();
    _onShow();
  };

  useEffect(() => {
    if (isUpdated) {
      setValue(date);
    }
  }, [date]);

  useEffect(() => {
    if (date !== value) {
      setValue(date);
    }
  }, [date]);

  const renderPlaceholder = () => (
    <>
      <View flex centerV>
        {!value ? (
          <Text grey numberOfLines={1}>
            {placeholder}
          </Text>
        ) : (
          <Text>
            {dayjs(value).format(formatDate || t(`format_string.${mode}`))}
          </Text>
        )}
      </View>
      <Image
        normal
        assetName={icon}
        assetGroup={iconGroup}
        tintColor={value ? Colors.grey : Colors.primary}
      />
    </>
  );

  const onConfirmDate = (selectedDate: Date) => {
    onConfirm?.(selectedDate);
    setValue(selectedDate);
    onHide();
  };

  return (
    <View {...props}>
      <WrapInput
        title={title}
        withColon={withColon}
        required={required}
        error={error}
        description={description}>
        <Pressable disabled={disabled} onPress={onShow}>
          {children?.(value) || (
            <View
              row
              centerV
              paddingV-xs
              paddingH-sm
              border={Spacings.i}
              borderColor={borderColor}
              radius={Spacings.xs}
              paddingL-md
              paddingV-sm
              paddingR-sm
              backgroundColor={bgColor}
              customStyle={style}>
              {renderPlaceholder()}
            </View>
          )}
        </Pressable>
      </WrapInput>
      <DatePicker
        modal
        open={isVisible}
        timeZoneOffsetInMinutes={dayjs().utcOffset()}
        date={value || initDate}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        locale={i18n.language}
        title={t('common.pick_date')}
        cancelText={t('common.cancel')}
        confirmText={t('common.confirm')}
        mode={mode}
        is24hourSource={'device'}
        onConfirm={onConfirmDate}
        onCancel={onHide}
      />
    </View>
  );
};
export default DateTimePicker;
