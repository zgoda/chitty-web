import { set } from 'idb-keyval';
import { bindActions } from 'redux-zero/utils';

import { USER_ID_KEY } from './storage';
import { store, actions } from './state';

const DEFAULT_TOPIC = 'general';

const boundActions = bindActions(actions, store);

function registerUser(ws, name, key) {
  const payload = {
    type: 'reg', value: name,
  };
  if (key !== null) {
    payload.key = key;
  }
  ws.json(payload);
}

function sendChatMessage(ws, message, topic = DEFAULT_TOPIC) {
  const payload = {
    type: 'msg', value: message, to: topic
  };
  ws.json(payload);
}

function messageReceived(e) {
  const data = JSON.parse(e.data);
  console.log(data);
  if (data.type === 'reg') {
    const key = data.key || '';
    if (key !== '') {
      set(USER_ID_KEY, key);
    }
    boundActions.setUserRegistered(true);
    const topics = data.topics || [];
    boundActions.setSubscribedTopics(topics.map((topic) => {
      if (topic === key) {
        return 'personal';
      }
      return topic;
    }));
    boundActions.setCurrentTopic(DEFAULT_TOPIC);
  }
}

function connectionOpened() {
  boundActions.setConnState('connected');
}

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
