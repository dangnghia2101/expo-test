import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

import { zustandStorage } from './mmkv';

interface ChatStore {
  conversation: string;
  logout: () => void;
}

const initialState = {
  conversation: ''
};

const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        // LOGOUT
        logout: () => set(initialState)
      }),
      {
        name: 'chat-storage',
        storage: createJSONStorage(() => zustandStorage)
      }
    )
  )
);

export default useChatStore;
