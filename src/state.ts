import createStore from 'redux-zero';
import type Sockette from 'sockette';

const store = createStore({
  userName: '',
  rememberUserData: false,
  hostName: '',
  messageText: '',
  connState: 'not connected',
  ws: null,
});

type TBoolRecord = Record<string, boolean>;
type TStringRecord = Record<string, string>;
type TSocketteRecord = Record<string, Sockette>;

const actions = {
  setUserName: ({ value }: TStringRecord): TStringRecord => ({ userName: value }),
  setHostName: ({ value }: TStringRecord): TStringRecord => ({ hostName: value }),
  setRemember: ({ value }: TBoolRecord): TBoolRecord => ({ rememberUserData: value }),
  setMessage: ({ value }: TStringRecord): TStringRecord => ({ messageText: value }),
  setConnState: ({ value }: TStringRecord): TStringRecord => ({ connState: value }),
  setWs: ({ value }: TSocketteRecord): TSocketteRecord => ({ ws: value }),
};

export { store, actions };
