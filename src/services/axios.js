import axios from 'axios';
import RNFetchBlob from 'react-native-blob-util';

import { API_URL, API_URL_UPLOAD, TIMEOUT } from '@/configs/constants';
import useUserStore from '@/store/useUserStore';
import { buildURL } from '@/utils/buildURL';

const instance = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT
});

export function setDefaultHeaders(headers) {
  Object.keys(headers).forEach(key => {
    instance.defaults.headers.common[key] = headers[key];
  });
}

export const fetchBlob = async ({
  method,
  uri,
  body,
  query,
  headers,
  success,
  failure
} = {}) => {
  try {
    const resp = await RNFetchBlob.fetch(
      method,
      buildURL(`${API_URL_UPLOAD}/${uri}`, query),
      {
        ...instance.defaults.headers.common,
        'Accept-Encoding': null,
        'Content-Type': 'multipart/form-data',
        ...headers
      },
      body
    );

    if (resp.respInfo.status === 200 || resp.respInfo.status === 201) {
      return success?.(JSON.parse(resp.data));
    }

    return failure?.(JSON.parse(resp.data));
  } catch (err) {
    return failure?.(err);
  }
};

instance.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      setDefaultHeaders({
        Authorization: null
      });
      useUserStore.getState().logout();
      // Navigator.reset(Screens.Login);
    }

    return Promise.reject(error);
  }
);

export default instance;
