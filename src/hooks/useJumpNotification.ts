/* eslint-disable eqeqeq */
import { useQueryClient } from 'react-query';

import { ALERT_TYPE, API, NOTIFICATION_TYPE } from '@/configs/constants';
import { useReadNotification, useUser } from '@/hooks/api';
import { t } from '@/lang';
import Navigator, {
  getCurrentRoute,
  isReadyRef,
  Screens
} from '@/navigations/Navigator';
import { showAlert } from '@/utils/global';
import '@/configs/constants/createRef';

interface NotificationItem {
  content?: string;
  title?: string;
  notificationId?: string | number;
  type?: string;
  conversationId?: string | number;
  id?: string | number;
  userId?: string | number;
  communityId?: string | number;
  tweetId?: string | number;
  fromId?: string | number;
  isAgeVerified?: string;
  isConceirge?: string;
  commentId?: string | number;
  tweetParentCommentId?: string | number;
  tweetCommentId?: string | number;
  parentId?: string | number;
  convType?: string;
  action?: string;
}

export const useJumpNotification = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { doRequest: doRead } = useReadNotification();

  const jumpNotification = (item: NotificationItem): void => {
    if (!item?.content || !item?.title) return;

    const { name, params } = getCurrentRoute();

    const {
      id,
      notificationId,
      type,
      conversationId,
      userId,
      fromId,
      isAgeVerified,
      isConceirge,
      convType,
      tweetId,
      parentId,
      tweetParentCommentId
    } = item || {};

    if (
      ![NOTIFICATION_TYPE.CONVERSATION, NOTIFICATION_TYPE.NEW_MESSAGE].includes(
        type
      )
    ) {
      doRead({ uriParams: { id: notificationId || id } });
    }

    let screenName: string = '';
    let dataParams: Record<string, any> = {};
    let field: string = '';

    switch (type) {
      case NOTIFICATION_TYPE.CONVERSATION:
        screenName = Screens.ChatDetail;
        dataParams = { conversationId };
        field = 'conversationId';
        break;
      case NOTIFICATION_TYPE.LIKE_TWEET_COMMENT:
      case NOTIFICATION_TYPE.REPLY_COMMENT:
      case NOTIFICATION_TYPE.TWEET_NEW_COMMENT:
        screenName = Screens.CommentDetail;
        dataParams = {
          tweetId
        };
        field = 'tweetId';
        break;
      case NOTIFICATION_TYPE.TWEET_REPLY_COMMENT:
      case NOTIFICATION_TYPE.LIKE_REPLY_COMMENT:
      case NOTIFICATION_TYPE.LIKE_REPLY_TWEET_COMMENT:
        screenName = Screens.CommentChildrenDetail;
        dataParams = {
          tweetId,
          commentId: parentId || tweetParentCommentId
        };
        field = 'tweetId';
        break;
      case NOTIFICATION_TYPE.FOOTPRINT:
      case NOTIFICATION_TYPE.LIKE:
      case NOTIFICATION_TYPE.MATCHED:
      case NOTIFICATION_TYPE.USER:
        queryClient.invalidateQueries([API.USER.DETAIL, fromId || userId]);
        screenName = Screens.UserDetail;
        dataParams = {
          userId: fromId || userId
        };
        field = 'userId';
        break;
      case NOTIFICATION_TYPE.MESSAGE:
        if (convType === 'direct') {
          screenName = Screens.ChatDetail;
          dataParams = { conversationId };
          field = 'conversationId';
        }
        break;
      case NOTIFICATION_TYPE.NEW_MESSAGE:
        screenName = Screens.ChatDetail;
        dataParams = { conversationId };
        field = 'conversationId';
        break;
      default:
        screenName = Screens.NotificationDetail;
        dataParams = { id: notificationId || id };
        field = 'id';
        break;
    }

    if (
      (name !== screenName || params?.[field] != dataParams?.[field]) &&
      isReadyRef.current
    ) {
      if (name === screenName) {
        Navigator.push(screenName, dataParams);
      } else {
        Navigator.navigate(screenName, dataParams);
      }
    }
  };

  return {
    jumpNotification
  };
};
