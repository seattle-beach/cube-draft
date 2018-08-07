import {mount} from "enzyme"
import React from "react"
import {DummyCard} from "../support/DummyCard"
import { DraftPack } from "../../src/draft/DraftPack";
import {DummyUntapClient} from "../support/DummyUntapClient"

describe('DraftPack', () => {
    it('adds selected card to drafted cards', () => {
        const cards = [ DummyCard({name: "some-card"}, DummyCard()) ]
        const subject = mountRender({cards: cards})
        const draftCards = () => subject.find('[data-cy="drafted-card"]')

        expect(draftCards().length).toEqual(0)

        subject.find('img').first().simulate('click')
        subject.find('button').first().simulate('click')

        expect(draftCards().length).toEqual(1)
        expect(draftCards().first().text()).toEqual("some-card")
    })

    it('only drafts when a card is selected', async () => {
        const cards = [ DummyCard({name: "some-card"}, DummyCard()) ]
        const subject = mountRender({cards: cards})

        subject.find('button').first().simulate('click')
        subject.find('img').first().simulate('click')

        expect(subject.find('[data-cy="drafted-card"]').length).toEqual(0)
    })

    it('saves the drafted card', () => {
        const untapClient = new DummyUntapClient()
        untapClient.pickCard = jasmine.createSpy('pickCard')
        const cards = [ DummyCard({id: 123}) ]

        const subject = mountRender({
            cards: cards,
            untapClient: untapClient,
            username: "some-user"
        })

        expect(untapClient.pickCard).toHaveBeenCalledTimes(0)

        subject.find('img').first().simulate('click')
        subject.find('button').first().simulate('click')

        expect(untapClient.pickCard).toHaveBeenCalledTimes(1)
        expect(untapClient.pickCard).toHaveBeenCalledWith("some-user", 123)
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