import { connect } from 'redux-zero/preact';

import { ConnectionBox, HostSelector } from './connection';
import { TopicListBox } from './topics';
import { AuthSelector, Logout } from './auth';

const mapToProps = (
  ({ connState, isLoggedIn, subscribedTopics, chatHost, authHost }) =>
    ({ connState, isLoggedIn, subscribedTopics, chatHost, authHost })
);

function SidebarBase({ connState, isLoggedIn, subscribedTopics, chatHost, authHost }) {

  const canConnect = chatHost !== '' && authHost !== '';
  const isConnected = connState === 'connected';
  const hasTopics = subscribedTopics.length > 0;

  return (
    <div>
      <HostSelector />
      {!isLoggedIn && canConnect && <AuthSelector />}
      {isLoggedIn && <Logout />}
      {!isConnected && isLoggedIn && <ConnectionBox />}
      {isConnected && hasTopics && <TopicListBox />}
    </div>
  );
}

const Sidebar = connect(mapToProps, null)(SidebarBase);

export { Sidebar };
