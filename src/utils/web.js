//@ts-check
/**
 * @fileoverview Web operations related utilities:
 * 
 *  - URL parsing
 *  - URL building
 */

/**
 * @typedef {Object} HostSpec
 * @property {string} host
 * @property {number} port
 */

/**
 * Parse host name string, possibly with port number, into {Map} of host and port.
 * 
 * For a specific case when default port may be used, provide `secure` boolean flag that
 * will help to determine port. Note that if host contains port information, it will
 * be used regardless of this flag.
 * 
 * @param {string} hostName
 * @param {boolean} secure
 * @returns {HostSpec}
 */
function parseHost(hostName, secure) {
  const parts = hostName.split(':');
  if (parts.length > 1) {
    return {
      host: parts[0],
      port: parseInt(parts[1], 10),
    };
  }
  const port = secure ? 443 : 80;
  return {
    host: parts[0],
    port,
  };
}

/**
 * Build host URL.
 * 
 * Path parameter is optional, if provided it will be added to URL.
 * 
 * @param {string} host 
 * @param {number} port 
 * @param {boolean} secure
 * @param {(string|null)} [path=null]
 * @returns {string}
 */
function makeUrl(host, port, secure, path = null) {
  /** @type string[] */
  const urlParts = [];
  if (secure) {
    urlParts.push('https:/');
  } else {
    urlParts.push('http:/');
  }
  urlParts.push(`${host}:${port}`);
  if (path != null) {
    urlParts.push(path);
  }
  return urlParts.join('/');
}

/**
 * Build WebSocket URL
 * 
 * @param {string} host 
 * @param {number} port 
 * @param {boolean} secure 
 * @param {string} token 
 * @returns {string}
 */
function makeWsUrl(host, port, secure, token) {
  const urlParts = [];
  if (secure) {
    urlParts.push('wss:/');
  } else {
    urlParts.push('ws:/');
  }
  urlParts.push(`${host}:${port}`, token);
  return urlParts.join('/');
}

export { parseHost, makeUrl, makeWsUrl };
