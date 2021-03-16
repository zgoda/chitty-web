import { FunctionalComponent, h } from 'preact';

import { ConnectionBox } from './connection';
import { UserDataBox } from './userdata';
import { TopicListBox } from './topics';

const Sidebar: FunctionalComponent = (() => {
  return (
    <div>
      <ConnectionBox />
      <TopicListBox />
      <UserDataBox />
    </div>
  );
});

export { Sidebar };
