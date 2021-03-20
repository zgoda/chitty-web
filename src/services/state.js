import createStore from 'redux-zero';

const initialState = {
  userName: '',
  userKey: '',
  hostName: '',
  secure: false,
  connState: 'not connected',
  userRegistered: false,
  ws: null,
  messages: {},
  subscribedTopics: [],
  currentTopic: '',
};

const store = createStore(initialState);

const actions = () => ({
  setUserName: (_state, value) => ({ userName: value }),
  setUserKey: (_state, value) => ({ userKey: value }),
  setHostName: (_state, value) => ({ hostName: value }),
  setSecure: (_state, value) => ({ secure: value }),
  setConnState: (_state, value) => ({ connState: value }),
  setUserRegistered: (_state, value) => ({ userRegistered: value }),
  setWs: (_state, value) => ({ ws: value }),
  setMessages: (_state, value) => ({ messages: value }),
  setSubscribedTopics: (_state, value) => ({ subscribedTopics: value }),
  setCurrentTopic: (_state, value) => ({ currentTopic: value }),
});


export { store, actions };
