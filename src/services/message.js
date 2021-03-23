/**
 * @fileoverview Web socket and messaging services.
 */
import { set } from 'idb-keyval';
import { bindActions } from 'redux-zero/utils';
// eslint-disable-next-line no-unused-vars
import Sockette from 'sockette';

import { USER_ID_KEY } from './storage';
import { store, actions } from './state';

const DEFAULT_TOPIC = 'general';
const PERSONAL_TOPIC = 'personal';

const boundActions = bindActions(actions, store);

/**
 * Register user in chat server.
 * 
 * @param {Sockette} ws web socket object
 * @param {string} name user screen name / handle
 * @param {?string} key user key (possibly null)
 */
function registerUser(ws, name, key) {
  const payload = {
    type: 'reg', value: name,
  };
  if (key !== null) {
    payload.key = key;
  }
  ws.json(payload);
}

/**
 * Post message to chat topic.
 * 
 * Topic may be omitted, in this case message will be sent to default topic.
 * 
 * @param {Sockette} ws web socket object
 * @param {string} message message to be sent
 * @param {string} topic topic where message will be posted
 */
function sendChatMessage(ws, message, topic = DEFAULT_TOPIC) {
  const payload = {
    type: 'msg', value: message, to: topic
  };
  ws.json(payload);
}

/**
 * Callback function executed on message arrival.
 * 
 * @param {MessageEvent} e event instance
 */
function messageReceived(e) {
  const handlers = {
    // user registration
    reg: (data) => {
      const key = data.key || '';
      if (key !== '') {
        set(USER_ID_KEY, key);
        boundActions.setUserKey(key);
      }
      boundActions.setUserRegistered(true);
      const topics = data.topics || [];
      boundActions.setSubscribedTopics(topics.map((topic) => {
        if (topic === key) {
          return PERSONAL_TOPIC;
        }
        return topic;
      }));
      boundActions.setCurrentTopic(DEFAULT_TOPIC);    
    },
    // message processing
    msg: (data) => {
      const messageTopic = data.topic;
      const message = data.message;
      const date = new Date(data.date * 1000);
      const from = data.from;
      const state = store.getState();
      let topic;
      if (state.userKey === messageTopic) {
        topic = PERSONAL_TOPIC;
      } else {
        topic = messageTopic;
      }
      const topicMessages = state.messages[topic] || [];
      const newTopicMessages = [...topicMessages, { message, date, from }];
      const newMessages = {};
      Object.assign(newMessages, state.messages);
      newMessages[topic] = newTopicMessages;
      boundActions.setMessages(newMessages);
    },
    // system event
    event: (data) => {
      const message = data.value;
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
    boundActions.setUserRegistered(false);
    boundActions.setWs(null);
  }
}

export {
  registerUser, sendChatMessage, messageReceived, connectionOpened, connectionClosed
};
