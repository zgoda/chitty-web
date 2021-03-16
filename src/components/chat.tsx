import { FunctionalComponent, h } from 'preact';

import { MessageEditor } from './messageeditor';
import { MessageList } from './messagelist';

const Chat: FunctionalComponent = (() => {
  return (
    <div>
      <MessageList />
      <MessageEditor />
    </div>
  );
});

export { Chat };
