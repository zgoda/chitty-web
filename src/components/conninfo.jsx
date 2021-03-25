import { connect } from 'redux-zero/preact';

/**
 * @typedef {Object} ConnInfoProps
 * @property {string} connState - connection status
 * @property {string} hostName - websocket server host name
 * @property {boolean} secure - flag if connection should be secured
 * @property {boolean} userRegistered - flag if user is already registered
 */

function mapToProps(
      /** @type ConnInfoProps **/{ connState, hostName, secure, userRegistered }
    ) {
  return ({ connState, hostName, secure, userRegistered });
}

/**
 * Component that displays connection information.
 * 
 * @param {ConnInfoProps} props
 * @returns connection info component
 */
function ConnectionInfoBase({ connState, hostName, secure, userRegistered }) {

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
}

const ConnectionInfo = connect(mapToProps)(ConnectionInfoBase);

export { ConnectionInfo };
