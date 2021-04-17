import { connect } from 'redux-zero/preact';

/**
 * @typedef {Object} ConnInfoProps
 * @property {string} chatHost - websocket server host name
 * @property {boolean} secure - flag if connection should be secured
 */

function mapToProps(
  /** @type ConnInfoProps **/
  { chatHost, secure }
) {
  return ({ chatHost, secure });
}

function ConnectionInfoBase(
  /** @type ConnInfoProps */
  { chatHost, secure }
) {

  const secureConnection = secure ? 'secure' : 'insecure';

  return (
    <div>
      {chatHost && <p>host: <strong>{chatHost}, {secureConnection}</strong></p>}
    </div>
  );
}

const ConnectionInfo = connect(mapToProps)(ConnectionInfoBase);

export { ConnectionInfo };
