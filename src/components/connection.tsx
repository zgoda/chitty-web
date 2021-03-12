import { h, JSX } from 'preact';
import { useContext } from 'preact/hooks';

import { WSProvider } from '../ws';

const ConnectionBox = ((): JSX.Element => {
  const ws = useContext(WSProvider);
  return (
    <div>
      Connection
    </div>
  );
});

export { ConnectionBox };
