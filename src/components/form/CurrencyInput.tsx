import * as React from 'react';

import { CurrencyInputProps } from '@/types';
import { addSignPrefixAndSuffix, formatNumber } from '@/utils';

import TextInput from './TextInput';

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChangeText,
  separator,
  delimiter,
  prefix = '',
  suffix = '',
  precision = 2,
  maxValue,
  minValue,
  signPosition = 'afterPrefix',
  showPositiveSign,
  selection,
  ...props
}) => {
  const [startingWithSign, setStartingWithSign] = React.useState<'-' | '+'>();

  const noNegativeValues = typeof minValue === 'number' && minValue >= 0;
  const noPositiveValues = typeof maxValue === 'number' && maxValue <= 0;

  const formattedValue = React.useMemo(() => {
    if (!!value || value === 0) {
      return formatNumber(value, {
        separator,
        prefix,
        suffix,
        precision,
        delimiter,
        ignoreNegative: noNegativeValues,
        signPosition,
        showPositiveSign
      });
    }
    return '';
  }, [
    value,
    separator,
    prefix,
    suffix,
    precision,
    delimiter,
    noNegativeValues,
    signPosition,
    showPositiveSign
  ]);

  const handleChangeText = React.useCallback(
    (text: string) => {
      let textWithoutPrefix = text;

      if (prefix) {
        textWithoutPrefix = text.replace(prefix, '');
        if (textWithoutPrefix === text) {
          textWithoutPrefix = text.replace(prefix.slice(0, -1), '');
        }
      }

      let textWithoutPrefixAndSufix = textWithoutPrefix;
      if (suffix) {
        const suffixRegex = new RegExp(`${suffix}([^${suffix}]*)$`);
        textWithoutPrefixAndSufix = textWithoutPrefix.replace(suffixRegex, '');
        if (textWithoutPrefixAndSufix === textWithoutPrefix) {
          textWithoutPrefixAndSufix = textWithoutPrefix.replace(
            suffix.slice(1),
            ''
          );
        }
      }

      // Starting with a minus or plus sign
      if (/^(-|-0)$/.test(text) && !noNegativeValues) {
        setStartingWithSign('-');
        return;
      }
      if (/^(\+|\+0)$/.test(text) && !noPositiveValues) {
        setStartingWithSign('+');

        return;
      }
      setStartingWithSign(undefined);

      const isNegativeValue = textWithoutPrefixAndSufix.includes('-');

      const textNumericValue = textWithoutPrefixAndSufix.replace(/\D+/g, '');

      const numberValue = Number(textNumericValue) * (isNegativeValue ? -1 : 1);

      const zerosOnValue = textNumericValue.replace(/[^0]/g, '').length;

      let newValue: number | null;

      if (!textNumericValue || (!numberValue && zerosOnValue === precision)) {
        // Allow to clean the value instead of beign 0
        newValue = null;
      } else {
        newValue = numberValue / 10 ** precision;
      }

      if (newValue && maxValue && newValue > maxValue) {
        return;
      }
      if (newValue && minValue && newValue < minValue) {
        return;
      }

      if (onChangeText) {
        onChangeText(newValue);
      }
    },
    [
      suffix,
      prefix,
      noNegativeValues,
      noPositiveValues,
      precision,
      maxValue,
      minValue,
      onChangeText
    ]
  );

  const textInputValue = React.useMemo(() => {
    return startingWithSign
      ? addSignPrefixAndSuffix(formattedValue, {
          prefix,
          suffix,
          sign: startingWithSign,
          signPosition
        })
      : formattedValue;
  }, [formattedValue, prefix, signPosition, startingWithSign, suffix]);

  return (
    <TextInput
      keyboardType={'numeric'}
      selection={
        suffix
          ? { start: Math.max(textInputValue.length - suffix.length, 0) }
          : selection
      }
      value={textInputValue}
      onChangeText={handleChangeText}
      {...props}
    />
  );
};

export default CurrencyInput;
