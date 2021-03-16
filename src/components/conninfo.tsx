import { FunctionalComponent, h } from 'preact';
import { connect } from 'redux-zero/preact';

interface Props {
  connState: ConnectionState,
  hostName: string,
  userRegistered: boolean,
}

const mapToProps =
  ({ connState, hostName, userRegistered }: Props) =>
    ({ connState, hostName, userRegistered });

const ConnectionInfoBase: FunctionalComponent<Props> =
    (({ connState, hostName, userRegistered }) => {
  const registrationStatus = userRegistered ? 'registered' : 'not registered';
  return (
    <div>
      <p>
        <em>Connection status:</em> <strong>{connState}</strong>,&nbsp;
        <em>user status:</em> <strong>{registrationStatus}</strong>
      </p>
      {hostName && <p><em>host:</em> <strong>{hostName}</strong></p>}
    </div>
  );
});

const ConnectionInfo = connect(mapToProps)(ConnectionInfoBase);

export { ConnectionInfo };
