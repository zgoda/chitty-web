import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { CloudLightning } from 'preact-feather';
import { connect } from 'redux-zero/preact';
import { get, set } from 'idb-keyval';

import { actions } from '../services/state';
import {
  USER_NAME_KEY, SECURE_CONNECTION_KEY, CHAT_SERVER_HOST_KEY, PREVIOUS_HOSTS_KEY,
} from '../services/storage';
import { getServerMeta } from '../services/web';

import '../typedefs';

function hostSelectorMapToProps({ secure }) {
  return { secure };
}

function HostSelectorBase({ secure, setChatHost, setAuthHost, setSecure }) {

  const [host, setHost] = useState('');
  const [hasError, setHasError] = useState(false);

  const formName = 'host-selector';
  const inputId = `${formName}-host`;

  const fetchServerMeta = (async (e) => {
    e.preventDefault();
    const serverMeta = await getServerMeta(host, secure);
    if (serverMeta != null) {
      setAuthHost(host);
      setChatHost(`${serverMeta.chat.host}:${serverMeta.chat.port}`);
    } else {
      setHasError(true);
    }
  });

  return (
    <div>
      <div class={hasError ? 'form-group has-error' : 'form-group'}>
        <label class="form-label" for={inputId}>Server name</label>
        <input
          class="form-input"
          type="text"
          value={host}
          id={inputId}
          onInput={(e) => setHost(e.target.value)}
          onBlur={fetchServerMeta}
          required
        />
        {hasError && <p class="form-input-hint">specified server is invalid</p>}
      </div>
      <div class="form-group">
        <label class="form-switch">
          <input type="checkbox"
            checked={secure}
            onClick={(e) => setSecure(e.target.value)}
          />
            <i class="form-icon" /> secure connection
          </label>
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
