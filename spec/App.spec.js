import {mount} from "enzyme";
import * as React from "react";
import App from "../src/App";
import { DummyUntapClient } from "./support/DummyUntapClient"
import { DummyCard } from "./support/DummyCard";
import {MemoryRouter} from 'react-router'
import {Join} from "../src/join/Join"

describe('App', () => {
    describe("/", () => {
        it('shows a join page', () => {
            const subject = mountRender({
                route: "/"
            })

            expect(subject.find(Join).exists()).toBeTruthy()
        })
    })

    describe("/draft", () => {
        it('shows user their username', () => {
            const subject = mountRender({
                route: "/draft/a-drafter"
            })

            expect(subject.text()).toContain("Hello a-drafter")
        })

        it('lets the user draft cards', async () => {
            const untapClient = new DummyUntapClient()
            untapClient.getPack = () => {
                return Promise.resolve([ DummyCard(), DummyCard() ])
            }
    
            const subject = await mountRender({
                route: "/draft/a-drafter",
                untapClient: untapClient
            })
            subject.update();

            const images = subject.find('img');
            expect(images.length).toEqual(2);
        })
    })
});

function mountRender(params) {
    return mount(
        <MemoryRouter initialEntries={[params.route ? params.route : "/:"]}>
            <App untapClient={params.untapClient ? params.untapClient : new DummyUntapClient () } />
        </MemoryRouter>
    );
}