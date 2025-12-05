import {
  ControlFunctions,
  Options,
  useDebounce as useLibDebounce,
  useDebouncedCallback as useLibDebouncedCallback
} from 'use-debounce';

export interface DebouncedState<
  T extends (...args: any) => ReturnType<T>
> extends ControlFunctions<ReturnType<T>> {
  (...args: Parameters<T>): ReturnType<T>;
}

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue] = useLibDebounce(value, delay);
  return debouncedValue;
};

export const useDebouncedCallback = <T extends (...args: any) => ReturnType<T>>(
  callback: T,
  wait = 350,
  options: Options = {}
) => {
  return useLibDebouncedCallback(callback, wait, {
    leading: true,
    trailing: false,
    ...options
  }) as DebouncedState<T>;
};
