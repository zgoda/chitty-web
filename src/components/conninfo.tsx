import { h, JSX } from 'preact';

type TConnectionInfoProps = {
  state: string,
  host: string,
}

const ConnectionInfo = (({ state, host }: TConnectionInfoProps): JSX.Element => {
  return (
    <div>
      <p>
        <em>Connection status:</em> <strong>{state}</strong><br />
        <em>host:</em> <strong>{host}</strong>
      </p>
    </div>
  );
});

export { ConnectionInfo };
