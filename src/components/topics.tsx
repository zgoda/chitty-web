import { FunctionalComponent, h } from 'preact';
import { connect } from 'redux-zero/preact';
import { Rss, MoreVertical } from 'preact-feather';

import { actions } from '../state';

interface MapProps {
  currentTopic: string,
  subscribedTopics: Array<string>,
}

interface Props extends MapProps {
  setCurrentTopic: ValueSetter<string>,
  setSubscribedTopics: ValueSetter<Array<string>>,
}

interface TopicItemProps {
  topic: string,
  selectTopic: (topic: string) => void;
}

const TopicItem: FunctionalComponent<TopicItemProps> = (({ topic, selectTopic }) => {

  const handleActionClick = ((e: Event) => {
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
  ({ currentTopic, subscribedTopics }: MapProps) =>
    ({ currentTopic, subscribedTopics });

const TopicListBoxBase: FunctionalComponent<Props> =
    (({ currentTopic, subscribedTopics, setCurrentTopic }) => {

  const showCurrentTopic = currentTopic.length > 0;

  const selectTopic = ((topic: string) => {
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
