import { useRef } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import { Rss, Square, CheckSquare } from 'preact-feather';

import { actions } from '../services/state';

import '../typedefs';

/**
 * @typedef {Object} TopicItemProps
 * @property {string} currentTopic
 * @property {string} topic
 * @property {ValueSetter<string>} selectTopic
 */

function TopicItem(/** @type TopicItemProps */{ currentTopic, topic, selectTopic }) {

  const selectTopicButtonRef = useRef(null);

  const handleActionClick = ((/** @type MouseEvent */e) => {
    e.preventDefault();
    selectTopicButtonRef.current && selectTopicButtonRef.current.blur();
    selectTopic(topic);
  });

  const currentSelected = currentTopic === topic;

  return (
    <div class="tile tile-centered">
      <div class="tile-icon">
        <Rss />
      </div>
      <div class="tile-content">
        <div class="tile-title">{topic}</div>
      </div>
      <div class="tile-action">
        <button
          class="btn btn-link btn-action"
          onClick={handleActionClick}
          ref={selectTopicButtonRef}
        >
          {currentSelected ? <CheckSquare /> : <Square />}
        </button>
      </div>
    </div>
  );
}

/**
 * @typedef {Object} TopicListStateItems
 * @property {string} currentTopic
 * @property {Array<string>} subscribedTopics
 */

function mapTopProps(
  /** @type TopicListStateItems */
  { currentTopic, subscribedTopics }
) {
  return ({ currentTopic, subscribedTopics });
}

/**
 * @typedef {Object} TopicListProps
 * @property {string} currentTopic
 * @property {Array<string>} subscribedTopics
 * @property {ValueSetter<string} setCurrentTopic
 */

function TopicListBoxBase(
  /** @type TopicListProps */
  { currentTopic, subscribedTopics, setCurrentTopic }
) {

  const showCurrentTopic = currentTopic.length > 0;

  const selectTopic = ((topic) => {
    setCurrentTopic(topic);
  });

  return (
    <div>
      <h3>Topics</h3>
      {
        showCurrentTopic &&
        <p><em>Current topic:</em> <strong>{currentTopic}</strong></p>
      }
      {subscribedTopics.map(
        (topic) => (
          <TopicItem
            currentTopic={currentTopic}
            topic={topic}
            selectTopic={selectTopic}
            key={topic}
          />
        )
      )}
    </div>
  );
}

const TopicListBox = connect(mapTopProps, actions)(TopicListBoxBase);

export { TopicListBox };
