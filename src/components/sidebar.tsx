import { h, JSX } from 'preact';

import { ConnectionBox } from './connection';
import { UserDataBox } from './userdata';

const Sidebar = ((): JSX.Element => {
  return (
    <div>
      <ConnectionBox />
      <div>
        Topics
      </div>
      <UserDataBox />
    </div>
  );
});

export { Sidebar };
