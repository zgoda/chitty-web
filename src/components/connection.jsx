import { h } from 'preact';
import { useState } from 'preact/hooks';
import { connect } from 'redux-zero/preact';

import { actions } from '../services/state';
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
      setHasError(false);
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

export { HostSelector };
