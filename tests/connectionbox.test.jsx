import { h } from 'preact';
import { ConnectionBox } from '../src/components/connection';
import { shallow } from 'enzyme';

describe('Initial Test of the Connection Box', () => {
    test('Connection Box contains expected text', () => {
        const context = shallow(<ConnectionBox />);
        expect(context.find('div').text()).toBe('Connection');
    });
});
