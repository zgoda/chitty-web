import { h, JSX } from 'preact';

import { ConnectionManager } from './connection';

const Sidebar = ((): JSX.Element => {
  return (
    <div>
      <ConnectionManager />
      <div>
        Topics
      </div>
      <div>
        User info
      </div>
    </div>
  );
});

export { Sidebar };
