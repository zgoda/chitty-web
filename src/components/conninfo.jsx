import { connect } from 'redux-zero/preact';

/**
 * @typedef {Object} ConnInfoProps
 * @property {string} chatHost
 * @property {string} connState
 * @property {boolean} secure
 */

function mapToProps(
  /** @type ConnInfoProps **/
  { chatHost, connState, secure }
) {
  return ({ chatHost, connState, secure });
}

function ConnectionInfoBase(
  /** @type ConnInfoProps */
  { chatHost, connState, secure }
) {

  const secureConnection = secure ? 'secure' : 'insecure';

  const showInfo = chatHost !== '' && connState === 'connected';

  return (
    <div>
      {showInfo && <p>host: <strong>{chatHost}, {secureConnection}</strong></p>}
    </div>
  );
}

const ConnectionInfo = connect(mapToProps)(ConnectionInfoBase);

export { ConnectionInfo };
