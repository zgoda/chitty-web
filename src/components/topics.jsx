import { useRef } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import { Rss, Square, CheckSquare } from 'preact-feather';

import { actions } from '../services/state';

const TopicItem = (({ currentTopic, topic, selectTopic }) => {

  const selectTopicButtonRef = useRef(null);

  const handleActionClick = ((e) => {
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
});

function mapTopProps({ currentTopic, subscribedTopics }) {
  return ({ currentTopic, subscribedTopics });
}

const TopicListBoxBase = (({ currentTopic, subscribedTopics, setCurrentTopic }) => {

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
});

const TopicListBox = connect(mapTopProps, actions)(TopicListBoxBase);

export { TopicListBox };
