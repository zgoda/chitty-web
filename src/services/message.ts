import { set } from 'idb-keyval';
import { bindActions } from 'redux-zero/utils';

import { USER_ID_KEY } from '../services/storage';
import { store, actions } from '../state';

import type Sockette from 'sockette';

type MsgRegPayload = {
  type: string,
  value: string,
  key?: string,
};

type MsgChatPayload = {
  type: string,
  value: string,
  to: string,
};

function registerUser(ws: Sockette, name: string, key: string | null): void {
  const payload: MsgRegPayload = {
    type: 'reg', value: name,
  };
  if (key !== null) {
    payload.key = key;
  }
  ws.json(payload);
}

function sendChatMessage(ws: Sockette, message: string): void {
  const payload: MsgChatPayload = {
    type: 'msg', value: message, to: 'general'
  };
  ws.json(payload);
}

const boundActions = bindActions(actions, store);

function messageReceived(e: MessageEvent): void {
  const data = JSON.parse(e.data);
  console.log(data);
  if (data.type === 'reg') {
    const state = store.getState();
    const key = data.key || '';
    if (key !== '' && state.rememberUserData) {
      set(USER_ID_KEY, key);
    }
    boundActions.setUserRegistered(true);
    const topics = data.topics || [];
    boundActions.setSubscribedTopics(topics);
  }
}

function connectionOpened(): void {
  boundActions.setConnState('connected');
}

function connectionClosed(e: CloseEvent): void {
  boundActions.setConnState('not connected');
  if ([1000, 1001, 1005].includes(e.code)) {
    boundActions.setUserRegistered(false);
    boundActions.setWs(null);
  }
}

export {
  registerUser, sendChatMessage, messageReceived, connectionOpened, connectionClosed
};
