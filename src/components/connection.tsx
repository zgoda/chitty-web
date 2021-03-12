import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { CloudLightning } from 'preact-feather';

type TConnectionBoxProps = {
  setWsHost: TStringStateSetter,
};

const ConnectionBox = (({ setWsHost }: TConnectionBoxProps): JSX.Element => {

  const [host, setHost] = useState('');

  const handleSubmit = ((ev: Event) => {
    ev.preventDefault();
    setWsHost(host);
  });

  const handleHostInputChange =
    (e: Event) => setHost((e.target as HTMLInputElement).value);

  return (
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
          <button class="btn btn-action" type="submit">
            <CloudLightning />
          </button>
        </div>
      </div>
    </form>
  );
});

export { ConnectionBox };
