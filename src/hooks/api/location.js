import { API } from '@/configs/constants';

import { useBaseQuery } from '../useBaseQuery';

export const useLocation = () => {
  return useBaseQuery({
    uri: API.LOCATION.LIST,
    key: [API.LOCATION.LIST]
  });
};
