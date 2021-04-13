//@ts-check
// holds user handle / screen name
const USER_NAME_KEY = 'screenName';
// secure connection selector
const SECURE_CONNECTION_KEY = 'secureConnection';
// chat host
const CHAT_SERVER_HOST_KEY = 'chatServer';
// auth host
const AUTH_SERVER_HOST_KEY = 'authServer';
// holds user key (ID)
const USER_ID_KEY = 'userId';
// holds offloaded events, ephemeral
const EVENTS_KEY = 'events';
// previously connected chat hosts
const PREVIOUS_HOSTS_KEY = 'previousHosts';
// previously connected auth hosts
const PREVIOUS_AUTH_HOSTS_KEY = 'previousAuthHosts';

export {
  USER_ID_KEY, USER_NAME_KEY, EVENTS_KEY, SECURE_CONNECTION_KEY, CHAT_SERVER_HOST_KEY,
  PREVIOUS_HOSTS_KEY, AUTH_SERVER_HOST_KEY, PREVIOUS_AUTH_HOSTS_KEY,
};
