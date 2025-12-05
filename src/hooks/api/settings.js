import * as Notifications from 'expo-notifications';
import isEqual from 'react-fast-compare';
import { useQueryClient } from 'react-query';

import { API, QUERY_INTERVAL_DELAY } from '@/configs/constants';
import useUnreadStore from '@/store/useUnreadStore';

import { useBaseInfinite } from '../useBaseInfinite';
import { useBaseMutation } from '../useBaseMutation';
import { useBaseQuery } from '../useBaseQuery';

export const useFAQList = () => {
  return useBaseQuery({ uri: API.FAQ.LIST, key: [API.FAQ.LIST] });
};

export const useUnread = () => {
  const unread = useUnreadStore(state => state.unread);

  const onUpdateBadgeIcon = async data => {
    const sum = data?.unread || 0;

    if (sum && typeof sum === 'number') {
      await Notifications.setBadgeCountAsync(sum);
    } else {
      await Notifications.setBadgeCountAsync(0);
    }
  };

  const onSuccess = data => {
    if (!isEqual(data, unread)) {
      useUnreadStore.setState({ unread: data });
    }
    onUpdateBadgeIcon(data);
  };

  return useBaseQuery({
    key: [API.ME.UNREAD],
    uri: API.ME.UNREAD,
    options: {
      refetchInterval: __DEV__
        ? QUERY_INTERVAL_DELAY.UNREAD_DEV
        : QUERY_INTERVAL_DELAY.UNREAD,
      keepPreviousData: true,
      onSuccess
    }
  });
};

export const useFootprintList = fromMe => {
  const uri = fromMe ? API.FOOTPRINT.MINE : API.FOOTPRINT.LIST;
  return useBaseInfinite({
    key: [uri],
    uri
  });
};

export const useFavoriteList = () =>
  useBaseInfinite({
    key: [API.FAVORITE.LIST],
    uri: API.FAVORITE.LIST
  });

export const useUnFavorite = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.FAVORITE.UNFAVORITE,
    onSuccess: () => {
      queryClient.invalidateQueries([API.FAVORITE.LIST]);
    }
  });
};

export const useFriendList = () =>
  useBaseInfinite({
    key: [API.MATCHED.LIST],
    uri: API.MATCHED.LIST
  });
