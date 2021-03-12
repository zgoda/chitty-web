import Sockette from 'sockette';
import { createContext } from 'preact';

const ws = new Sockette('ws://127.0.0.1:5000', {
  onopen: (e) => console.log(e),
  onmessage: (e) => console.log(e),
  onclose: (e) => console.log(e),
  onerror: (e) => console.log(e)
});

const WSProvider = createContext(ws);

export { WSProvider, ws };
