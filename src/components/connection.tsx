import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { CloudLightning } from 'preact-feather';
import { connect } from 'redux-zero/preact';

import { actions } from '../state';

interface MapProps {
  hostName: string,
}

interface Props extends MapProps {
  setHostName: ValueSetter<string>,
}

const mapToProps = ({ hostName }: MapProps) => ({ hostName });

const ConnectionBoxBase: FunctionalComponent<Props> = (({ hostName, setHostName }) => {

  const [host, setHost] = useState(hostName);

  const canSave = host.length > 0;

  const handleSubmit = ((ev: Event) => {
    ev.preventDefault();
    setHostName(host);
  });

  const handleHostInputChange =
    (e: Event) => setHost((e.target as HTMLInputElement).value.trim());

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
