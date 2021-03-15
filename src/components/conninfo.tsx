import { FunctionComponent, h, JSX } from 'preact';
import { connect } from 'redux-zero/preact';

type Props = {
  connState: string,
  hostName: string,
};

const mapToProps = ({ connState, hostName }: Props) => ({ connState, hostName });

const ConnectionInfoBase = (({ connState, hostName }: Props): JSX.Element => {
  return (
    <div>
      <p>
        <em>Connection status:</em> <strong>{connState}</strong><br />
        <em>host:</em> <strong>{hostName}</strong>
      </p>
    </div>
  );
});

const ConnectionInfo = connect(mapToProps)(ConnectionInfoBase as FunctionComponent);

export { ConnectionInfo };
