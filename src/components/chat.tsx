import { h, JSX } from 'preact';

import { MessageEditor } from './messageeditor';
import { MessageList } from './messagelist';

const Chat = ((): JSX.Element => {
  return (
    <div>
      <MessageList />
      <MessageEditor />
    </div>
  );
});

export { Chat };
