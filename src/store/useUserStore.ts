import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

import { zustandStorage } from './mmkv';

interface AgeVerify {
  id: number;
  status?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  isPhoneVerified: boolean;
  completeOnboarding: boolean;
  isAgeVerified: boolean;
  ageVerify: AgeVerify;
}

interface UserStore {
  isLogged: boolean;
  user?: User;
  token: string;
  setUser: (user: User) => void;
  logout: () => void;
  isSkipVerify: boolean;
  skipVerify: () => void;
}

const initialState = {
  isLogged: false,
  user: null,
  token: '',
  isSkipVerify: false
};

const useUserStore = create<UserStore>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        setUser: user =>
          set(state => ({
            ...state,
            user: { ...(state.user || {}), ...user }
          })),
        skipVerify: () => set(state => ({ ...state, isSkipVerify: true })),
        // LOGOUT
        logout: () => set(initialState)
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => zustandStorage)
      }
    )
  )
);

export default useUserStore;
