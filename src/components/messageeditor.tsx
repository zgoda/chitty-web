import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { Send } from 'preact-feather';
import type Sockette from 'sockette';
import { connect } from 'redux-zero/preact';

import { actions } from '../state';
import { sendChatMessage } from '../services/message';

type MapProps = {
  connState: ConnectionState,
  userRegistered: boolean,
  ws: Sockette,
  messages: Array<string>,
};

type Props = MapProps & {
  setMessages: ValueSetter<Array<string>>,
}

const mapToProps =
  ({ connState, userRegistered, ws, messages }: MapProps) =>
    ({ connState, userRegistered, ws, messages });

const MessageEditorBase =
    (({ connState, userRegistered, ws, messages, setMessages }: Props): JSX.Element => {

  const [messageText, setMessageText] = useState('');

  const canSend = userRegistered && connState == 'connected';

  const handleMessageTextInput =
    ((e: Event) => setMessageText((e.target as HTMLInputElement).value.trim()));

  const handleSubmit = ((e: Event) => {
    e.preventDefault();
    if (canSend && messageText.length > 0) {
      sendChatMessage(ws, messageText);
      const newMessages = [...messages, messageText];
      setMessages(newMessages);
      setMessageText('');
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label class="form-label" for="message-editor-input">Message:</label>
          <div class="input-group">
            <input
              class="form-input"
              type="text"
              value={messageText}
              onInput={handleMessageTextInput}
              id="message-editor-input"
              placeholder="type your message"
            />
            <button
              class={`btn btn-primary btn-action ${canSend ? '' : 'disabled'}`}
              type="submit"
            >
              <Send />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

const MessageEditor = connect(mapToProps, actions)(MessageEditorBase);

export { MessageEditor };
