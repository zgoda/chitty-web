import { FunctionComponent, h, JSX } from 'preact';
import { useLang, useTitle, useMeta } from 'hoofd/preact';
import { connect } from 'redux-zero/preact';
import { get } from 'idb-keyval';
import Sockette from 'sockette';

import { messageReceived, connectionOpened, registerUser } from './services/message';
import { USER_ID_KEY } from './services/storage';
import { actions } from './state';
import { Chat } from './components/chat';
import { Sidebar } from './components/sidebar';
import { ConnectionInfo } from './components/conninfo';

type AppProps = {
  userName: string,
  hostName: string,
  connState: string,
  ws: Sockette | null,
  setWs: ValueSetter<Sockette | null>,
}

type MapProps = {
  userName: string,
  hostName: string,
  connState: string,
  ws: Sockette | null,
}

const mapToProps =
  ({ userName, hostName, connState, ws }: MapProps) =>
    ({ userName, hostName, connState, ws });

const AppBase =
    (({ userName, hostName, connState, ws, setWs }: AppProps): JSX.Element => {

  const appTitle = 'Chitty chat';

  useLang('en');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });

  const wsHandlers = {
    onopen: connectionOpened,
    onmessage: messageReceived,
  };

  if (userName !== '' && hostName !== '' && ws === null) {
    const webSocket = new Sockette(`ws://${hostName}`, wsHandlers);
    setWs(webSocket);
  }

  if (connState === 'connected' && ws !== null) {
    get(USER_ID_KEY)
      .then((key) => registerUser(ws, userName, key));
  }

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
