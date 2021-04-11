/**
 * @fileoverview Application state services.
 */
import createStore from 'redux-zero';

import '../typedefs';

const initialState = {
  userName: '',
  userKey: '',
  hostName: '',
  secure: false,
  connState: 'not connected',
  userRegistered: false,
  /** @type Sockette */
  ws: null,
  /** @type Map<string, Array<Message>> */
  messages: new Map(),
  /** @type Array<string> */
  subscribedTopics: [],
  currentTopic: '',
  /** @type Array<SystemEvent> */
  events: [],
  /** @type UserData */
  replyingTo: null,
};

const store = createStore(initialState);

function actions() {
  return ({
    setUserName: (_state, /** @type string */ value) => ({ userName: value }),
    setUserKey: (_state, /** @type string */ value) => ({ userKey: value }),
    setHostName: (_state, /** @type string */ value) => ({ hostName: value }),
    setSecure: (_state, /** @type boolean */ value) => ({ secure: value }),
    setConnState: (_state, /** @type string */ value) => ({ connState: value }),
    setUserRegistered:
      (_state, /** @type boolean */ value) => ({ userRegistered: value }),
    setWs: (_state, /** @type Sockette */ value) => ({ ws: value }),
    setMessages:
      (_state, /** @type Map<string, Array<Message>> */ value) => ({ messages: value }),
    setSubscribedTopics:
      (_state, /** @type Array<string> */ value) => ({ subscribedTopics: value }),
    setCurrentTopic: (_state, /** @type string */ value) => ({ currentTopic: value }),
    setEvents: (_state, /** @type Array<SystemEvent> */ value) => ({ events: value }),
    setReplyingTo: (_state, /** @type UserData */ value) => ({ replyingTo: value }),
  });
}

export { store, actions };
