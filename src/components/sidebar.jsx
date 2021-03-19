import { ConnectionBox } from './connection';
import { TopicListBox } from './topics';

const Sidebar = (() => {
  return (
    <div>
      <ConnectionBox />
      <TopicListBox />
    </div>
  );
});

export { Sidebar };
