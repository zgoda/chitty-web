import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import { CloudLightning, XSquare } from 'preact-feather';
import { get, set } from 'idb-keyval';

import { actions } from '../services/state';
import { getServerMeta } from '../services/web';
import { PREVIOUS_HOSTS_KEY } from '../services/storage';

import '../typedefs';

function PreviousHostsData({ elemId }) {
  const [previousHosts, setPreviousHosts] = useState([]);

  useEffect(() => {
    async function fetch() {
      const hosts = await get(PREVIOUS_HOSTS_KEY);
      setPreviousHosts(hosts || []);
    }
    fetch();
  }, []);

  return (
    <datalist id={elemId}>
      {previousHosts.map((item) => {
        return <option value={item} key={`${elemId}-${item}`} />;
      })}
    </datalist>
  );
}

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
  const listId = `${formName}-previous-hosts`;

  const fetchServerMeta = (async (e) => {
    e.preventDefault();
    const serverMeta = await getServerMeta(host, secure);
    if (serverMeta != null) {
      setAuthHost(host);
      setChatHost(`${serverMeta.chat.host}:${serverMeta.chat.port}`);
      const hosts = await get(PREVIOUS_HOSTS_KEY) || [];
      const newHosts = Array.from(new Set([...hosts, host]));
      await set(PREVIOUS_HOSTS_KEY, newHosts);
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
        <PreviousHostsData elemId={listId} />
        <label class="form-label" for={inputId}>Server name</label>
        <div class="input-group">
          <input
            class="form-input"
            type="text"
            value={host}
            id={inputId}
            onInput={(e) => setHost(e.target.value)}
            required
            list={listId}
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
