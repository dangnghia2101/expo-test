import { AxiosError } from 'axios';
import { get } from 'lodash';
import { UseMutationResult, useMutation } from 'react-query';

import apiInstance, { fetchBlob } from '@/services/axios';
import {
  RequestBody,
  UseBaseMutationParams,
  UseBaseMutationResult
} from '@/types';
import { convertBody, showCommonError } from '@/utils';

import { useDebouncedCallback } from './useDebounce';

export const useBaseMutation = <
  TVariables extends RequestBody,
  TData = unknown,
  TError = unknown,
  TContext = unknown
>({
  uri,
  method = 'post',
  headers,
  onSuccess,
  onError,
  options = {},
  instance = apiInstance,
  transformResponse,
  useFetchBlob
}: UseBaseMutationParams<
  TVariables,
  TData,
  TError,
  TContext
>): UseBaseMutationResult<TData, TError, TVariables, TContext> => {
  if (!uri) {
    throw new Error('Missing uri');
  }

  const mutationResult: UseMutationResult<
    TData,
    AxiosError<TError>,
    TVariables,
    TContext
  > = useMutation<TData, AxiosError<TError>, TVariables, TContext>(
    async (body: TVariables) => {
      let _uri = uri;
      const { params, uriParams, ..._body } = body || {};

      if (typeof uriParams === 'object') {
        Object.keys(uriParams).forEach(key => {
          const _key = get(uriParams, key) as string;
          _uri = _uri.replace(`:${key}`, _key);
        });
      }

      if (useFetchBlob) {
        const fetchBlobBody = convertBody(_body);
        const hasFile = fetchBlobBody.some(item => !!item?.filename);
        if (hasFile) {
          return fetchBlob({
            uri: _uri,
            method,
            headers,
            query: params,
            body: fetchBlobBody,
            success: res => res,
            failure: err => {
              throw err;
            }
          });
        }
      }

      const _data = method?.toLowerCase?.() === 'get' ? undefined : _body;

      const { data } = await instance.request<TData>({
        url: _uri,
        method,
        headers,
        params,
        data: _data,
        transformResponse
      });

      return data;
    },
    {
      onError: onError || showCommonError,
      onSuccess: (data: TData) => {
        if (typeof onSuccess === 'function') {
          onSuccess(data);
        }
      },
      ...options
    }
  );

  const doRequest = useDebouncedCallback(
    (
      body: TVariables,
      _onSuccess?: (data: TData) => void,
      _onError?: (error: AxiosError<TError>) => void
    ) =>
      mutationResult.mutate(body, {
        onSuccess: _onSuccess,
        onError: _onError
      })
  );

  const doRequestAsync = useDebouncedCallback(
    (
      body: TVariables,
      _onSuccess?: (data: TData) => void,
      _onError?: (error: AxiosError<TError>) => void
    ) =>
      mutationResult.mutateAsync(body, {
        onSuccess: _onSuccess,
        onError: _onError
      })
  );

  return {
    doRequest,
    doRequestAsync,
    loading: mutationResult.isLoading,
    ...mutationResult
  };
};
