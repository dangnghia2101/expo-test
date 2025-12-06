import { getPermissionsAsync, PermissionStatus } from 'expo-notifications';

import { localNotificationService } from './localNotification';

class FCMService {
  register = async (onRegister, onNotification, onOpenNotification) => {
    console.log('[FCMService] Firebase is disabled');
    this.checkPermission(onRegister);
  };

  getTokenAsync = async () => {
    await localNotificationService.requestPermission();
    return '';
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
    console.log('[FCMService] Firebase is disabled');
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
    console.log('[FCMService] Firebase is disabled');
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification
  ) => {
    console.log('[FCMService] Firebase is disabled');
  };

  unRegister = () => {
    console.log('[FCMService] Firebase is disabled');
  };
}

export const fcmService = new FCMService();
