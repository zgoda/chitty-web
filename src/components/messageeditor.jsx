import { useState, useEffect } from 'preact/hooks';
import { Send } from 'preact-feather';
import { connect } from 'redux-zero/preact';

import { actions } from '../services/state';
import { sendChatMessage } from '../services/message';

import '../typedefs';

/**
 * @typedef {Object} MessageEditorState
 * @property {string} connState - connection status
 * @property {boolean} isLoggedIn
 * @property {Sockette} ws
 * @property {string} currentTopic - currently selected chat topic
 * @property {UserData} replyingTo
 */

function mapToProps(
  /** @type MessageEditorState */
  { connState, isLoggedIn, ws, currentTopic, replyingTo }
) {
  return ({ connState, isLoggedIn, ws, currentTopic, replyingTo });
}

/**
 * @typedef {Object} MessageEditorProps
 * @property {string} connState
 * @property {boolean} isLoggedIn
 * @property {Sockette} ws
 * @property {string} currentTopic
 * @property {UserData} replyingTo
 * @property {ValueSetter<UserData>} setReplyingTo
 */

function MessageEditorBase(
  /** @type MessageEditorProps */
  { connState, isLoggedIn, ws, currentTopic, replyingTo, setReplyingTo }
) {

  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    if (replyingTo != null) {
      setMessageText(`@${replyingTo.name} `);
    }
  }, [replyingTo]);

  const canSend = isLoggedIn && connState == 'connected' && currentTopic !== '';

  const handleMessageTextInput = (
    (/** @type InputEvent */e) => setMessageText(e.target.value.trim())
  );

  const handleSubmit = ((/** @type SubmitEvent */e) => {
    e.preventDefault();
    if (canSend && messageText.length > 0) {
      sendChatMessage(ws, messageText, currentTopic, replyingTo);
      setMessageText('');
      if (replyingTo != null) {
        setReplyingTo(null);
      }
    }
  });

  const inputId = 'message-editor-input';

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label class="form-label" for={inputId}>Message:</label>
          <div class="input-group">
            <input
              class="form-input"
              type="text"
              value={messageText}
              onInput={handleMessageTextInput}
              id={inputId}
              placeholder="type your message"
              disabled={!canSend}
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
