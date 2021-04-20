import { useEffect } from 'preact/hooks';
import { useLang, useTitle, useMeta } from 'hoofd/preact';
import { connect } from 'redux-zero/preact';
import { del } from 'idb-keyval';
import Sockette from 'sockette';

import {
  messageReceived, connectionOpened, connectionClosed,
} from '../services/message';
import { EVENTS_KEY } from '../services/storage';
import { actions } from '../services/state';
import { Chat } from './chat';
import { Sidebar } from './sidebar';
import { ConnectionInfo } from './conninfo';
import { makeWsUrl, parseHost } from '../utils/web';

import '../typedefs';

/**
 * @typedef {Object} AppStateItems
 * @property {string} userName - user screen name / handle
 * @property {string} chatHost - chat host name
 * @property {Sockette} ws
 * @property {boolean} secure
 * @property {string} token
 */

function mapToProps(
  /** @type AppStateItems */
  { userName, chatHost, ws, secure, token }
) {
  return ({ userName, chatHost, ws, secure, token });
}

/**
 * @typedef {Object} AppProps
 * @property {string} userName
 * @property {string} chatHost
 * @property {Sockette} ws
 * @property {boolean} secure
 * @property {string} token 
 * @property {ValueSetter<Sockette>} setWs
 */
function AppBase(
  /** @type AppProps */
  { userName, chatHost, ws, secure, token, setWs }
) {

  useEffect(() => {
    async function clearEphemeralStorage() {
      await del(EVENTS_KEY);
    }
    clearEphemeralStorage();
  }, []);

  const appTitle = 'Chitty Chat';

  useLang('en');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });

  const wsHandlers = {
    onopen: connectionOpened,
    onmessage: messageReceived,
    onclose: connectionClosed,
  };

  if (userName !== '' && chatHost !== '' && ws == null && token !== '') {
    const hostSpec = parseHost(chatHost, secure);
    const url = makeWsUrl(hostSpec.host, hostSpec.port, secure, token);
    const webSocket = new Sockette(url, wsHandlers);
    setWs(webSocket);
  }

  return (
    <div class="container grid-md">
      <h1>{appTitle}</h1>
      <div class="columns">
        <div class="column col-8 col-md-12">
          <ConnectionInfo />
          <Chat />
        </div>
        <div class="column col-4 col-md-12">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

const App = connect(mapToProps, actions)(AppBase);

export { App };
