import createStore from 'redux-zero';

const initialState = {
  userName: '',
  rememberUserData: false,
  hostName: '',
  messageText: '',
  connState: 'not connected',
  userRegistered: false,
  ws: null,
  messages: [],
  subscribedTopics: [],
  currentTopic: '',
};

const store = createStore(initialState);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const actions = () => ({
  setUserName: (_state, value) => ({ userName: value }),
  setHostName: (_state, value) => ({ hostName: value }),
  setRemember: (_state, value) => ({ rememberUserData: value }),
  setMessage: (_state, value) => ({ messageText: value }),
  setConnState: (_state, value) => ({ connState: value }),
  setUserRegistered: (_state, value) => ({ userRegistered: value }),
  setWs: (_state, value) => ({ ws: value }),
  setMessages: (_state, value) => ({ messages: value }),
  setSubscribedTopics: (_state, value) => ({ subscribedTopics: value }),
  setCurrentTopic: (_state, value) => ({ currentTopic: value }),
});


export { store, actions };
