import { h } from 'preact';
import { render } from '@testing-library/preact';
import { Provider } from 'redux-zero/preact';

import { ConnectionBox } from '../src/components/connection';
import { store } from '../src/services/state';


describe('ConnectionBox', () => {
  test('should have header text', () => {
    const { container } = render(<Provider store={store}><ConnectionBox /></Provider>);
    expect(container.querySelector('h3').textContent).toMatch('Server connection');
  });
});
