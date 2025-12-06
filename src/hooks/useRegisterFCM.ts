import { useEffect } from 'react';

import dayjs from 'dayjs';
import { setNotificationHandler } from 'expo-notifications';
import { useQueryClient } from 'react-query';

import { useJumpNotification } from '@/hooks/useJumpNotification';
import { fcmService } from '@/services/fcm';
import { localNotificationService } from '@/services/localNotification';
import { updateDeviceInfo } from '@/utils/deviceInfo';

setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
});

interface NotificationData {
  notificationId?: string;
  title?: string;
  body?: string;
  message?: string;
  data?: {
    notificationId?: string;
    body?: string;
    title?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const useRegisterFCM = (): void => {
  const queryClient = useQueryClient();
  const { jumpNotification } = useJumpNotification();

  useEffect(() => {
    const onRegister = (token: string): void => {
      console.log('[App] onRegister: ', token);
    };

    const onNotification = (notify: NotificationData): void => {
      console.log('[App] onNotification: ', notify);
      queryClient.invalidateQueries('notification');

      localNotificationService.showNotification(
        parseInt(notify?.data?.notificationId || '0', 10),
        notify.title,
        notify.body,
        notify
      );
    };

    const onOpenNotification = (notify: NotificationData): void => {
      const data = notify?.data?.data || notify?.data || {};

      const notification = {
        ...data,
        title: notify?.title || data?.title,
        content:
          notify?.body || notify?.message || notify?.data?.body || data?.body,
        created: dayjs().toISOString()
      };

      jumpNotification(notification);
    };

    const onConfig = async () => {
      localNotificationService.createChannel();
      await fcmService.register(onRegister, onNotification, onOpenNotification);
      updateDeviceInfo();
    };

    const localNoti = localNotificationService.listeners(onOpenNotification);

    onConfig();

    return () => {
      fcmService.unRegister();
      localNotificationService.unregister();
      localNoti();
    };
  }, []);
};

export { useRegisterFCM };
