import { useEffect, useState } from 'react';

import { useQueryClient } from 'react-query';

import { API } from '@/configs/constants';
import Navigator, { Screens } from '@/navigations/Navigator';
import { useConversationMessage } from '@/services/socketio';
import useUserStore from '@/store/useUserStore';

import { useBaseInfinite } from '../useBaseInfinite';
import { useBaseMutation } from '../useBaseMutation';
import { useBaseQuery } from '../useBaseQuery';
import { usePrevious } from '../usePrevious';
import { useRefreshByUser } from '../useRefreshByUser';
import { useUser } from './auth';

export const useConversations = () =>
  useBaseInfinite({
    key: [API.CONVERSATION.LIST],
    uri: API.CONVERSATION.LIST
  });

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.CONVERSATION.DELETE,
    onSuccess: () => {
      queryClient.invalidateQueries([API.CONVERSATION.LIST]);
    }
  });
};

export const useSendMessage = conversationId =>
  useBaseMutation({
    uri: API.CONVERSATION.SEND.replace(':id', conversationId),
    useFetchBlob: true,
    options: {
      retry: 2
    }
  });

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useBaseMutation({
    uri: API.CONVERSATION.DELETE_MESSAGE,
    method: 'DELETE',
    onSuccess: () => {
      queryClient.invalidateQueries([API.CONVERSATION.MESSAGES]);
    }
  });
};

export const useListMessages = conversationId =>
  useBaseInfinite({
    key: [API.CONVERSATION.MESSAGES, conversationId],
    uri: API.CONVERSATION.MESSAGES.replace(':id', conversationId)
  });

export const useMessageDetail = conversationId =>
  useBaseQuery({
    key: [API.CONVERSATION.DETAIL, conversationId],
    uri: API.CONVERSATION.DETAIL.replace(':id', conversationId)
  });

export const useMessages = conversationId => {
  const { user: me } = useUserStore();
  const {
    data: list,
    refetch: refetchList,
    isFetching,
    ...props
  } = useListMessages(conversationId);
  const prevFetching = usePrevious(isFetching);
  const { joinRoom, messages, setMessages, conversation } =
    useConversationMessage();
  const {
    data,
    refetch: refetchDetail,
    isFetching: fetchingDetail,
    isSuccess,
    isError,
    errorCode
  } = useMessageDetail(conversationId);
  const prevFetchingDetail = usePrevious(fetchingDetail);
  const setting = data?.settings?.find(e => e?.userId !== me?.id);
  const { lastReadAt } = setting || {};
  const refresh = () => {
    refetchDetail();
    refetchList();
  };
  const { isRefetchingByUser: refetching, refetchByUser: refetch } =
    useRefreshByUser(refresh);

  const [success, setSuccess] = useState(false);
  const [lastRead, setLastRead] = useState(lastReadAt);

  useEffect(() => {
    joinRoom(conversationId);
  }, []);

  useEffect(() => {
    if (setting?.lastReadAt) {
      setLastRead(setting?.lastReadAt);
    }
  }, [conversation]);

  useEffect(() => {
    if (prevFetching && !isFetching) {
      setMessages(list);
      if (!success) {
        setSuccess(true);
      }
    }
  }, [prevFetching, isFetching]);

  useEffect(() => {
    if (prevFetchingDetail && !fetchingDetail) {
      setLastRead(lastReadAt);
    }
  }, [fetchingDetail, prevFetchingDetail]);

  return {
    ...props,
    isSuccess,
    data,
    conversation,
    messages,
    setMessages,
    refetch,
    refetching,
    success,
    lastRead,
    isError,
    errorCode,
    refresh
  };
};

export const useGetConceirge = () =>
  useBaseQuery({
    key: [API.CONVERSATION.CONCEIRGE],
    uri: API.CONVERSATION.CONCEIRGE
  });

export const useInitConversation = () =>
  useBaseMutation({
    uri: API.CONVERSATION.LIST
  });

export const useCreateConversation = () => {
  const { me } = useUser();
  const queryClient = useQueryClient();

  return useBaseMutation({
    uri: API.CONVERSATION.CREATE,
    onSuccess: res => {
      const { id, users } = res?.conversation || {};
      const user = users?.find?.(e => e?.id !== me?.id);

      queryClient.invalidateQueries([API.CONVERSATION.MESSAGES]);
      queryClient.invalidateQueries([API.CONVERSATION.LIST, user?.id]);

      Navigator.navigate(Screens.ChatDetail, { conversationId: id });
    }
  });
};
