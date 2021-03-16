import { MessageEditor } from './messageeditor';
import { MessageList } from './messagelist';

const Chat = (() => {
  return (
    <div>
      <MessageList />
      <MessageEditor />
    </div>
  );
});

export { Chat };
