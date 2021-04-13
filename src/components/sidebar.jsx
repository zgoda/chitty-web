import { ConnectionBox } from './connection';
import { TopicListBox } from './topics';
import { AuthSelector } from './auth';

function Sidebar() {
  return (
    <div>
      <AuthSelector />
      <ConnectionBox />
      <TopicListBox />
    </div>
  );
}

export { Sidebar };
