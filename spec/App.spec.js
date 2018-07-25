import {mount} from "enzyme";
import * as React from "react";
import App from "../src/App";
import { DummyUntapClient } from "./support/DummyUntapClient"

describe('App', () => {
    it('renders cards', () => {
        const subject = mount(<App untapClient={new DummyUntapClient()} />);
        const images = subject.find('img');
        expect(images.length).toEqual(2);
        expect(images.first().prop('src')).toEqual('some-image.png');
        expect(images.first().prop('alt')).toEqual('Card');
    })
});