import { h, JSX } from 'preact';

import { ConnectionBox } from './connection';
import { UserDataBox } from './userdata';
import { TopicListBox } from './topics';

const Sidebar = ((): JSX.Element => {
  return (
    <div>
      <ConnectionBox />
      <TopicListBox />
      <UserDataBox />
    </div>
  );
});

export { Sidebar };
