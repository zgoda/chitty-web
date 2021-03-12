import { h, JSX } from 'preact';

const Sidebar = ((): JSX.Element => {
  return (
    <div>
      <div>
        Connection
      </div>
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
