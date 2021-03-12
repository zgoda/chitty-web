import { h, JSX } from 'preact';

import { ConnectionBox } from './connection';

type TSidebarProps = {
  setWsHost: TStringStateSetter,
}

const Sidebar = (({ setWsHost }: TSidebarProps): JSX.Element => {
  return (
    <div>
      <ConnectionBox setWsHost={setWsHost} />
      <div>
        Topics
      </div>
      <div>
        User info
      </div>
    </div>
  );
});

export { Sidebar };
