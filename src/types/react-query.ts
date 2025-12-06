import {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponseTransformer,
  Method,
  RawAxiosRequestHeaders
} from 'axios';
import {
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from 'react-query';

export interface UseBaseMutationParams<TVariables, TData, TError, TContext> {
  uri: string;
  method?: Method;
  headers?: RawAxiosRequestHeaders;
  onSuccess?: (data: TData) => void;
  onError?: (error: AxiosError<TError>) => void;
  options?: UseMutationOptions<TData, AxiosError<TError>, TVariables, TContext>;
  instance?: AxiosInstance;
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  useFetchBlob?: boolean;
}

export interface RequestBody {
  uriParams?: Record<string, unknown>;
  params?: Record<string, unknown>;
  [key: string]: any;
}

export type UseBaseMutationResult<TData, TError, TVariables, TContext> =
  UseMutationResult<TData, AxiosError<TError>, TVariables, TContext> & {
    doRequest: (
      body: TVariables & RequestBody,
      _onSuccess?: (data: TData) => void,
      _onError?: (error: AxiosError<TError>) => void
    ) => void;
    doRequestAsync: (
      body: TVariables & RequestBody,
      _onSuccess?: (data: TData) => void,
      _onError?: (error: AxiosError<TError>) => void
    ) => Promise<TData>;
    loading: boolean;
  };

export interface UseBaseQueryParams<TData, TError, TVariables> {
  uri: string;
  method?: Method;
  headers?: AxiosRequestHeaders;
  params?: TVariables;
  body?: TVariables;
  options?: UseQueryOptions<TData, AxiosError<TError>>;
  key: string | string[] | object[] | unknown[];
  instance?: AxiosInstance;
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
}

export type UseBaseQueryResult<TData, TError> = UseQueryResult<TData, TError>;

export type UseBaseInfiniteQueryOptions<TData, TError> =
  UseInfiniteQueryOptions<TData, AxiosError<TError>> & {
    iteratee?: string;
  };

export interface UseInfiniteParams<TData, TError, TVariables> {
  uri: string;
  method?: Method;
  headers?: AxiosRequestHeaders;
  params?: TVariables;
  body?: TVariables;
  options?: UseBaseInfiniteQueryOptions<TData, TError>;
  key: string | string[] | object[] | unknown[];
  instance?: AxiosInstance;
}

export interface IInfiniteResponse<TData> {
  page: number;
  results: TData[];
  total_results: number;
  total_pages: number;
}

export type UseInfiniteResult<TData, TError> = Omit<
  UseInfiniteQueryResult<TData, AxiosError<TError>>,
  'data' | 'refetch'
> & {
  response: IInfiniteResponse<TData>;
  data: TData[];
  loadMore: () => void;
  refetch: () => Promise<void>;
};
