import { ConnectionBox } from './connection';
import { TopicListBox } from './topics';

function Sidebar() {
  return (
    <div>
      <ConnectionBox />
      <TopicListBox />
    </div>
  );
}

export { Sidebar };
