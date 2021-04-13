import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { CloudLightning } from 'preact-feather';
import { connect } from 'redux-zero/preact';
import { get, set } from 'idb-keyval';

import { actions } from '../services/state';
import {
  USER_NAME_KEY, SECURE_CONNECTION_KEY, CHAT_SERVER_HOST_KEY, PREVIOUS_HOSTS_KEY,
} from '../services/storage';

import '../typedefs';

function hostSelectorMapToProps({ chatHost, authHost }) {
  return { chatHost, authHost };
}

function HostSelectorBase({ chatHost, authHost, setChatHost, setAuthHost }) {

  const formName = 'host-selector';
  const chatInputId = `${formName}-chat-host`;
  const authInputId = `${formName}-auth-host`;

  return (
    <div>
      <h3>Servers</h3>
      <div class="form-group">
        <label class="form-label" for={chatInputId}>Chat host</label>
        <input
          class="form-input"
          type="text"
          value={chatHost}
          id={chatInputId}
          onInput={(e) => setChatHost(e.target.value)}
          required
        />
      </div>
      <div class="form-group">
        <label class="form-label" for={authInputId}>Auth host</label>
        <input
          class="form-input"
          type="text"
          value={authHost}
          id={authInputId}
          onInput={(e) => setAuthHost(e.target.value)}
          required
        />
      </div>
    </div>
  );
}

const HostSelector = connect(hostSelectorMapToProps, actions)(HostSelectorBase);

/**
 * @typedef {Object} ConnectionBoxProps
 * @property {ValueSetter<string>} setHostName
 * @property {ValueSetter<boolean>} setSecure
 * @property {ValueSetter<string>} setUserName
 */

function ConnectionBoxBase(
  /** @type ConnectionBoxProps */
  { setHostName, setSecure, setUserName }
) {

  const [host, setHost] = useState('');
  const [secureTransport, setSecureTransport] = useState(false);
  const [name, setName] = useState('');
  const [previousHosts, setPreviousHosts] = useState([]);

  useEffect(() => {
    async function fetchSavedData() {
      const savedName = await get(USER_NAME_KEY);
      if (savedName) {
        setName(savedName);
      }
      const savedHost = await get(CHAT_SERVER_HOST_KEY);
      if (savedHost) {
        setHost(savedHost);
      }
      const secure = await get(SECURE_CONNECTION_KEY);
      if (secure != null) {
        setSecureTransport(secure);
      }
      const previous = await get(PREVIOUS_HOSTS_KEY);
      if (previous != null) {
        setPreviousHosts(previous);
      }
    }
    fetchSavedData();
  }, []);

  const previousHostsId = 'previous-hosts-list';

  const canSave = host.length > 0;

  const handleSubmit = (async (/** @type Event */ev) => {
    ev.preventDefault();
    setHostName(host);
    setUserName(name);
    setSecure(secureTransport);
    const hosts = new Set(previousHosts);
    hosts.add(host);
    setPreviousHosts([...hosts]);
    await set(PREVIOUS_HOSTS_KEY, previousHosts);
    await set(USER_NAME_KEY, name);
    await set(SECURE_CONNECTION_KEY, secureTransport);
    await set(CHAT_SERVER_HOST_KEY, host);
  });

  const handleHostInputChange = (e) => setHost(e.target.value.trim());

  const handleNameInputChange = (e) => setName(e.target.value.trim());

  const toggleSecure = () => setSecureTransport(!secureTransport);

  return (
    <div>
      <h3>Server connection</h3>
      <datalist id={previousHostsId}>
        {previousHosts.map((host) => (
          <option value={host} key={`previous-host-${host}`} />
        ))}
      </datalist>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label class="form-switch">
            <input type="checkbox" checked={secureTransport} onClick={toggleSecure} />
            <i class="form-icon" /> secure connection
          </label>
        </div>
        <div class="form-group">
          <div class="form-label" for="chat-user-name">User name</div>
          <input
            class="form-input"
            type="text"
            id="chat-user-name"
            value={name}
            onInput={handleNameInputChange}
            placeholder="chat screen handle"
          />
        </div>
        <div class="form-group">
          <div class="form-label" for="chat-server-host">Chat server host</div>
          <div class="input-group">
            <input
              class="form-input"
              id="chat-server-host"
              type="text"
              placeholder="chat host"
              value={host}
              onInput={handleHostInputChange}
              list={previousHostsId}
            />
            <button
              class={`btn btn-primary btn-action ${canSave ? '' : 'disabled'}`}
              type="submit"
            >
              <CloudLightning />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const ConnectionBox = connect(null, actions)(ConnectionBoxBase);

export { ConnectionBox, HostSelector };
