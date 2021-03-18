import { h } from 'preact';
import { useState } from 'preact/hooks';
import { CloudLightning } from 'preact-feather';
import { connect } from 'redux-zero/preact';

import { actions } from '../services/state';

const mapToProps = ({ hostName, secure }) => ({ hostName, secure });

const ConnectionBoxBase = (({ hostName, secure, setHostName, setSecure }) => {

  const [host, setHost] = useState(hostName);
  const [secureTransport, setSecureTransport] = useState(secure);

  const canSave = host.length > 0;

  const handleSubmit = ((ev) => {
    ev.preventDefault();
    setHostName(host);
    setSecure(secureTransport);
  });

  const handleHostInputChange = (e) => setHost(e.target.value.trim());

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
