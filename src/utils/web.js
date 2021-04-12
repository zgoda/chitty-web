//@ts-check
/**
 * @fileoverview Web operations related utilities:
 * 
 *  - URL parsing
 */

/**
 * Parse host name string, possibly with port number, into {Map} of host and port.
 * 
 * For a specific case when default port may be used, provide `secure` boolean flag that
 * will help to determine port. Note that if host contains port information, it will
 * be used regardless of this flag.
 * 
 * @param {string} hostName host name
 * @param {boolean} secure flag to infer default port in case it's not provided
 * @returns {Map<string, string>} a Map instance with host and port
 */
function parseHost(hostName, secure) {
  const parts = hostName.split(':');
  if (parts.length > 1) {
    return new Map([
      ['host', parts[0]],
      ['port', parts[1]],
    ]);
  }
  const port = secure ? '443' : '80';
  return new Map([
    ['host', parts[0]],
    ['port', port],
  ]);
}

/**
 * 
 * @param {string} host 
 * @param {number} port 
 * @param {boolean} secure 
 * @returns {string}
 */
function makeUrl(host, port, secure) {
  const urlParts = [];
  if (secure) {
    urlParts.push('https://');
  } else {
    urlParts.push('http://');
  }
  urlParts.push(`${host}:${port}`);
  return urlParts.join('');
}

export { parseHost, makeUrl };
