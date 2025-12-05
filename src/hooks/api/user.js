import { Colors, Spacings } from 'react-native-ui-lib';
import { useQueryClient } from 'react-query';

import { ALERT_TYPE, API, IMAGE_SIZES, Screens } from '@/configs/constants';
import { t } from '@/lang';
import Navigator from '@/navigations/Navigator';
import { showAlert } from '@/utils/global';

import { useBaseInfinite } from '../useBaseInfinite';
import { useBaseMutation } from '../useBaseMutation';
import { useBaseQuery } from '../useBaseQuery';

export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.USER.BLOCK,
    onSuccess: () => {
      queryClient.invalidateQueries([API.CONVERSATION.LIST]);
      queryClient.invalidateQueries([API.TWEET.LIST]);
      queryClient.invalidateQueries([API.USER.LIST]);
      queryClient.invalidateQueries([API.COMMENT.LIST]);
      queryClient.invalidateQueries([API.FAVORITE.LIST]);

      showAlert({
        assetName: 'block',
        assetGroup: 'icons',
        message: t('user.blocked'),
        size: IMAGE_SIZES.lvi,
        gap: Spacings.xxxiv
      });
    }
  });
};

export const useReportUser = () =>
  useBaseMutation({
    uri: API.USER.REPORT,
    onSuccess: () => {
      showAlert({
        assetName: 'report',
        assetGroup: 'icons',
        message: t('code_success.report'),
        size: IMAGE_SIZES.lxxx,
        gap: Spacings.xxviii
      });
    }
  });

export const useUnBlockUser = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.USER.UNBLOCK,
    onSuccess: () => {
      queryClient.invalidateQueries([API.CONVERSATION.LIST]);
      queryClient.invalidateQueries([API.TWEET.LIST]);
      queryClient.invalidateQueries([API.USER.BLOCK_LIST]);
    }
  });
};

export const useBlockUserList = () => {
  return useBaseInfinite({
    uri: API.USER.BLOCK_LIST,
    key: [API.USER.BLOCK_LIST]
  });
};

export const useListUser = (defaultQuery = {}, options = {}) => {
  return useBaseInfinite({
    uri: API.USER.LIST,
    key: [API.USER.LIST, defaultQuery],
    params: defaultQuery,
    options
  });
};

export const useUserDetail = userId => {
  return useBaseQuery({
    uri: API.USER.DETAIL.replace(':id', userId),
    key: [API.USER.DETAIL, userId]
  });
};

export const useLikeUser = userId => {
  const queryClient = useQueryClient();
  return useBaseMutation({
    uri: API.USER.LIKE.replace(':id', userId),
    onSuccess: resp => {
      queryClient.invalidateQueries([API.USER.DETAIL, userId]);
      queryClient.invalidateQueries([API.USER.LIST]);
      showAlert({
        type: ALERT_TYPE.OVERLAY,
        assetName: 'heart',
        assetGroup: 'icons',
        size: IMAGE_SIZES.lxxx,
        message: t('user.i_liked_it'),
        gap: Spacings.xxviii,
        iconColor: Colors.mainPink,
        onHide: () => {
          if (resp?.isMatch) {
            Navigator.navigate(Screens.Matching, { userId });
          }
        }
      });
    }
  });
};

export const useLeaveFootprint = () => {
  return useBaseMutation({
    uri: API.USER.LEAVE_FOOTPRINT
  });
};

export const useUnlikeUser = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.USER.UNLIKE,
    onSuccess: () => {
      queryClient.invalidateQueries([API.FAVORITE.LIST]);
    }
  });
};
