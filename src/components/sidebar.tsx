import { h, JSX } from 'preact';

import { ConnectionBox } from './connection';

const Sidebar = ((): JSX.Element => {
  return (
    <div>
      <ConnectionBox />
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
