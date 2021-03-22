import { parseHost } from '../utils/web';

async function registerUser(hostName, secure, userName, password) {
  const hostSpec = parseHost(hostName, secure);
  const data = { name: userName, password };
  const port = hostSpec.port + 1;
  const urlParts = [];
  if (secure) {
    urlParts.push('https://');
  } else {
    urlParts.push('http://');
  }
  urlParts.push(`${hostSpec.host}:${port}/register`);
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
