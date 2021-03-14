import { h, JSX } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { useLang, useTitle, useMeta } from 'hoofd/preact';
import { getMany, set } from 'idb-keyval';
import Sockette from 'sockette';

import {
  UserNameOperator, RememberUserOperator, WsHostOperator, USER_ID_KEY, USER_NAME_KEY
} from './services/state';
import { Chat } from './components/chat';
import { Sidebar } from './components/sidebar';
import { ConnectionInfo } from './components/conninfo';

type TRegPayload = {
  type: string,
  value: string,
  key?: string,
};

const App = ((): JSX.Element => {

  const appTitle = 'Chitty chat';

  useLang('en');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });

  const [wsHost, setWsHost] = useState('');
  const [userName, setUserName] = useState('');
  const [userKey, setUserKey] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const [connectionState, setConnectionState] = useState('not connected');

  const hostOp = {
    hostName: wsHost,
    setHostName: setWsHost,
  };

  const uNameOp = {
    name: userName,
    setName: setUserName,
  };

  const rememberOp = {
    remember: rememberUser,
    setRemember: setRememberUser,
  };

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
  }, []);

  useEffect(() => {
    if (userName !== '' && connectionState === 'connected') {
      const payload: TRegPayload = { type: 'reg', value: userName };
      if (userKey !== '') {
        payload['key'] = userKey;
      }
      const ws = wsRef.current as Sockette;
      if (ws !== undefined) {
        ws.json(payload);
      }
    }
  }, [userName, userKey, wsHost, connectionState]);

  const messageReceived = ((e: MessageEvent) => {
    const data = JSON.parse(e.data);
    console.log(data);
    if (data.type === 'reg') {
      const key = data.key || '';
      if (key !== '' && rememberUser) {
        set(USER_ID_KEY, key);
      }
    }
  });

  const connectionOpened = (() => {
    setConnectionState('connected');
  });

  const wsRef = useRef();

  useEffect(() => {
    if (wsHost !== '') {
      const wsUrl = `ws://${wsHost}`;
      wsRef.current = new Sockette(wsUrl, {
        onmessage: messageReceived,
        onopen: connectionOpened,
      });
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsHost]);

  return (
    <div class="container grid-md">
      <h1>{appTitle}</h1>
      <div class="columns">
        <WsHostOperator.Provider value={hostOp}>
          <UserNameOperator.Provider value={uNameOp}>
            <div class="column col-8">
              <ConnectionInfo state={connectionState} host={wsHost} />
              <Chat />
            </div>
            <div class="column col-4">
              <RememberUserOperator.Provider value={rememberOp}>
                <Sidebar />
              </RememberUserOperator.Provider>
            </div>
          </UserNameOperator.Provider>
        </WsHostOperator.Provider>
      </div>
    </div>
  );
});

export { App };
