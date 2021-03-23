/**
 * @fileoverview Authentication service functions.
 */
import { parseHost } from '../utils/web';

/**
 * Perform user registration at web controller for chat server.
 * 
 * @param {string} hostName host name, possibly with port number
 * @param {boolean} secure flag if secure connection should be used
 * @param {string} userName user name as provided by user
 * @param {string} password password as provided by user
 * @returns {string} authentication token
 */
async function registerUser(hostName, secure, userName, password) {
  const hostSpec = parseHost(hostName, secure);
  const data = { name: userName, password };
  const port = hostSpec.get('port') + 1;
  const host = hostSpec.get('host');
  const urlParts = [];
  if (secure) {
    urlParts.push('https://');
  } else {
    urlParts.push('http://');
  }
  urlParts.push(`${host}:${port}/register`);
  const url = urlParts.join('');
  const resp = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  const rv = await resp.json();
  return rv.token;
}

export { registerUser };
