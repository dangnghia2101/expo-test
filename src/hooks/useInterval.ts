import { useRef, useEffect } from 'react';

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return null;
    }
    const tick = () => {
      savedCallback.current?.();
    };
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
};
