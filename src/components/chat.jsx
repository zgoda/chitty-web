import { MessageEditor } from './messageeditor';
import { MessageList } from './messagelist';

function Chat() {
  return (
    <div>
      <MessageList />
      <MessageEditor />
    </div>
  );
}

export { Chat };
