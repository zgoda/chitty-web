import { h } from 'preact';
import { connect } from 'redux-zero/preact';
import { Rss, MoreVertical } from 'preact-feather';

import { actions } from '../state';

const TopicItem = (({ topic, selectTopic }) => {

  const handleActionClick = ((e) => {
    e.preventDefault();
    selectTopic(topic);
  });

  return (
    <div class="tile tile-centered">
      <div class="tile-icon">
        <Rss />
      </div>
      <div class="tile-content">
        <div class="tile-title">{topic}</div>
      </div>
      <div class="tile-action">
        <button class="btn btn-link btn-action" onClick={handleActionClick}>
          <MoreVertical />
        </button>
      </div>
    </div>
  );
});

const mapTopProps =
  ({ currentTopic, subscribedTopics }) => ({ currentTopic, subscribedTopics });

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
        (topic) => <TopicItem topic={topic} selectTopic={selectTopic} key={topic} />
      )}
    </div>
  );
});

const TopicListBox = connect(mapTopProps, actions)(TopicListBoxBase);

export { TopicListBox };
