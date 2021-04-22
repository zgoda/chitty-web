import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import { CloudLightning, XSquare } from 'preact-feather';

import { actions } from '../services/state';
import { getServerMeta } from '../services/web';

import '../typedefs';

function hostSelectorMapToProps({ secure }) {
  return { secure };
}

function HostSelectorBase({ secure, setChatHost, setAuthHost, setSecure }) {

  const [host, setHost] = useState('');
  const [hasError, setHasError] = useState(false);

  const submitButtonRef = useRef(null);
  const resetButtonRef = useRef(null);

  const formName = 'host-selector';
  const inputId = `${formName}-host`;

  const fetchServerMeta = (async (e) => {
    e.preventDefault();
    const serverMeta = await getServerMeta(host, secure);
    if (serverMeta != null) {
      setAuthHost(host);
      setChatHost(`${serverMeta.chat.host}:${serverMeta.chat.port}`);
    }
    setHasError(serverMeta == null);
    submitButtonRef.current && submitButtonRef.current.blur();
  });

  const formReset = ((e) => {
    e.preventDefault();
    setHost('');
    setHasError(false);
    setAuthHost('');
    setChatHost('');
    resetButtonRef.current && resetButtonRef.current.blur();
  });

  return (
    <form onSubmit={fetchServerMeta} onReset={formReset}>
      <div class={hasError ? 'form-group has-error' : 'form-group'}>
        <label class="form-label" for={inputId}>Server name</label>
        <div class="input-group">
          <input
            class="form-input"
            type="text"
            value={host}
            id={inputId}
            onInput={(e) => setHost(e.target.value)}
            onBlur={fetchServerMeta}
            required
          />
          <button
            class="btn btn-primary btn-action"
            type="submit"
            ref={submitButtonRef}
          >
            <CloudLightning />
          </button>
          <button class="btn btn-link btn-action" type="reset" ref={resetButtonRef}>
            <XSquare />
          </button>
        </div>
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
    </form>
  );
}

const HostSelector = connect(hostSelectorMapToProps, actions)(HostSelectorBase);

export { HostSelector };
