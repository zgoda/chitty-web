// @ts-check

const DEFAULT_TOPIC = 'general';
const PERSONAL_TOPIC = 'personal';

/**
 * @param {string[]} rawTopics
 * @param {string} userName
 * @returns {string[]}
 */
function orderTopics(rawTopics, userName) {
  const topics = rawTopics.map((topic) => {
    if (topic === userName) {
      return PERSONAL_TOPIC;
    }
    return topic;
  });
  topics.sort((a, b) => a.localeCompare(b));
  return topics;
}

export { orderTopics, DEFAULT_TOPIC, PERSONAL_TOPIC };
