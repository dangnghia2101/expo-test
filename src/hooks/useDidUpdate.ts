import React, { useEffect, useRef } from 'react';

/**
 * This hook avoids calling useEffect on the initial mount
 */
const useDidUpdate = (
  callback: () => void,
  deps: React.DependencyList
): void => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      callback();
    } else {
      isMounted.current = true;
    }
  }, deps);
};

export default useDidUpdate;
