/**
 * @fileoverview Common typedefs for JSDoc
 */

/**
 * System event struct as {Map}
 * 
 * @typedef {Map<string, string|Date>} Event
 */

/**
 * User data struct as {Object}
 * 
 * @typedef {Object} UserData
 * @property {string} name - user name
 * @property {string} key - user key (ID)
 * @property {string} client_id - user's client connection identifier
 */

/**
 * Chat message struct as {Object}
 * 
 * @typedef {Object} Message
 * @property {UserData} from - sender user information
 * @property {Date} date - timestamp when message has been sent
 * @property {string} message - message text
 */

/**
 * Message lists by topic
 * 
 * @typedef {Map<string, Array<Message>>} Messages
 */
