import { getApp } from '@react-native-firebase/app';
import message, {
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  onTokenRefresh,
  registerDeviceForRemoteMessages
} from '@react-native-firebase/messaging';
import { getPermissionsAsync, PermissionStatus } from 'expo-notifications';
import { Platform } from 'react-native';

import { localNotificationService } from './localNotification';

class FCMService {
  register = async (onRegister, onNotification, onOpenNotification) => {
    try {
      const app = getApp();
      const messaging = getMessaging(app);

      if (Platform.OS === 'ios') {
        await messaging.setAutoInitEnabled(true);
      }

      await registerDeviceForRemoteMessages(messaging);
    } catch (error) {
      console.error('[FCMService] registerAppWithFCM error:', error);
    }

    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification
    );
  };

  getTokenAsync = async () => {
    await localNotificationService.requestPermission();
    try {
      const app = getApp();
      const messaging = getMessaging(app);
      const token = await getToken(messaging);
      return token;
    } catch (err) {
      console.error('[FCMService] getTokenAsync error:', err);
      return '';
    }
  };

  checkPermission = async onRegister => {
    const { status: existingStatus } = await getPermissionsAsync();
    if (existingStatus === PermissionStatus.GRANTED) {
      this.getToken(onRegister);
    } else {
      this.requestPermission(onRegister);
    }
  };

  getToken = onRegister => {
    const app = getApp();
    const messaging = getMessaging(app);
    getToken(messaging)
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a device token');
        }
      })
      .catch(error => {
        console.log('[FCMService] getToken rejected ', error);
      });
  };

  requestPermission = onRegister => {
    localNotificationService.requestPermission(
      () => {
        this.getToken(onRegister);
      },
      () => {
        console.log('[FCMService] Request Permission rejected ');
      }
    );
  };

  deleteToken = () => {
    console.log('[FCMService] deleteToken ');
    const app = getApp();
    const messaging = getMessaging(app);
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('[FCMService] Delete token error ', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification
  ) => {
    const app = getApp();
    const messaging = getMessaging(app);

    onNotificationOpenedApp(messaging, remoteMessage => {
      console.log(
        '[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',
        remoteMessage
      );
      if (remoteMessage) {
        const { notification } = remoteMessage;
        onOpenNotification({ ...notification, data: remoteMessage?.data });
      }
    });

    getInitialNotification(messaging).then(remoteMessage => {
      console.log(
        '[FCMService] getInitialNotification Notification caused app to open from quit state:',
        remoteMessage
      );

      if (remoteMessage) {
        const { notification } = remoteMessage;
        onOpenNotification({ ...notification, data: remoteMessage?.data });
      }
    });

    // Register background handler
    message().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        '[FCMService] Message handled in the background!',
        remoteMessage
      );
    });

    this.messageListener = onMessage(messaging, async remoteMessage => {
      console.log('[FCMService] A new FCM message arrived!', remoteMessage);
      if (remoteMessage) {
        onNotification({
          ...remoteMessage?.notification,
          data: remoteMessage?.data
        });
      }
    });

    onTokenRefresh(messaging, fcmToken => {
      console.log('[FCMService] New token refresh: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    if (this.messageListener) {
      this.messageListener();
    }
  };
}

export const fcmService = new FCMService();
