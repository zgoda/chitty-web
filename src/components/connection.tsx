import { h, JSX } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { CloudLightning } from 'preact-feather';

import { WsHostOperator } from '../services/state';

const ConnectionBox = ((): JSX.Element => {

  const operator = useContext(WsHostOperator);

  const [host, setHost] = useState('');

  const handleSubmit = ((ev: Event) => {
    ev.preventDefault();
    operator.setHostName(host);
  });

  const handleHostInputChange =
    (e: Event) => setHost((e.target as HTMLInputElement).value);

  return (
    <div>
      <h3>Server connection</h3>
      <form onSubmit={handleSubmit}>
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
            <button class="btn btn-primary btn-action" type="submit">
              <CloudLightning />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

export { ConnectionBox };
