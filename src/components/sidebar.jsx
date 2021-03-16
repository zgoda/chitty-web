import { ConnectionBox } from './connection';
import { UserDataBox } from './userdata';
import { TopicListBox } from './topics';

const Sidebar = (() => {
  return (
    <div>
      <ConnectionBox />
      <TopicListBox />
      <UserDataBox />
    </div>
  );
});

export { Sidebar };
