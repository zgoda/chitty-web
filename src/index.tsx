import { h, render } from 'preact';
import 'preact/devtools';

import { App } from './app';
import './style.scss';

const root = document.getElementById('root');

if (root) {
  render(<App />, root);
}
