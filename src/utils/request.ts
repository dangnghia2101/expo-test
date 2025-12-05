import { AxiosError } from 'axios';
import { get } from 'lodash';
import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';

import { AlertState } from '@/components';
import { ALERT_TYPE } from '@/configs/constants';
import { t } from '@/lang';
import api from '@/services/axios';
import { IBaseError, RequestBody } from '@/types';

import { buildURL } from './buildURL';
import { showAlert } from './global';

export function getErrorCode(error: AxiosError<IBaseError | unknown>) {
  return get(error?.response?.data, 'code', error?.code);
}

export function getErrorMessage(error: AxiosError<IBaseError | unknown>) {
  return get(error?.response?.data, 'message', error?.message);
}

export function showCommonError(
  error: AxiosError<IBaseError | unknown>,
  {
    type = ALERT_TYPE.POPUP,
    defaultError = 'error_occurred',
    ...rest
  }: AlertState & {
    defaultError?: string;
  } = {}
) {
  const message = getErrorMessage(error);
  const code = getErrorCode(error);

  if (Number(code) >= 500) {
    // server error
    showAlert({
      type: ALERT_TYPE.POPUP,
      message: t('code_error.server_error'),
      labelButton: t('common.yes')
    });
    return;
  }

  showAlert({
    type,
    message: t([
      `code_error.${message}`,
      `code_error.${code}`,
      `code_error.${defaultError}`
    ]),
    ...rest
  });
}

export const convertBody = (
  body: Omit<RequestBody, 'params' | 'uriParams'>
) => {
  const _body = Object.keys(body || {})
    .map(name => {
      // ===
      if (body[name] && body[name].isFile && body[name].paths) {
        return body[name].paths?.map(filePath => {
          if (!filePath) {
            return null;
          }
          if (Platform.OS === 'ios' && filePath.startsWith('file://')) {
            filePath = filePath.replace('file://', '');
          }
          const filename = filePath.split('/').splice(-1)[0];
          return {
            name,
            filename,
            data: RNFetchBlob.wrap(filePath)
          };
        });
      }
      // ===
      if (body[name] && body[name].isFile && body[name].path) {
        let filePath = body[name].path;
        if (!filePath) {
          return null;
        }
        if (Platform.OS === 'ios' && filePath.startsWith('file://')) {
          filePath = filePath.replace('file://', '');
        }
        const filename = filePath.split('/').splice(-1)[0];
        return {
          name,
          filename,
          data: RNFetchBlob.wrap(filePath)
        };
      }
      // ===
      if (typeof body[name] !== 'object' && typeof body[name] !== 'undefined') {
        return {
          name,
          data: `${body[name]}`
        };
      }
      // ===
      return {};
    })
    .flat()
    .filter(item => !!item.name);

  return _body;
};

export async function request<T>({
  method = 'get',
  url,
  query,
  params,
  success,
  failure,
  headers
}: {
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  query?: string | Record<string, unknown>;
  params?: any;
  success?: (data: T) => any;
  failure?: (error: { message?: string; errorCode?: string }) => any;
  headers?: Record<string, string>;
}): Promise<T | undefined> {
  const axiosMethod = api[method];
  if (typeof axiosMethod === 'function') {
    try {
      const result =
        method === 'get'
          ? await axiosMethod(buildURL(url, query), { headers })
          : await axiosMethod(buildURL(url, query), params, { headers });

      if (result.status === 200 || result.status === 201) {
        if (typeof success === 'function') {
          return success(result.data);
        }
        return result as T;
      }
      throw result;
    } catch (err) {
      if (typeof failure === 'function') {
        return failure({
          message: err?.response?.data?.message,
          errorCode: err?.response?.data?.code
        });
      }
      console.error(err);
    }
  }
  return undefined;
}
