import React, { useState } from 'react';

import {
  TextInput,
  StyleSheet,
  TextInputProps,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
  TextStyle
} from 'react-native';
import {
  Colors,
  View,
  Spacings,
  Text,
  Typography,
  ViewProps
} from 'react-native-ui-lib';

import { t } from 'lang';
import {
  getBackgroundColor,
  getBorderColor,
  getBorderColorFocus
} from 'utils/form';

import WrapInput from './WrapInput';

interface InputProps extends Omit<ViewProps, 'children'> {
  bgColor?: string;
  borderColor?: string;
  placeholderTextColor?: string;
  style?: ViewProps['style'];
  radius?: number;
  onFocus?: () => void;
  onPressIn?: () => void;
  onSubmitEditing?: () => void;
  inputStyle?: TextInputProps['style'];
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  error?: string;
  height?: number;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  description?: string;
  defaultValue?: string;
  onBlur?: () => void;
  disabled?: boolean;
  title?: string;
  required?: boolean;
  withColon?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  typography?: TextStyle;
  lines?: number;
  border?: number;
  unBorder?: boolean;
}

const Input: React.FC<InputProps> = ({
  bgColor,
  borderColor,
  placeholderTextColor = Colors.gray,
  style,
  radius = Spacings.iv,
  onFocus,
  onPressIn,
  onSubmitEditing,
  inputStyle,
  placeholder,
  value,
  onChangeText,
  maxLength,
  error,
  height: h,
  keyboardType,
  secureTextEntry,
  description,
  defaultValue = '',
  onBlur,
  disabled = false,
  title = '',
  required = false,
  withColon = false,
  returnKeyType = 'done',
  typography = Typography.bodyText,
  lines = 4,
  border,
  unBorder,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const backgroundColor =
    bgColor || getBackgroundColor(disabled, error, isFocus);
  const borderInput =
    borderColor || getBorderColor(disabled, error, value, isFocus);
  const borderFocus = getBorderColorFocus(error, isFocus);
  const height = h || lines * typography.lineHeight + Spacings.sm * 2;

  const handleFocus = (): void => {
    setIsFocus(true);
    onFocus?.();
  };

  const handleBlur = (): void => {
    setIsFocus(false);
    onBlur?.();
  };

  return (
    <WrapInput
      title={title}
      withColon={withColon}
      required={required}
      error={error}
      description={description}
      isFocus={isFocus}
      {...props}>
      <View
        radius={Spacings.iv}
        border={border || unBorder ? Spacings.z : Spacings.ii}
        borderColor={borderFocus}>
        <View
          radius={Spacings.ii}
          height={height}
          border={unBorder ? Spacings.z : border || Spacings.i}
          borderColor={borderInput}
          customStyle={style}>
          <TextInput
            multiline
            editable={!disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            defaultValue={defaultValue}
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.textArea,
              inputStyle,
              typography,
              {
                height,
                backgroundColor,
                borderRadius: radius
              }
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onPressIn={onPressIn}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            returnKeyType={returnKeyType}
            {...props}
          />
        </View>
      </View>
      {!!maxLength && !!value && (
        <View right marginR-sm marginB-xs marginT-ii>
          <Text subText gray>
            {t('common.chars_left', {
              count: value?.length || 0,
              max: maxLength
            })}
          </Text>
        </View>
      )}
    </WrapInput>
  );
};

const styles = StyleSheet.create({
  textArea: {
    flex: 1,
    color: Colors.black,
    paddingHorizontal: Spacings.md,
    marginVertical: Spacings.sm,
    paddingTop: Spacings.z,
    paddingBottom: Spacings.z,
    textAlignVertical: 'top'
  }
});

export default Input;
