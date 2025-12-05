import { useQueryClient } from 'react-query';

import { API } from '@/configs/constants';
import { t } from '@/lang';
import Navigator from '@/navigations/Navigator';
import { showAlert } from '@/utils/global';

import { useBaseInfinite } from '../useBaseInfinite';
import { useBaseMutation } from '../useBaseMutation';

export const useTweetList = (userId = '') =>
  useBaseInfinite({
    key: [API.TWEET.LIST, userId],
    uri: API.TWEET.LIST,
    params: {
      userId
    }
  });

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.TWEET.CREATE,
    useFetchBlob: true,
    onSuccess: () => {
      queryClient.invalidateQueries([API.TWEET.LIST]);
      showAlert({
        message: t('tweet.topic_created')
      });
      Navigator.goBack();
    }
  });
};

export const useUpdateTweet = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.TWEET.CREATE,
    useFetchBlob: true,
    onSuccess: () => {
      queryClient.invalidateQueries([API.TWEET.LIST]);
      showAlert({
        message: t('tweet.updated')
      });
      Navigator.goBack();
    }
  });
};

export const useDeleteTweet = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.TWEET.DELETE,
    method: 'DELETE',
    onSuccess: () => {
      queryClient.invalidateQueries([API.TWEET.LIST]);
      showAlert({
        message: t('tweet.delete')
      });
    }
  });
};

export const useReportTweet = () => {
  return useBaseMutation({
    uri: API.TWEET.REPORT,
    onSuccess: () => {
      showAlert({
        message: t('tweet.updated')
      });
    }
  });
};

export const useLikeTweet = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.TWEET.LIKE,
    onSuccess: () => {
      queryClient.invalidateQueries(API.TWEET.LIST);
    }
  });
};

export const useReportCommentTweet = () => {
  return useBaseMutation({
    uri: API.TWEET.REPORT_COMMENT,
    onSuccess: response => {
      showAlert({
        message: t('code_success.reported', {
          name: response?.report?.user?.fullName
        })
      });
    }
  });
};

export const useDeleteCommentTweet = tweetId => {
  const queryClient = useQueryClient();
  return useBaseMutation({
    uri: API.TWEET.DELETE_COMMENT,
    method: 'delete',
    onSuccess: () => {
      queryClient.invalidateQueries([API.COMMENT.LIST, tweetId]);
      showAlert({
        message: t('code_success.delete_comment')
      });
    }
  });
};
