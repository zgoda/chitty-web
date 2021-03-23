import { connect } from 'redux-zero/preact';

function mapToProps({ connState, hostName, secure, userRegistered }) {
  return ({ connState, hostName, secure, userRegistered });
}

const ConnectionInfoBase = (({ connState, hostName, secure, userRegistered }) => {

  const registrationStatus = userRegistered ? 'registered' : 'not registered';

  const secureConnection = secure ? ', secure' : ', insecure';

  return (
    <div>
      <p>
        <em>Connection status:</em> <strong>{connState}</strong>,&nbsp;
        <em>user status:</em> <strong>{registrationStatus}</strong>
      </p>
      {hostName && <p><em>host:</em> <strong>{hostName}{secureConnection}</strong></p>}
    </div>
  );
});

const ConnectionInfo = connect(mapToProps)(ConnectionInfoBase);

export { ConnectionInfo };
