import createStore from 'redux-zero';

import type Sockette from 'sockette';

interface State {
  userName: string,
  rememberUserData: boolean,
  hostName: string,
  messageText: string,
  connState: string,
  userRegistered: boolean,
  ws: Sockette | null,
}

const initialState: State = {
  userName: '',
  rememberUserData: false,
  hostName: '',
  messageText: '',
  connState: 'not connected',
  userRegistered: false,
  ws: null,
};

const store = createStore(initialState);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const actions = () => ({
  setUserName: (_state: unknown, value: string) => ({ userName: value }),
  setHostName: (_state: unknown, value: string) => ({ hostName: value }),
  setRemember: (_state: unknown, value: boolean) => ({ rememberUserData: value }),
  setMessage: (_state: unknown, value: string) => ({ messageText: value }),
  setConnState: (_state: unknown, value: string) => ({ connState: value }),
  setUserRegistered: (_state: unknown, value: boolean) => ({ userRegistered: value }),
  setWs: (_state: unknown, value: Sockette | null) => ({ ws: value }),
});


export { store, actions };
