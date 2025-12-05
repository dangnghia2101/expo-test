import { useEffect } from 'react';

import { appLoading } from '@/configs/constants';

export const useLoading = (loading: boolean) => {
  useEffect(() => {
    appLoading?.current?.update?.(loading);

    return () => {
      appLoading?.current?.update?.(false);
    };
  }, [loading]);
};
