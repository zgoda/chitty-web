import { useState, useEffect } from 'preact/hooks';
import { Send } from 'preact-feather';
import { connect } from 'redux-zero/preact';

import { actions } from '../services/state';
import { sendChatMessage } from '../services/message';

import '../typedefs';

/**
 * @typedef {Object} MessageEditorState
 * @property {string} connState - connection status
 * @property {boolean} userRegistered - flag whether user is registered already
 * @property {Sockette} ws - web socket object
 * @property {string} currentTopic - currently selected chat topic
 * @property {UserData} replyingTo
 */

function mapToProps(
  /** @type MessageEditorState */
  { connState, userRegistered, ws, currentTopic, replyingTo }
) {
  return ({ connState, userRegistered, ws, currentTopic, replyingTo });
}

/**
 * @typedef {Object} MessageEditorProps
 * @property {string} connState
 * @property {boolean} userRegistered
 * @property {Sockette} ws
 * @property {string} currentTopic
 * @property {UserData} replyingTo
 * @property {Function} setReplyingTo
 */

function MessageEditorBase(
  /** @type MessageEditorProps */
  { connState, userRegistered, ws, currentTopic, replyingTo, setReplyingTo }
) {

  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    if (replyingTo != null) {
      setMessageText(`@${replyingTo.name} `);
    }
  }, [replyingTo]);

  const canSend = userRegistered && connState == 'connected';

  const handleMessageTextInput =
    ((e) => setMessageText(e.target.value.trim()));

  const handleSubmit = ((e) => {
    e.preventDefault();
    if (canSend && messageText.length > 0) {
      sendChatMessage(ws, messageText, currentTopic, replyingTo);
      setMessageText('');
      if (replyingTo != null) {
        setReplyingTo(null);
      }
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
