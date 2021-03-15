import { set } from 'idb-keyval';
import { bindActions } from 'redux-zero/utils';

import { USER_ID_KEY } from '../services/storage';
import { store, actions } from '../state';

import type Sockette from 'sockette';

type TMsgRegPayload = {
  type: string,
  value: string,
  key?: string,
};

function registerUser(ws: Sockette, name: string, key: string | null): void {
  const payload: TMsgRegPayload = {
    type: 'reg', value: name,
  };
  if (key !== null) {
    payload.key = key;
  }
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
  }
}

function connectionOpened(): void {
  boundActions.setConnState('connected');
}

export { TMsgRegPayload, registerUser, messageReceived, connectionOpened };
