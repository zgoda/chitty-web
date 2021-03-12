import { h, JSX } from 'preact';
import { useLang, useTitle, useMeta } from 'hoofd/preact';

import { WSProvider, ws } from './ws';
import { Chat } from './components/chat';
import { Sidebar } from './components/sidebar';

const App = ((): JSX.Element => {

  const appTitle = 'Chitty chat';

  useLang('en');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });

  return (
    <WSProvider.Provider value={ws}>
      <div class="container grid-md">
        <h1>{appTitle}</h1>
        <div class="columns">
          <div class="column col-9">
            <Chat />
          </div>
          <div class="column col-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </WSProvider.Provider>
  );
});

export { App };
