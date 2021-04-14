/**
 * @fileoverview Application state services.
 */
import createStore from 'redux-zero';

import '../typedefs';

const initialState = {
  userName: '',
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
  token: '',
  isLoggedIn: false,
  chatHost: '',
  authHost: '',
};

const store = createStore(initialState);

function actions() {
  return ({
    setUserName: (_state, value) => ({ userName: value }),
    setSecure: (_state, value) => ({ secure: value }),
    setConnState: (_state, value) => ({ connState: value }),
    setUserRegistered: (_state, value) => ({ userRegistered: value }),
    setWs: (_state, value) => ({ ws: value }),
    setMessages: (_state, value) => ({ messages: value }),
    setSubscribedTopics: (_state, value) => ({ subscribedTopics: value }),
    setCurrentTopic: (_state, value) => ({ currentTopic: value }),
    setEvents: (_state, value) => ({ events: value }),
    setReplyingTo: (_state, value) => ({ replyingTo: value }),
    setToken: (_state, value) => ({ token: value }),
    setIsLoggedIn: (_state, value) => ({ isLoggedIn: value }),
    setChatHost: (_state, value) => ({ chatHost: value }),
    setAuthHost: (_state, value) => ({ authHost: value }),
  });
}

export { store, actions };
