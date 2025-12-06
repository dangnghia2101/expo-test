import React, { useState, useRef } from 'react';

import {
  TextInput as RNTextInput,
  StyleSheet,
  Pressable,
  TextInputProps,
  ReturnKeyTypeOptions,
  TextStyle,
  ViewStyle,
  Platform
} from 'react-native';
import { Colors, View, Spacings, Image, Typography } from 'react-native-ui-lib';

import { IMAGE_SIZES } from '@/configs/constants';
import Fonts from '@/configs/ui/fonts';
import { getBackgroundColor, getBorderColor, getValueColor } from 'utils';

import WrapInput from './WrapInput';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  placeholderTextColor?: string;
  style?: ViewStyle;
  radius?: number;
  onFocus?: () => void;
  onPressIn?: () => void;
  onSubmitEditing?: () => void;
  inputStyle?: TextStyle;
  error?: string;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
  flex?: boolean;
  iconLeft?: string;
  iconLeftGroup?: string;
  iconLeftColor?: string;
  onPressLeft?: () => void;
  iconRight?: string;
  iconRightGroup?: string;
  iconRightColor?: string;
  sizeIconLeft?: number;
  sizeIconRight?: number;
  onPressRight?: () => void;
  letterSpacing?: number;
  description?: string;
  onBlur?: () => void;
  disabled?: boolean;
  title?: string;
  required?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  eyePassword?: boolean;
  withColon?: boolean;
  bold?: boolean;
  maxHeight?: number;
  typography?: TextStyle;
  showClear?: boolean;
  styleIcon?: ViewStyle;
  textColor?: string;
}

const Input: React.FC<InputProps> = ({
  bgColor,
  borderColor,
  borderWidth = Spacings.i,
  placeholderTextColor = Colors.gray,
  style,
  radius = Spacings.iv,
  onFocus,
  onPressIn,
  onSubmitEditing,
  inputStyle,
  placeholder,
  multiline,
  value,
  onChangeText,
  maxLength,
  error,
  renderLeft,
  renderRight,
  keyboardType,
  flex,
  iconLeft,
  iconLeftGroup,
  iconLeftColor,
  onPressLeft,
  iconRight,
  iconRightGroup,
  iconRightColor,
  sizeIconLeft = IMAGE_SIZES.normal,
  sizeIconRight = IMAGE_SIZES.normal,
  onPressRight,
  letterSpacing,
  description,
  defaultValue = '',
  onBlur,
  textContentType,
  disabled = false,
  title = '',
  required = false,
  returnKeyType = 'done',
  eyePassword = false,
  withColon = false,
  bold = false,
  maxHeight,
  typography = Typography.bodyText,
  showClear = false,
  styleIcon,
  autoCapitalize,
  textColor: _textColor,
  selection,
  autoFocus,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(eyePassword);
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef<RNTextInput | null>(null);

  const backgroundColor =
    bgColor || getBackgroundColor(disabled, error, isFocus, value);
  const border = borderColor || getBorderColor(disabled, error, value, isFocus);
  const textColor = _textColor || getValueColor(disabled, true);
  const fontFamily = bold ? Fonts.BOLD : Fonts.REGULAR;

  const toggleEye = () => setShowPassword(p => !p);

  const onClear = () => {
    inputRef.current?.clear?.();
    onChangeText?.('');
  };

  const handleFocus = () => {
    setIsFocus(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocus(false);
    onBlur?.();
  };

  const renderLeftComponent = () =>
    !!iconLeft && (
      <View marginL-sm customStyle={styleIcon}>
        <Pressable onPress={onPressLeft}>
          <Image
            size={sizeIconLeft}
            assetName={iconLeft}
            assetGroup={iconLeftGroup}
            tintColor={iconLeftColor}
          />
        </Pressable>
      </View>
    );

  const renderRightComponent = () =>
    !!iconRight && (
      <View marginR-sm customStyle={styleIcon}>
        <Pressable onPress={onPressRight}>
          <Image
            size={sizeIconRight}
            assetName={iconRight}
            assetGroup={iconRightGroup}
            tintColor={iconRightColor}
          />
        </Pressable>
      </View>
    );

  return (
    <WrapInput
      title={title}
      withColon={withColon}
      required={required}
      error={error}
      description={description}
      isFocus={isFocus}
      flex={flex}
      {...props}>
      <View
        maxHeight={maxHeight}
        borderColor={border}
        border={borderWidth}
        radius={radius}
        backgroundColor={backgroundColor}
        customStyle={style}>
        <View flex={flex} row center>
          {renderLeft || renderLeftComponent()}
          <RNTextInput
            ref={inputRef}
            editable={!disabled}
            multiline={multiline}
            defaultValue={defaultValue}
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.input,
              inputStyle,
              {
                fontFamily,
                borderRadius: radius,
                letterSpacing,
                color: textColor,
                ...typography,
                lineHeight:
                  Platform.OS === 'ios'
                    ? typography.lineHeight - Spacings.ii
                    : typography.lineHeight
              }
            ]}
            maxLength={maxLength}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onPressIn={onPressIn}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            secureTextEntry={showPassword}
            returnKeyType={returnKeyType}
            textContentType={textContentType}
            autoCapitalize={autoCapitalize}
            autoFocus={autoFocus}
            selection={selection}
          />
          {showClear && !!value && (
            <Pressable onPress={onClear} style={styleIcon}>
              <Image marginR-sm normal assetName="close" />
            </Pressable>
          )}
          {eyePassword && (
            <Pressable onPress={toggleEye} style={styleIcon}>
              <Image
                normal
                assetName={showPassword ? 'hidden_eye' : 'eye'}
                marginR-sm
                tintColor={value ? Colors.black : Colors.gray}
              />
            </Pressable>
          )}
          {!!error && <Image normal assetName={'error'} marginR-sm />}
          {renderRight || renderRightComponent()}
        </View>
      </View>
    </WrapInput>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: Spacings.xlviii,
    color: Colors.black,
    padding: Spacings.sm,
    textAlignVertical: 'center'
  }
});

export default Input;
