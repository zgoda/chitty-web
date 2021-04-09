import { connect } from 'redux-zero/preact';

/**
 * @typedef {Object} ConnInfoProps
 * @property {string} connState - connection status
 * @property {string} hostName - websocket server host name
 * @property {boolean} secure - flag if connection should be secured
 * @property {boolean} userRegistered - flag if user is already registered
 */

function mapToProps(
  /** @type ConnInfoProps **/
  { connState, hostName, secure, userRegistered }
) {
  return ({ connState, hostName, secure, userRegistered });
}

function ConnectionInfoBase(
  /** @type ConnInfoProps */
  { connState, hostName, secure, userRegistered }
) {

  const registrationStatus = userRegistered ? 'registered' : 'not registered';

  const secureConnection = secure ? 'secure' : 'insecure';

  return (
    <div>
      <p>
        Connection status: <strong>{connState}</strong>,&nbsp;
        user status: <strong>{registrationStatus}</strong>
      </p>
      {hostName && <p>host: <strong>{hostName}, {secureConnection}</strong></p>}
    </div>
  );
}

const ConnectionInfo = connect(mapToProps)(ConnectionInfoBase);

export { ConnectionInfo };
