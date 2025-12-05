import { useCallback, useState, useEffect, useRef } from 'react';

import { io } from 'socket.io-client';
import { useDebouncedCallback as useDCb } from 'use-debounce';

import useChatStore from '@/store/useChatStore';
import useUserStore from '@/store/useUserStore';
import {
  SOCKET_IO,
  JOIN_ROOM,
  LEAVE_ROOM,
  MESSAGE,
  READ,
  READ_ROOM,
  CONNECT,
  CONVERSATION,
  CHAT_TYPE,
  SOCKET_TYPE,
  CHAT_CONTENT
} from 'configs/constants';
import { deDuplicate } from 'utils';

const SocketIO = (() => {
  let instance;

  const init = query => {
    return io(SOCKET_IO, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
      query,
      jsonp: false
    });
  };

  return {
    getInstance: query => {
      if (!instance) instance = init(query);
      if (instance.disconnected || !instance.connected) {
        instance.connect();
      }

      return instance;
    }
  };
})();

export const useConversationMessage = () => {
  const { token, user: me } = useUserStore();

  const roomId = useRef(null);
  const [messages, _setMessages] = useState([]);
  const [conversation, setConversation] = useState();

  const setMessages = useCallback((_messages = []) => {
    _setMessages(prevMessages => {
      let nextState = _messages;
      if (typeof _messages === 'function') {
        nextState = _messages(prevMessages);
      }
      return deDuplicate(nextState);
    });
  }, []);

  const joinRoom = id => {
    const socket = SocketIO.getInstance({ token });

    socket.emit(JOIN_ROOM, `conversation_${id}`);
    roomId.current = id;
  };

  const disconnect = () => {
    const socket = SocketIO.getInstance({ token });

    socket.emit(LEAVE_ROOM, `conversation_${roomId.current}`);
    socket.removeListener(CONNECT);
    socket.removeListener(MESSAGE);
  };

  const emitRead = useDCb((socket, _roomId) => {
    socket.emit(READ_ROOM, _roomId);
  }, 500);

  useEffect(() => {
    const socket = SocketIO.getInstance({ token });

    socket.on(CONNECT, () => {
      if (roomId.current) {
        joinRoom(roomId.current);
      }
    });

    socket.on(READ, _conversation => {
      setConversation(_conversation?.conversation);
    });

    socket.on(MESSAGE, message => {
      const msg = message?.message;

      if (message?.type === SOCKET_TYPE.MESSAGE_DELETE) {
        setMessages(prev => {
          const clone = [...prev];
          const idx = clone?.findIndex(e => e?.id === message?.messageId);
          if (idx >= 0) {
            clone[idx] = {
              ...clone[idx],
              type: CHAT_TYPE.DELETED,
              content: CHAT_CONTENT.DELETED
            };
          }

          return clone;
        });
        return;
      }

      if (msg.conversationId && msg.conversationId !== roomId.current) {
        return;
      }

      if (msg?.senderId === me?.id) {
        msg.isHidden = false;
      }

      setMessages(prevMessages => [
        msg,
        ...(prevMessages?.filter?.(item => !item.temp) || [])
      ]);

      if (msg?.senderId !== me?.id) {
        emitRead(socket, roomId.current);
      }
    });

    return disconnect;
    // eslint-disable-next-line
  }, []);

  return { joinRoom, setMessages, messages, disconnect, conversation };
};

export const useConversation = () => {
  const { token } = useUserStore();
  const { conversation } = useChatStore();

  const addListeners = () => {
    const socket = SocketIO.getInstance({ token });

    socket.on(CONVERSATION, _conversation => {
      const conv = _conversation?.conversation;
      useChatStore.setState({ conversation: conv });
    });
  };

  const connect = () => {
    console.log('[CONNECT SOCKET]');
    addListeners();
  };

  const disconnect = () => {
    console.log('[DISCONNECT SOCKET]');
    const socket = SocketIO.getInstance({ token });

    socket.removeListener(CONVERSATION);
  };

  useEffect(() => {
    addListeners();

    return disconnect;
  }, []); // eslint-disable-line

  return { conversation, connect, disconnect };
};
