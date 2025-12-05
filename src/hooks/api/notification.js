import { useQueryClient } from 'react-query';

import { API } from '@/configs/constants';
import Navigator from '@/navigations/Navigator';

import { useBaseInfinite } from '../useBaseInfinite';
import { useBaseMutation } from '../useBaseMutation';
import { useBaseQuery } from '../useBaseQuery';

export const useGetNotificationSetting = () => {
  return useBaseQuery({
    uri: API.NOTIFICATION.LIST_SETTING,
    key: [API.NOTIFICATION.LIST_SETTING]
  });
};

export const useUpdateNotificationSetting = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.NOTIFICATION.LIST_SETTING,
    onSuccess: () => {
      queryClient.invalidateQueries([API.NOTIFICATION.LIST_SETTING]);
    }
  });
};

export const useNotification = () =>
  useBaseInfinite({
    key: [API.NOTIFICATION.LIST],
    uri: API.NOTIFICATION.LIST
  });

export const useDeleteAllNotification = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.NOTIFICATION.DELETE_ALL,
    method: 'DELETE',
    onSuccess: () => {
      queryClient.invalidateQueries([API.NOTIFICATION.LIST]);
    }
  });
};

export const useNotificationDetail = id => {
  return useBaseQuery({
    key: [API.NOTIFICATION, id],
    uri: API.NOTIFICATION.DETAIL.replace(':id', id)
  });
};

export const useDeleteNotification = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.NOTIFICATION.DELETE.replace(':id', id),
    method: 'DELETE',
    onSuccess: () => {
      Navigator.goBack();
      queryClient.invalidateQueries([API.NOTIFICATION.LIST_SETTING]);
    }
  });
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.NOTIFICATION.READ_NOTIFICATION,
    method: 'get',
    onSuccess: () => {
      queryClient.invalidateQueries([API.NOTIFICATION.LIST]);
      queryClient.invalidateQueries([API.ME.UNREAD]);
    }
  });
};
