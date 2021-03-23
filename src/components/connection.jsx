import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { CloudLightning } from 'preact-feather';
import { connect } from 'redux-zero/preact';
import { get } from 'idb-keyval';

import { actions } from '../services/state';
import { USER_NAME_KEY } from '../services/storage';

function mapToProps({ hostName, secure, userName }) {
  return ({ hostName, secure, userName });
}

const ConnectionBoxBase =
    (({ hostName, secure, userName, setHostName, setSecure, setUserName }) => {

  const [host, setHost] = useState(hostName);
  const [secureTransport, setSecureTransport] = useState(secure);
  const [name, setName] = useState(userName);

  useEffect(() => {
    async function fetchName() {
      const savedName = await get(USER_NAME_KEY);
      if (savedName) {
        setName(savedName);
      }
    }
    fetchName();
  }, []);

  const canSave = host.length > 0;

  const handleSubmit = ((ev) => {
    ev.preventDefault();
    setHostName(host);
    setUserName(name);
    setSecure(secureTransport);
  });

  const handleHostInputChange = (e) => setHost(e.target.value.trim());

  const handleNameInputChange = (e) => setName(e.target.value.trim());

  const toggleSecure = () => setSecureTransport(!secureTransport);

  return (
    <div>
      <h3>Server connection</h3>
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
});

const ConnectionBox = connect(mapToProps, actions)(ConnectionBoxBase);

export { ConnectionBox };
