/**
 * @fileoverview Common typedefs for JSDoc
 * 
 * This module must be kept side-effects free as it may be imported in many places.
 */

/**
 * @typedef {import('sockette').default} Sockette
 */

/**
 * System event struct as {Object}
 * @typedef {Object} SystemEvent
 * @property {string} message - event message
 * @property {Date} date - event date
 */

/**
 * User data struct as {Object}
 * @typedef {Object} UserData
 * @property {string} name - user name
 * @property {string} key - user key (ID)
 * @property {string} clientId - user's client connection identifier
 */

/**
 * Chat message struct as {Object}
 * @typedef {Object} Message
 * @property {UserData} from - sender user information
 * @property {Date} date - timestamp when message has been sent
 * @property {string} message - message text
 */

/**
 * Generic value setter function
 * @template T
 * @typedef {Function<T>} ValueSetter
 */
