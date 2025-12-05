import { useCallback } from 'react';

import { AxiosError } from 'axios';
import { get, last, omit } from 'lodash';
import { useInfiniteQuery } from 'react-query';

import { STALE_TIME } from '@/configs/constants';
import apiInstance from '@/services/axios';
import {
  IInfiniteResponse,
  UseInfiniteParams,
  UseInfiniteResult
} from '@/types';
import { deDuplicate, showCommonError } from '@/utils';

export const useBaseInfinite = <
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
  instance = apiInstance
}: UseInfiniteParams<TData, TError, TVariables>): UseInfiniteResult<
  TData,
  TError
> => {
  if (!uri || !key) {
    throw new Error('Missing key or uri');
  }

  const queryKey = Array.isArray(key) ? key : [key, { ...(params || {}) }];

  const result = useInfiniteQuery<TData, AxiosError<TError>>(
    queryKey,
    async ({ pageParam = 0 }) => {
      const { data } = await instance.request<TData>({
        url: uri,
        method,
        headers,
        params: {
          page: pageParam,
          pageSize: 10,
          ...params
        },
        data: body
      });
      return data;
    },
    {
      select: prev => {
        const { pages = [] } = prev || {};
        const items = pages.flatMap(item => get(item, 'results') || []);
        const iteratee = options?.iteratee || 'id';
        const pagesWithUniqueItems = deDuplicate([...items.flat()], iteratee);
        const lastPage = last(pages) as IInfiniteResponse<TData>;

        return {
          ...prev,
          ...lastPage,
          pages: pagesWithUniqueItems as TData[]
        };
      },
      getNextPageParam: _lastPage => {
        const lastPage = _lastPage as IInfiniteResponse<TData>;
        if (lastPage.currentPage < lastPage.totalPages - 1) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
      staleTime: STALE_TIME,
      ...options
    }
  );

  const { hasNextPage, fetchNextPage } = result;

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage?.();
    }
  }, [hasNextPage]);

  return {
    ...result,
    response: omit(result?.data, [
      'pages',
      'pageParams'
    ]) as IInfiniteResponse<TData>,
    data: result?.data?.pages || [],
    loadMore
  };
};
