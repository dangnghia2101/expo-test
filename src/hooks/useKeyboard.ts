import { useEffect, useState } from 'react';

import { Keyboard, KeyboardEvent } from 'react-native';

interface KeyboardState {
  isKeyboardShow: boolean;
  keyboardHeight: number;
}

export function useKeyboard(): KeyboardState {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);

  const handleKeyboardWillShow = (e: KeyboardEvent): void => {
    setKeyboardHeight(e.endCoordinates.height);
    setIsKeyboardShow(true);
  };
  const handleKeyboardDidShow = (): void => {
    setIsKeyboardShow(true);
  };
  const handleKeyboardWillHide = (): void => {
    setKeyboardHeight(0);
    setIsKeyboardShow(false);
  };
  const handleKeyboardDidHide = (): void => {
    setIsKeyboardShow(false);
  };

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow),
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
      Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide),
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)
    ];

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, []);

  return {
    isKeyboardShow,
    keyboardHeight
  };
}
