import { AlertState } from '@/components';
import { appAlert, appImageViewer, currentChatId } from '@/configs/constants';

export const showImageView = (image: string | number) =>
  !!image && appImageViewer?.current?.show?.(image);

export const showAlert = (params: AlertState) =>
  appAlert?.current?.show?.(params);

export const setCurrentChatId = (id: string) => {
  currentChatId.current = id;
};

export const getCurrentChatId = () => currentChatId?.current;
