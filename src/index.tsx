import { h, render } from 'preact';
import 'preact/devtools';
import { Provider } from 'redux-zero/preact';

import { App } from './app';
import { store } from './state';
import './style.scss';

const root = document.getElementById('root');

if (root) {
  render(<Provider store={store}><App /></Provider>, root);
}
