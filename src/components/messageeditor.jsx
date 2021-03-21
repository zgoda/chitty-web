import { useState } from 'preact/hooks';
import { Send } from 'preact-feather';
import { connect } from 'redux-zero/preact';

import { actions } from '../services/state';
import { sendChatMessage } from '../services/message';

const mapToProps =
  ({ connState, userRegistered, ws, currentTopic }) =>
    ({ connState, userRegistered, ws, currentTopic });

const MessageEditorBase = (({ connState, userRegistered, ws, currentTopic }) => {

  const [messageText, setMessageText] = useState('');

  const canSend = userRegistered && connState == 'connected';

  const handleMessageTextInput =
    ((e) => setMessageText(e.target.value.trim()));

  const handleSubmit = ((e) => {
    e.preventDefault();
    if (canSend && messageText.length > 0) {
      sendChatMessage(ws, messageText, currentTopic);
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
