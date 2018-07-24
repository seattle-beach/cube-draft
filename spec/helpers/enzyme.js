import {configure} from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

beforeEach(function () {
    jasmineEnzyme();
});