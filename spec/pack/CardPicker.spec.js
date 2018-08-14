import {mount} from "enzyme"
import React from "react"
import {DummyCard} from "../support/DummyCard"
import { CardPicker } from "../../src/pack/CardPicker";
import { Pack } from "../../src/pack/Pack";
import {DummyUntapClient} from "../support/DummyUntapClient"

describe('CardPicker', () => {

    it('only drafts when a card is selected', async () => {
        const cards = [ DummyCard({name: "some-card"}, DummyCard()) ]
        const subject = mountRender({cards: cards})

        const button = () => subject.find('button')
        expect(button().prop('disabled')).toBeTruthy()

        subject.find('img').first().simulate('click')

        expect(button().prop('disabled')).toBeFalsy()
    })

    it('saves the drafted card', () => {
        const untapClient = new DummyUntapClient()
        untapClient.pickCard = jasmine.createSpy('pickCard')
            .and.returnValue(Promise.resolve())

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

    it('displays a loading screen while waiting for a card to be picked', () => {
        const cards = [ DummyCard({id: 123}) ]
        const subject = mountRender({cards: cards})

        expect(subject.text()).not.toContain('Loading...')
        expect(subject.find(Pack).exists()).toBeTruthy()

        subject.find('img').first().simulate('click')
        subject.find('button').first().simulate('click')

        expect(subject.text()).toContain('Loading...')
        expect(subject.find(Pack).exists()).toBeFalsy()
    });

    it('displays an error when picking a card errors', async () => {
        const untapClient = new DummyUntapClient()
        const reason = "Some reason"
        const pickCardPromise = Promise.reject(Error(reason))
        untapClient.pickCard = () => pickCardPromise

        const cards = [ DummyCard({id: 123}) ]

        const subject = mountRender({
            cards: cards,
            untapClient: untapClient,
        })

        expect(subject.text()).not.toContain(reason)
        expect(subject.find(Pack).exists()).toBeTruthy()

        subject.find('img').first().simulate('click')
        subject.find('button').first().simulate('click')

        await
        await
        subject.update()

        expect(subject.text()).not.toContain('Loading...')
        expect(subject.text()).toContain(reason)
        expect(subject.find(Pack).exists()).toBeFalsy()
    });
});

function mountRender(params={}) {
    return mount(
        <CardPicker
            cards={params.cards ? params.cards : []}
            untapClient={params.untapClient ? params.untapClient : new DummyUntapClient()}
            username={params.username ? params.username : ""}
        />
    );
}