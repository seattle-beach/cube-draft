import {mount} from "enzyme"
import React from "react"
import {DummyCard} from "../support/DummyCard"
import { DraftPack } from "../../src/draft/DraftPack";

describe('DraftPack', () => {
    it('adds selected card to drafted cards', () => {
        const cards = [ DummyCard({name: "some-card"}, DummyCard()) ]
        const subject = mount(<DraftPack cards={cards}/>)
        const draftCards = () => subject.find('[data-cy="drafted-card"]')

        expect(draftCards().length).toEqual(0)

        subject.find('img').first().simulate('click')
        subject.find('button').first().simulate('click')

        expect(draftCards().length).toEqual(1)
        expect(draftCards().first().text()).toEqual("some-card")
    })

    it('only drafts when a card is selected', async () => {
        const cards = [ DummyCard({name: "some-card"}, DummyCard()) ]
        const subject = mount(<DraftPack cards={cards}/>)

        subject.find('button').first().simulate('click')
        subject.find('img').first().simulate('click')

        expect(subject.find('[data-cy="drafted-card"]').length).toEqual(0)
    })
});