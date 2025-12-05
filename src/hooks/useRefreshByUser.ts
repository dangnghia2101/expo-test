import { useState } from 'react';

/* React Native RefreshControl component flickering with useQuery
 * https://github.com/tannerlinsley/react-query/issues/2380
 */

type RefetchFunction = () => Promise<any>;

export function useRefreshByUser(refetch: RefetchFunction | RefetchFunction[]) {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState<boolean>(false);

  async function refetchByUser(): Promise<void> {
    setIsRefetchingByUser(true);

    try {
      const runRefetch = [refetch].flat().map(refetchFunc => refetchFunc());
      await Promise.allSettled(runRefetch);
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser
  };
}
