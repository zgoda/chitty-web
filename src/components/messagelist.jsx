import { connect } from 'redux-zero/preact';
import { MessageSquare } from 'preact-feather';

import { actions } from '../services/state';
import '../typedefs';

function ReplyActionItemBase({ msgFrom, setReplyingTo }) {

  const handleClick = ((e) => {
    e.preventDefault();
    setReplyingTo(msgFrom.name);
  });

  return (
    <a href="#" onClick={handleClick}>reply</a>
  );
}

const ReplyActionItem = connect(null, actions)(ReplyActionItemBase);

/**
 * @typedef {Object} DMActionProps
 * @property {UserData} msgFrom
 */

function DMActionItem(/** @type DMActionProps */{ msgFrom }) {

  const handleClick = ((e) => {
    e.preventDefault();
    console.log(`DM to ${msgFrom.name}`);
  });

  return (
    <a href="#" onClick={handleClick}>DM</a>
  );
}

/**
 * @typedef {Object} MessageActionLineProps
 * @property {Message} message
 * @property {string} userKey
 */

function MessageActionLine(/** @type MessageActionLineProps */{ message, userKey }) {

  const displayReply = message.from.key !== userKey;

  return (
    <div class="tile-subtitle">
      {displayReply && <ReplyActionItem name={message.from} />}
      {displayReply ? ' • ' : ''}
      {displayReply && <DMActionItem name={message.from} />}
      {displayReply ? ' • ' : ''}
      details
    </div>    
  );
}

function MessageItem(/** @type MessageActionLineProps */{ message, userKey }) {
  return (
    <div class="tile tile-centered">
      <div class="tile-icon">
        <MessageSquare />
      </div>
      <div class="tile-content">
        <div class="tile-title">{message.message}</div>
        <small class="tile-subtitle text-gray">
          By {message.from.name} on {message.date.toLocaleString()}
        </small>
        <MessageActionLine message={message} userKey={userKey} />
      </div>
    </div>
  );
}

/**
 * @typedef {Object} MessageListProps
 * @property {Map<string, Array<Message>>} messages all messages from application state
 * @property {string} currentTopic current selected topic
 * @property {string} userKey current user key (ID)
 */

function mapToProps(/** @type MessageListProps */ { messages, currentTopic, userKey }) {
  return ({ messages, currentTopic, userKey });
}

function MessageListBase(
  /** @type MessageListProps */
  { messages, currentTopic, userKey }
) {

  const topicMessages = messages.get(currentTopic) || [];

  return (
    <div class="message-list">
      {topicMessages.map(
        (/** @type Message */ message) => (
          <MessageItem
            message={message}
            key={message.date.toString()}
            userKey={userKey}
          />
        )
      )}
    </div>
  );
}

const MessageList = connect(mapToProps, actions)(MessageListBase);

export { MessageList };
