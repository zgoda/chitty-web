//@ts-check
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
  token: '',
  isLoggedIn: false,
};

const store = createStore(initialState);

function actions() {
  return ({
    setUserName:
      (/** @type {any} */ _state, /** @type string */ value) => ({ userName: value }),
    setUserKey:
      (/** @type {any} */ _state, /** @type string */ value) => ({ userKey: value }),
    setHostName:
      (/** @type {any} */ _state, /** @type string */ value) => ({ hostName: value }),
    setSecure:
      (/** @type {any} */ _state, /** @type boolean */ value) => ({ secure: value }),
    setConnState:
      (/** @type {any} */ _state, /** @type string */ value) => ({ connState: value }),
    setUserRegistered:
      (/** @type {any} */ _state, /** @type boolean */ value) =>
        ({ userRegistered: value }),
    setWs: (/** @type {any} */ _state, /** @type Sockette */ value) => ({ ws: value }),
    setMessages:
      (/** @type {any} */ _state, /** @type Map<string, Array<Message>> */ value) =>
        ({ messages: value }),
    setSubscribedTopics:
      (/** @type {any} */ _state, /** @type Array<string> */ value) =>
        ({ subscribedTopics: value }),
    setCurrentTopic:
      (/** @type {any} */ _state, /** @type string */ value) =>
        ({ currentTopic: value }),
    setEvents:
      (/** @type {any} */ _state, /** @type Array<SystemEvent> */ value) =>
        ({ events: value }),
    setReplyingTo:
      (/** @type {any} */ _state, /** @type UserData */ value) =>
        ({ replyingTo: value }),
    setToken: 
      (/** @type {any} */ _state, /** @type {string} */ value) => ({ token: value }),
    setIsLoggedIn:
      (/** @type {any} */ _state, /** @type {boolean} */ value) =>
        ({ isLoggedIn: value }),
  });
}

export { store, actions };
