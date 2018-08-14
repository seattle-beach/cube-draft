import {mount} from "enzyme"
import React from "react"
import {DummyCard} from "../support/DummyCard"
import { DraftPack } from "../../src/draft/DraftPack";
import { Pack } from "../../src/pack/Pack";
import {DummyUntapClient} from "../support/DummyUntapClient"

describe('DraftPack', () => {

    describe('the drafters current picks', () => {
        it('displays a loading screen', async () => {
            const subject = await mountRender()

            expect(subject.text()).toContain('Loading picked cards...')
        })

        it('shows an error when loading fails', async () => {
            const untapClient = new DummyUntapClient()
            untapClient.pickedCards = () => Promise.reject();

            const subject = await mountRender({untapClient:untapClient})
            subject.update()

            expect(subject.text()).toContain('Unable to load picked cards')
        })

        it('shows a drafters picked cards', async () => {
            const untapClient = new DummyUntapClient()
            untapClient.pickedCards = () => Promise.resolve([
                DummyCard({name: "First Card"}),
                DummyCard({name: "Second Card"})
            ])

            const subject = await mountRender({
                untapClient: untapClient,
            })
            subject.update()

            expect(subject.text()).toContain('First Card')
            expect(subject.text()).toContain('Second Card')
        })
    })
});

function mountRender(params={}) {
    return mount(
        <DraftPack
            cards={params.cards ? params.cards : []}
            untapClient={params.untapClient ? params.untapClient : new DummyUntapClient()}
            username={params.username ? params.username : ""}
        />
    );
}