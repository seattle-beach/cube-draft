import {mount} from "enzyme";
import * as React from "react";
import App from "../src/App";
import { DummyUntapClient } from "./support/DummyUntapClient"
import { DummyCard } from "./support/DummyCard";

describe('App', () => {
    it('renders cards', async () => {
        const untapClient = new DummyUntapClient()
        untapClient.getPack = () => {
            return Promise.resolve([ DummyCard(), DummyCard() ])
        }

        const subject = await mount(<App untapClient={untapClient} />);
        subject.update();
        const images = subject.find('img');
        expect(images.length).toEqual(2);
    })
});