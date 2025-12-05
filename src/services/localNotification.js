import {
  addNotificationResponseReceivedListener,
  AndroidNotificationPriority,
  cancelAllScheduledNotificationsAsync,
  getPermissionsAsync,
  PermissionStatus,
  scheduleNotificationAsync,
  getLastNotificationResponseAsync,
  requestPermissionsAsync,
  unregisterForNotificationsAsync,
  setNotificationChannelAsync,
  AndroidImportance
} from 'expo-notifications';
import { Alert, Linking, Platform } from 'react-native';

import { NOTIFICATION_TYPE } from '@/configs/constants';
import { t } from '@/lang';
import { getCurrentChatId } from '@/utils/global';

class LocalNotificationService {
  listeners = onOpenNotification => {
    const subscription = addNotificationResponseReceivedListener(response => {
      const { content } = response.notification.request;
      if (!content?.data) {
        return;
      }
      onOpenNotification(content);
    });

    getLastNotificationResponseAsync().then(response => {
      const { content } = response.notification.request;
      if (content?.data) {
        onOpenNotification(content);
      }
    });

    return () => {
      subscription.remove();
    };
  };

  requestPermission = async (onGranted, onDenied) => {
    try {
      const { status: existingStatus, canAskAgain } =
        await getPermissionsAsync();

      if (existingStatus === PermissionStatus.GRANTED) {
        onGranted?.();
        return;
      }

      const { status } = await requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true
        }
      });

      if (status === PermissionStatus.GRANTED) {
        onGranted?.();
      } else {
        onDenied?.();
      }
    } catch (error) {
      console.error(
        '[LocalNotificationService] Permission request error:',
        error
      );
    }
  };

  unregister = () => {
    unregisterForNotificationsAsync();
  };

  createChannel = async () => {
    if (Platform.OS === 'android') {
      await setNotificationChannelAsync('mexer', {
        name: 'mexer',
        importance: AndroidImportance.MAX
      });
    }
  };

  showNotification = (id, title, message, data = {}, trigger = null) => {
    console.log('SHOW NOTIFICATION\n', { id, title, message, data });
    const { type, conversationId } = data?.data || {};
    const isInChatScreen =
      [
        NOTIFICATION_TYPE.CONVERSATION,
        NOTIFICATION_TYPE.NEW_MESSAGE,
        NOTIFICATION_TYPE.MESSAGE
        // eslint-disable-next-line eqeqeq
      ].includes(type) && conversationId == getCurrentChatId();

    if (isInChatScreen) {
      return;
    }

    scheduleNotificationAsync({
      content: {
        title: title || '',
        body: message || '',
        data,
        // Android
        priority: AndroidNotificationPriority.HIGH,
        autoDismiss: true,
        // Ios
        sticky: false,
        sound: 'default'
      },
      trigger
    });
  };

  cancelAllLocalNotifications = () => cancelAllScheduledNotificationsAsync;
}

export const localNotificationService = new LocalNotificationService();
