//@ts-check
/**
 * @fileoverview Authentication service functions.
 */
import { parseHost, makeUrl } from '../utils/web';

/**
 * Perform user registration at web controller for chat server.
 * 
 * @param {string} hostName host name, possibly with port number
 * @param {boolean} secure flag if secure connection should be used
 * @param {string} userName user name as provided by user
 * @param {string} password password as provided by user
 * @returns {Promise<string>} authentication token
 */
async function registerUser(hostName, secure, userName, password) {
  const hostSpec = parseHost(hostName, secure);
  const data = { name: userName, password };
  const url = makeUrl(hostSpec.host, hostSpec.port, secure, 'register');
  const resp = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  const rv = await resp.json();
  return rv.token;
}

/**
 * 
 * @param {string} hostName 
 * @param {boolean} secure 
 * @param {string} userName 
 * @param {string} password 
 * @returns {Promise<string>}
 */
async function loginUser(hostName, secure, userName, password) {
  const hostSpec = parseHost(hostName, secure);
  const data = { name: userName, password };
  const url = makeUrl(hostSpec.host, hostSpec.port, secure, 'login');
  const resp = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  const rv = await resp.json();
  return rv.token;
}

/**
 * 
 * @param {string} hostName 
 * @param {boolean} secure 
 * @param {string} userName 
 * @returns 
 */
async function checkUserName(hostName, secure, userName) {
  const hostSpec = parseHost(hostName, secure);
  const path = ['names', encodeURIComponent(userName)].join('/');
  const url = makeUrl(hostSpec.host, hostSpec.port, secure, path);
  const resp = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    referrerPolicy: 'no-referrer',
    mode: 'cors'
  });
  if (resp.status === 200) {
    return { ok: true, message: '' };
  } else if (resp.status === 400) {
    return { ok: false, message: 'that name is already taken' };
  }
  throw new Error('Error response from server');
}

export { registerUser, loginUser, checkUserName };
