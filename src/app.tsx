import { h, JSX } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { useLang, useTitle, useMeta } from 'hoofd/preact';
import Sockette from 'sockette';

import { Chat } from './components/chat';
import { Sidebar } from './components/sidebar';

const App = ((): JSX.Element => {

  const appTitle = 'Chitty chat';

  useLang('en');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });

  const [wsHost, setWsHost] = useState('');

  const messageReceived = ((e: MessageEvent) => {
    console.log(JSON.parse(e.data));
  });

  const wsRef = useRef();

  const connectionMade = (() => {
    (wsRef.current as Sockette).json({ type: 'reg', value: 'jarek' });
  });

  useEffect(() => {
    if (wsHost !== '') {
      const wsUrl = `ws://${wsHost}`;
      wsRef.current = new Sockette(wsUrl, {
        onmessage: messageReceived,
        onopen: connectionMade,
      });
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsHost]);

  return (
    <div class="container grid-md">
      <h1>{appTitle}</h1>
      <div class="columns">
        <div class="column col-8">
          <Chat />
        </div>
        <div class="column col-4">
          <Sidebar setWsHost={setWsHost} />
        </div>
      </div>
    </div>
  );
});

export { App };
