import { h, JSX } from 'preact';
import { useLang, useTitle, useMeta } from 'hoofd/preact';

const App = ((): JSX.Element => {

  useLang('en');
  useTitle('Chitty chat');
  useMeta({ name: 'author', content: 'Jarek Zgoda' });

  return (
    <div class="container grid-md">
      <h1>Chitty</h1>
      <div class="columns">
        <div class="column col-9">
          Chat
        </div>
        <div class="column col-3">
          Topics
        </div>
      </div>
    </div>
  );
});

export { App };
