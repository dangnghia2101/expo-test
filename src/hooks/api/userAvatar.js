import { ALERT_TYPE, API } from '@/configs/constants';
import { t } from '@/lang';
import { showAlert } from '@/utils/global';

import { useBaseMutation } from '../useBaseMutation';
import { useGetMe } from './auth';

export const useAddSubPhoto = () => {
  const { doRequest: doGetMe } = useGetMe();
  return useBaseMutation({
    uri: API.USER_AVATAR.CREATE,
    useFetchBlob: true,
    onSuccess: doGetMe
  });
};

export const useDeleteSubPhoto = () => {
  const { doRequest: doGetMe } = useGetMe();
  return useBaseMutation({
    uri: API.USER_AVATAR.DELETE_SINGLE,
    method: 'DELETE',
    onSuccess: doGetMe
  });
};

export const useSetDefaultAvatar = () => {
  const { doRequest: doGetMe } = useGetMe();
  return useBaseMutation({
    uri: API.USER_AVATAR.SET_DEFAULT,
    method: 'GET',
    onSuccess: () => {
      doGetMe();
      showAlert({
        type: ALERT_TYPE.OVERLAY,
        message: t('edit_profile.set_default_avatar')
      });
    }
  });
};

export const useDeleteAllSubPhoto = () => {
  const { doRequest: doGetMe } = useGetMe();
  return useBaseMutation({
    uri: API.USER_AVATAR.DELETE_SINGLE,
    method: 'DELETE',
    onSuccess: doGetMe
  });
};

export const useUpdateSubPhoto = () => {
  const { doRequest: doGetMe } = useGetMe();
  return useBaseMutation({
    uri: API.USER_AVATAR.UPDATE,
    useFetchBlob: true,
    onSuccess: doGetMe
  });
};
