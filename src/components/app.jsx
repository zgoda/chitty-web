import { useEffect } from 'preact/hooks';
import { useLang, useTitle, useMeta } from 'hoofd/preact';
import { connect } from 'redux-zero/preact';
import { get, del } from 'idb-keyval';
import Sockette from 'sockette';

import {
  messageReceived, connectionOpened, registerUser, connectionClosed
} from '../services/message';
import { USER_ID_KEY, EVENTS_KEY } from '../services/storage';
import { actions } from '../services/state';
import { Chat } from './chat';
import { Sidebar } from './sidebar';
import { ConnectionInfo } from './conninfo';

import '../typedefs';

/**
 * @typedef {Object} AppStateItems
 * @property {string} userName - user screen name / handle
 * @property {string} hostName - chat host name
 * @property {string} connState - connection status
 * @property {boolean} userRegistered - flag if user is already registered at
 *     chat server
 * @property {Sockette} ws - web socket object
 * @property {boolean} secure - flag if connection should be secured
 */

function mapToProps(
  /** @type AppStateItems */
  { userName, hostName, connState, userRegistered, ws, secure }
) {
  return ({ userName, hostName, connState, userRegistered, ws, secure });
}

/**
 * @typedef {Object} AppProps
 * @property {string} userName
 * @property {string} hostName
 * @property {string} connState
 * @property {boolean} userRegistered
 * @property {Sockette} ws
 * @property {boolean} secure
 * @property {ValueSetter<Sockette>} setWs
 */
function AppBase(
  /** @type AppProps */
  { userName, hostName, connState, userRegistered, ws, secure, setWs }
) {

  useEffect(() => {
    async function clearEphemeralStorage() {
      await del(EVENTS_KEY);
    }
    clearEphemeralStorage();
  }, []);

  const appTitle = 'Chitty chat';

  useLang('en');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });

  const wsHandlers = {
    onopen: connectionOpened,
    onmessage: messageReceived,
    onclose: connectionClosed,
  };

  if (userName !== '' && hostName !== '' && ws === null) {
    const transport = secure ? 'wss' : 'ws';
    const webSocket = new Sockette(`${transport}://${hostName}`, wsHandlers);
    setWs(webSocket);
  }

  if (connState === 'connected' && ws !== null && !userRegistered) {
    get(USER_ID_KEY)
      .then((key) => registerUser(ws, userName, key));
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
