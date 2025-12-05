import { useEffect } from 'react';

import {
  cancelAllScheduledNotificationsAsync,
  setBadgeCountAsync
} from 'expo-notifications';
import { Colors } from 'react-native-ui-lib';

import {
  AGE_VERIFY_STATUS,
  ALERT_TYPE,
  API,
  AUTH_ERROR_MESSAGES,
  GENDER,
  queryClient,
  Screens,
  VERIFY_OTP_TYPE
} from '@/configs/constants';
import { t } from '@/lang';
import Navigator from '@/navigations/Navigator';
import { setDefaultHeaders } from '@/services/axios';
import useChatStore from '@/store/useChatStore';
import useUserStore from '@/store/useUserStore';
import { getErrorMessage, showCommonError } from '@/utils';
import { deleteDeviceToken } from '@/utils/deviceInfo';
import { showAlert } from '@/utils/global';

import { useBaseMutation } from '../useBaseMutation';
import { useBaseQuery } from '../useBaseQuery';

export const useUser = () => {
  const user = useUserStore(state => state.user);
  const { ageVerify, isAgeVerified, isPremium } = user || {};
  const isAgePending = ageVerify?.status === AGE_VERIFY_STATUS.PENDING;
  const isMale = user?.gender === GENDER.MALE;
  const isFemale = user?.gender === GENDER.FEMALE;
  const allowSeeFootprint = isMale ? isPremium && isAgeVerified : true;
  const allowSendChat = user?.isPremium || user?.chatBalance > 0 || isFemale;
  const allowCheckMessage = !!(user?.isPremium && isMale) || isFemale;

  return {
    user,
    me: user,
    isPremium,
    isMale,
    isFemale,
    isAgeVerified: !!isAgeVerified && !isAgePending,
    isAgePending,
    allowSendChat,
    allowCheckMessage,
    allowSeeFootprint
  };
};

export const afterLoggedIn = returnScreen => {
  const { isLogged, user } = useUserStore.getState();

  const { isPhoneVerified, completeOnboarding } = user || {};

  let screen = Screens.Welcome;
  let params = {};

  if (isLogged) {
    if (!isPhoneVerified) {
      screen = Screens.VerifyOTP;
      params = { verifyType: VERIFY_OTP_TYPE.VERIFY_ACCOUNT };
    } else if (!completeOnboarding) {
      screen = Screens.Onboarding;
    } else {
      screen = Screens.TabNavigator;
    }
  }

  if (returnScreen) {
    return screen;
  }

  return Navigator.reset(screen, params);
};

export const useGetMe = fetchOnMount => {
  const result = useBaseMutation({
    uri: API.ME.GET_ME,
    method: 'GET',
    onSuccess: data => {
      useUserStore.setState(state => ({
        user: { ...(state.user || {}), ...(data?.user || {}) }
      }));
    }
  });

  useEffect(() => {
    if (fetchOnMount) {
      result.doRequest();
    }
  }, []);

  return result;
};

export const useUpdateMe = () => {
  return useBaseMutation({
    uri: API.ME.UPDATE_ME,
    useFetchBlob: true,
    onSuccess: resp => {
      useUserStore.setState(state => ({
        user: { ...(state.user || {}), ...(resp?.user || {}) }
      }));
    }
  });
};

export const useSignIn = () => {
  return useBaseMutation({
    uri: API.AUTH.LOGIN,
    onSuccess: data => {
      setDefaultHeaders({ Authorization: `Bearer ${data?.token}` });
      useUserStore.setState({
        isLogged: true,
        token: data?.token,
        user: data?.user
      });
      afterLoggedIn();
    },
    onError: () => {
      // Do nothing
    }
  });
};

export const useSignUp = () => {
  return useBaseMutation({
    uri: API.AUTH.SIGNUP,
    onSuccess: data => {
      setDefaultHeaders({ Authorization: `Bearer ${data?.token}` });
      useUserStore.setState({
        isLogged: true,
        token: data?.token,
        user: data?.user
      });
      Navigator.navigate(Screens.VerifyOTP, {
        verifyType: VERIFY_OTP_TYPE.VERIFY_ACCOUNT
      });
    }
  });
};

export const useInitApp = () => {
  useEffect(() => {
    const { isLogged, token } = useUserStore.getState();
    if (isLogged) {
      setDefaultHeaders({ Authorization: `Bearer ${token}` });
    }
  }, []);
};

export const useLogout = () => {
  const doLogout = async () => {
    await deleteDeviceToken();
    useUserStore.getState().logout();
    useChatStore.getState().logout();
    Navigator.reset(Screens.Login);
    setBadgeCountAsync(0);
    cancelAllScheduledNotificationsAsync();
    queryClient.clear();
  };

  return {
    doLogout
  };
};

export const useVerifyOTP = () => {
  return useBaseMutation({
    uri: API.AUTH.VERIFY_OTP,
    onSuccess: afterLoggedIn,
    onError: () => {
      // Do nothing
    }
  });
};

export const useResendOTP = () =>
  useBaseMutation({
    uri: API.AUTH.RESEND_OTP
  });

export function useForgetPassword() {
  return useBaseMutation({
    uri: API.AUTH.FORGET_PASSWORD,
    onError: error => {
      const message = getErrorMessage(error);
      if (message === AUTH_ERROR_MESSAGES.INVALID_USER) {
        showAlert({
          message: t('auth.phone_number_does_not_exist'),
          type: ALERT_TYPE.POPUP,
          messageCenter: true
        });
      } else {
        showCommonError(error);
      }
    }
  });
}

export const useVerifyForgotPasswordOTP = () => {
  return useBaseMutation({
    uri: API.AUTH.VERIFY_FORGOT_PASSWORD_OTP,
    onSuccess: afterLoggedIn,
    onError: () => {
      // Do nothing
    }
  });
};

export const useChangePassword = () => {
  return useBaseMutation({
    uri: API.ME.CHANGE_PASSWORD
  });
};

export const useResetPassword = () => {
  return useBaseMutation({
    uri: API.AUTH.RESET_PASSWORD,
    onSuccess: () => {
      showAlert({
        type: ALERT_TYPE.OVERLAY,
        message: t('change_password.your_password_has_reset'),
        assetName: 'change_password_success',
        assetGroup: 'auth',
        bg: Colors.white,
        textColor: Colors.darkGray,
        onHide: () => Navigator.reset(Screens.Login)
      });
    }
  });
};

export const useTagGroup = (body = {}, options = {}) => {
  return useBaseQuery({
    method: 'POST',
    uri: API.AUTH.TAG_GROUPS,
    key: [API.AUTH.TAG_GROUPS, body],
    options,
    body
  });
};

export const useAgeVerify = onSuccess => {
  const { doRequest: doGetMe } = useGetMe();
  return useBaseMutation({
    uri: API.AUTH.AGE_VERIFY,
    useFetchBlob: true,
    onSuccess: () => {
      doGetMe();
      onSuccess?.();
    }
  });
};

export const useDeleteMe = () => {
  const { doLogout } = useLogout();

  return useBaseMutation({
    uri: API.ME.DELETE_ACCOUNT,
    onSuccess: () => {
      showAlert({
        type: ALERT_TYPE.POPUP,
        message: t('delete.thank_using_our_service'),
        labelButton: t('common.see_less')
      });
      doLogout();
    },
    onError: res => {
      const message = getErrorMessage(res);
      if (message === AUTH_ERROR_MESSAGES.INVALID_USER_2) {
        showAlert({
          type: ALERT_TYPE.POPUP,
          message: t('alert.password_incorrect')
        });
        return;
      }
      showCommonError(res);
    }
  });
};
