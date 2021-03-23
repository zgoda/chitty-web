import 'preact/devtools';
import { Provider } from 'redux-zero/preact';

import { App as Application } from './components/app';
import { store } from './services/state';
import './style';

function App() {
  return (
    <Provider store={store}><Application /></Provider>
  );
}

export default App;
