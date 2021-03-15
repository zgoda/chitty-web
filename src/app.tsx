import { FunctionComponent, h, JSX } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { useLang, useTitle, useMeta } from 'hoofd/preact';
import { getMany, set } from 'idb-keyval';
import { connect } from 'redux-zero/preact';
import Sockette from 'sockette';

import { USER_ID_KEY, USER_NAME_KEY } from './services/state';
import { actions, store } from './state';
import { Chat } from './components/chat';
import { Sidebar } from './components/sidebar';
import { ConnectionInfo } from './components/conninfo';

type TRegPayload = {
  type: string,
  value: string,
  key?: string,
};

type TStringSetter = (value: string) => void;

type TAppProps = {
  userName: string,
  rememberUserData: boolean,
  hostName: string,
  connState: string,
  ws: Sockette | null,
  setUserName: TStringSetter,
  setConnState: TStringSetter,
  setWs: (value: Sockette) => void,
}

type TMapProps = {
  userName: string,
  rememberUserData: boolean,
  hostName: string,
  connState: string,
  ws: Sockette | null,
}

const mapToProps =
  ({ userName, rememberUserData, hostName, connState, ws }: TMapProps) =>
    ({ userName, rememberUserData, hostName, connState, ws });

const AppBase =
    (({
      userName, rememberUserData, hostName, connState, ws,
      setUserName, setConnState, setWs
    }: TAppProps): JSX.Element => {

  const appTitle = 'Chitty chat';

  useLang('en');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });

  const [userKey, setUserKey] = useState('');

  const storeWatch = ({ hostName }) => {
    if (hostName !== '' && hostName !== undefined) {
      const wsUrl = `ws://${hostName}`;
      const ws = new Sockette(wsUrl, {
        onmessage: messageReceived,
        onopen: connectionOpened,
      });
      setWs(ws);
    }
  };

  store.subscribe(storeWatch);

  useEffect(() => {
    const updateUserData = (async () => {
      const [savedName, savedKey] = await getMany([USER_NAME_KEY, USER_ID_KEY]);
      if (savedName) {
        setUserName(savedName);
      }
      if (savedKey) {
        setUserKey(savedKey);
      }
    });    
    updateUserData();
  }, [setUserName]);

  useEffect(() => {
    if (userName !== '' && connState === 'connected') {
      const payload: TRegPayload = { type: 'reg', value: userName };
      if (userKey !== '') {
        payload['key'] = userKey;
      }
      const ws = wsRef.current as Sockette;
      if (ws !== undefined) {
        ws.json(payload);
      }
    }
  }, [userName, userKey, hostName, connState]);

  const messageReceived = ((e: MessageEvent) => {
    const data = JSON.parse(e.data);
    console.log(data);
    if (data.type === 'reg') {
      const key = data.key || '';
      if (key !== '' && rememberUserData) {
        set(USER_ID_KEY, key);
      }
    }
  });

  const connectionOpened = (() => {
    setConnState('connected');
  });

  const wsRef = useRef();

  useEffect(() => {
    if (hostName !== '' && hostName !== undefined) {
      const wsUrl = `ws://${hostName}`;
      wsRef.current = new Sockette(wsUrl, {
        onmessage: messageReceived,
        onopen: connectionOpened,
      });
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostName]);

  return (
    <div class="container grid-md">
      <h1>{appTitle}</h1>
      <div class="columns">
        <div class="column col-8">
          <ConnectionInfo />
          <Chat />
        </div>
        <div class="column col-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
});

const App = connect(mapToProps, actions)(AppBase as FunctionComponent);

export { App };
