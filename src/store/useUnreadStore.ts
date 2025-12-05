import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

import { zustandStorage } from './mmkv';

export interface UnreadProps {
  unread: number;
  notiUnread: number;
  isAvailable: boolean;
  isAgeVerified: boolean;
  conversationUnread: number;
  footPrintUnread: number;
  unreadAction: number;
  conversationConceirgeUnread: number;
  allowFreePremium: boolean;
  unreadLike: number;
  unreadTweet: number;
  unreadTalkroom: number;
}

interface UserStore {
  unread: UnreadProps;
  logout: () => void;
}

const initialState = {
  unread: null
};

const useUnreadStore = create<UserStore>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        // LOGOUT
        logout: () => set(initialState)
      }),
      {
        name: 'unread-storage',
        storage: createJSONStorage(() => zustandStorage)
      }
    )
  )
);

export default useUnreadStore;
