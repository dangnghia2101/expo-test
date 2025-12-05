import { API } from 'configs/constants';

import { useBaseInfinite } from '../useBaseInfinite';

export const useFetchAction = (defaultQuery = {}) => {
  return useBaseInfinite({
    key: [API.ACTION.LIST, defaultQuery],
    uri: API.ACTION.LIST,
    params: defaultQuery
  });
};
