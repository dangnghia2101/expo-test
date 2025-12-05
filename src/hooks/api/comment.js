import { useQueryClient } from 'react-query';

import { API } from '@/configs/constants';

import { useBaseInfinite } from '../useBaseInfinite';
import { useBaseMutation } from '../useBaseMutation';
import { useBaseQuery } from '../useBaseQuery';

export const useCommentList = (id, params) =>
  useBaseInfinite({
    key: [API.COMMENT.LIST, id, params],
    uri: API.COMMENT.LIST.replace(':id', id),
    params
  });

export const useCreateComment = id => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.COMMENT.CREATE.replace(':id', id),
    onSuccess: () => {
      queryClient.invalidateQueries([API.COMMENT.LIST, id]);
    }
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.COMMENT.LIKE,
    onSuccess: () => {
      queryClient.invalidateQueries([API.COMMENT.COMMENT_DETAIL]);
      queryClient.invalidateQueries([API.COMMENT.LIST]);
    }
  });
};

export const useUnLikeComment = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.COMMENT.UNLIKE,
    onSuccess: () => {
      queryClient.invalidateQueries([API.COMMENT.COMMENT_DETAIL]);
      queryClient.invalidateQueries([API.COMMENT.LIST]);
    }
  });
};

export const useCommentDetail = id =>
  useBaseQuery({
    key: [API.COMMENT.COMMENT_DETAIL, id],
    uri: API.COMMENT.COMMENT_DETAIL.replace(':id', id)
  });
