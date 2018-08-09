import {mount} from "enzyme"
import React from "react"
import {DummyCard} from "../support/DummyCard"
import { DraftPack } from "../../src/draft/DraftPack";
import { Pack } from "../../src/pack/Pack";
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
        untapClient.pickCard = () => Promise.reject(Error(reason))

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
        subject.update()

        expect(subject.text()).not.toContain('Loading...')
        expect(subject.text()).toContain(reason)
        expect(subject.find(Pack).exists()).toBeFalsy()
    });

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