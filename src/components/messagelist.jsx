import { connect } from 'redux-zero/preact';
import { actions } from '../services/state';
import { MessageSquare } from 'preact-feather';

const MessageActionLine = (({ message, userKey }) => {

  const displayReply = message.from.key !== userKey;

  return (
    <div class="tile-subtitle">
      {displayReply ? 'reply · DM · ' : ''}details
    </div>    
  );
});

const MessageItem = (({ message, userKey }) => {
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
});

function mapToProps({ messages, currentTopic, userKey }) {
  return ({ messages, currentTopic, userKey });
}

const MessageListBase = (({ messages, currentTopic, userKey }) => {

  const topicMessages = messages[currentTopic] || [];

  return (
    <div class="message-list">
      {topicMessages.map(
        (message) => (
          <MessageItem
            message={message}
            key={message.date.toString()}
            userKey={userKey}
          />
        )
      )}
    </div>
  );
});

const MessageList = connect(mapToProps, actions)(MessageListBase);

export { MessageList };
