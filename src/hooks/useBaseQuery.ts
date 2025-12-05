import { AxiosResponse, AxiosError } from 'axios';
import { UseBaseQueryResult, useQuery } from 'react-query';

import apiInstance from '@/services/axios';
import { UseBaseQueryParams } from '@/types';

export const useBaseQuery = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown
>({
  uri,
  method = 'get',
  headers,
  params,
  body,
  options = {},
  key,
  instance = apiInstance,
  transformResponse
}: UseBaseQueryParams<TData, TError, TVariables>): UseBaseQueryResult<
  TData,
  AxiosError<TError>
> => {
  if (!key || !uri) {
    throw new Error('Missing key or uri');
  }

  const result = useQuery<TData, AxiosError<TError>>(
    key,
    async () => {
      const response: AxiosResponse<TData> = await instance.request<TData>({
        url: uri,
        method,
        headers,
        params,
        data: body,
        transformResponse
      });
      return response.data;
    },
    {
      retry: false,
      ...options
    }
  );

  return result;
};
