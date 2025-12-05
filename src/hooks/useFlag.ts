import { useState } from 'react';

export const useFlag = (
  initial = false
): [boolean, () => void, () => void, () => void] => {
  const [value, setValue] = useState<boolean>(initial);

  const setTrue = (): void => {
    setValue(true);
  };

  const setFalse = (): void => {
    setValue(false);
  };

  const setToggle = (): void => {
    setValue(prev => !prev);
  };

  return [value, setTrue, setFalse, setToggle];
};
