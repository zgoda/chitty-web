import { h } from 'preact';
import { ConnectionManager } from '../src/components/connection';
import { shallow } from 'enzyme';

describe('Initial Test of the Connection Manager Box', () => {
    test('Connection Manager Box contains expected text', () => {
        const context = shallow(<ConnectionManager />);
        expect(context.find('div').text()).toBe('Connection');
    });
});
