import { connect } from 'redux-zero/preact';

import { ConnectionBox } from './connection';
import { TopicListBox } from './topics';
import { AuthSelector } from './auth';

const mapToProps = (
  ({ connState, isLoggedIn, subscribedTopics }) =>
    ({ connState, isLoggedIn, subscribedTopics })
);

function SidebarBase({ connState, isLoggedIn, subscribedTopics }) {

  const isConnected = connState === 'connected';
  const hasTopics = subscribedTopics.length > 0;

  return (
    <div>
      {!isLoggedIn && <AuthSelector />}
      {!isConnected && isLoggedIn && <ConnectionBox />}
      {isConnected && hasTopics && <TopicListBox />}
    </div>
  );
}

const Sidebar = connect(mapToProps, null)(SidebarBase);

export { Sidebar };
