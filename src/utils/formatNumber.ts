import { FormatNumberOptions } from '@/types';

interface AddSignPrefixAndSuffixProps {
  sign?: '+' | '-' | '';
  prefix?: string;
  suffix?: string;
  signPosition: 'beforePrefix' | 'afterPrefix';
}

export const addSignPrefixAndSuffix = (
  value: any,
  options: AddSignPrefixAndSuffixProps
) => {
  const { prefix, sign, suffix, signPosition } = options;

  switch (signPosition) {
    case 'beforePrefix':
      return `${sign}${prefix}${value}${suffix}`;
    case 'afterPrefix':
      return `${prefix}${sign}${value}${suffix}`;
    default:
      return value;
  }
};

export const formatNumber = (input: number, options?: FormatNumberOptions) => {
  const {
    precision,
    separator = ',',
    delimiter = '.',
    prefix = '',
    suffix = '',
    ignoreNegative,
    showPositiveSign,
    signPosition = 'afterPrefix'
  } = options || {};

  const negative = ignoreNegative ? false : input < 0;
  let sign: '' | '+' | '-' = '';
  if (negative) {
    sign = '-';
  } else if (showPositiveSign) {
    sign = '+';
  }

  const string = Math.abs(input).toFixed(precision);

  const parts = string.split('.');
  const buffer = [];

  let number = parts[0];
  while (number.length > 0) {
    buffer.unshift(number.substring(Math.max(0, number.length - 3)));
    number = number.substring(0, number.length - 3);
  }

  let formattedNumber = '';
  formattedNumber = buffer.join(delimiter);

  const decimals = parts[1];
  if (!!precision && decimals) {
    formattedNumber += separator + decimals;
  }

  return addSignPrefixAndSuffix(formattedNumber, {
    prefix,
    suffix,
    sign,
    signPosition
  });
};
