// @ts-check
import { makeUrl, parseHost } from '../utils/web';

/**
 * 
 * @param {string} hostName 
 * @param {boolean} secure 
 * @returns {Promise}
 */
async function getServerMeta(hostName, secure) {
  const hostSpec = parseHost(hostName, secure);
  const url = makeUrl(hostSpec.host, hostSpec.port, secure, 'meta');
  const resp = await fetch(url, {
    method: 'GET',
    referrerPolicy: 'no-referrer',
  });
  return await resp.json();
}

export { getServerMeta };
