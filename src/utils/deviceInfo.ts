import * as Application from 'expo-application';
import * as Cellular from 'expo-cellular';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

import { API } from '@/configs/constants';
import api, { setDefaultHeaders } from '@/services/axios';
import { fcmService } from '@/services/fcm';
import { request } from '@/utils';

export const updateDeviceInfo = async () => {
  try {
    const token = await fcmService.getTokenAsync();

    const info = JSON.stringify({
      uniqueId:
        Platform.OS === 'android'
          ? Application.getAndroidId()
          : await Application.getIosIdForVendorAsync(),
      deviceId: Device.deviceName,
      brand: Device.brand,
      buildNumber: Application.nativeBuildVersion,
      systemVersion: Device.osVersion,
      userAgent: navigator.userAgent,
      maxMemory: Device.totalMemory,
      carrier: await Cellular.getCarrierNameAsync(),
      model: Device.modelName
    });

    await api.post(API.AUTH.DEVICE, {
      platform: Platform.OS,
      token,
      info
    });
  } catch (e) {
    console.log('[DEVICE] updateDeviceInfo error', e);
  }
};

export const deleteDeviceToken = async () => {
  const token = await fcmService.getTokenAsync();

  try {
    await request({
      url: API.AUTH.DEVICE,
      method: 'delete',
      query: { token }
    }).finally(() => {
      setDefaultHeaders({ Authorization: '' });
    });
  } catch (error) {
    console.log('[DEVICE] deleteDeviceToken error', error);
  }
};
