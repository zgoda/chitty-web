import { useState } from 'preact/hooks';
import { Send } from 'preact-feather';
import { connect } from 'redux-zero/preact';
// eslint-disable-next-line no-unused-vars
import Sockette from 'sockette';

import { actions } from '../services/state';
import { sendChatMessage } from '../services/message';

/**
 * @typedef {Object} MessageEditorProps
 * @property {string} connState - connection status
 * @property {boolean} userRegistered - flag whether user is registered already
 * @property {Sockette} ws - web socket object
 * @property {string} currentTopic - currently selected chat topic
 */

function mapToProps(
      /** @type MessageEditorProps */{ connState, userRegistered, ws, currentTopic }
    ) {
  return ({ connState, userRegistered, ws, currentTopic });
}

/**
 * Component that displays message editing control.
 * 
 * @param {MessageEditorProps} props
 * @returns HTML `form` enclosed in appropriate `div`
 */
function MessageEditorBase({ connState, userRegistered, ws, currentTopic }) {

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
}

const MessageEditor = connect(mapToProps, actions)(MessageEditorBase);

export { MessageEditor };
