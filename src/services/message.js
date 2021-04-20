//@ts-check
/**
 * @fileoverview Web socket and messaging services.
 */
import { bindActions } from 'redux-zero/utils';

import { store, actions } from './state';

import '../typedefs';

const DEFAULT_TOPIC = 'general';
const PERSONAL_TOPIC = 'personal';

const boundActions = bindActions(actions, store);

/**
 * Post message to chat topic.
 * 
 * Topic may be omitted, in this case message will be sent to default topic. If
 * replyingTo is provided then message will be sent as reply.
 * 
 * @param {Sockette} ws
 * @param {string} message
 * @param {string} topic
 * @param {UserData} replyingTo
 */
function sendChatMessage(ws, message, topic = DEFAULT_TOPIC, replyingTo = null) {
  const payload = {
    type: 'msg', value: message, to: topic
  };
  if (replyingTo != null) {
    payload.replyingTo = replyingTo;
    payload.type = 'reply';
  }
  ws.json(payload);
}

/**
 * Callback function executed on message arrival.
 * 
 * @param {MessageEvent} e event instance
 */
function messageReceived(e) {
  const handlers = {
    // chat message processing
    msg: (
        /** @type {{ topic: string; message: string; date: number; from: UserData; }} */
        data
    ) => {
      const messageTopic = data.topic;
      const message = data.message;
      const date = new Date(data.date * 1000);
      const from = data.from;
      const state = store.getState();
      let topic;
      if (state.userName === messageTopic) {
        topic = PERSONAL_TOPIC;
      } else {
        topic = messageTopic;
      }
      const topicMessages = state.messages.get(topic) || [];
      const newTopicMessages = [...topicMessages, { message, date, from }];
      const newMessages = new Map(state.messages);
      newMessages.set(topic, newTopicMessages);
      boundActions.setMessages(newMessages);
    },
    // system event
    event: (/** @type {{ message: string; date: number; }} */ data) => {
      const message = data.message;
      const date = new Date(data.date * 1000);
      const state = store.getState();
      const newEvents = [...state.events, { message, date }];
      boundActions.setEvents(newEvents);
    },
  };
  const data = JSON.parse(e.data);
  if (data.type in handlers) {
    handlers[data.type](data);
  }
  console.log(data);
}

/**
 * Callback function executed on connection open.
 * 
 * Note the event argument is ignored.
 */
function connectionOpened() {
  boundActions.setConnState('connected');
}

/**
 * Callback function executed on connection close.
 * 
 * @param {CloseEvent} e event instance
 */
function connectionClosed(e) {
  boundActions.setConnState('not connected');
  if ([1000, 1001, 1005].includes(e.code)) {
    boundActions.setIsLoggedIn(false);
    boundActions.setSubscribedTopics([]);
    boundActions.setCurrentTopic('');
    boundActions.setWs(null);
  }
}

export {
  sendChatMessage, messageReceived, connectionOpened, connectionClosed
};
