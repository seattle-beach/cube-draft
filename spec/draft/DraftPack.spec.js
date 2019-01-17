import {mount} from "enzyme"
import React from "react"
import {DummyCard} from "../support/DummyCard"
import {DraftPack} from "../../src/draft/DraftPack";
import {DummyUntapClient} from "../support/DummyUntapClient"

describe('DraftPack', () => {
    it('reloads drafted cards after picking a card successfully', async () => {
        const untapClient = new DummyUntapClient();

        const getPackPromise = Promise.resolve([DummyCard({id: 123, name: "A Card"})]);
        untapClient.getPack = () => getPackPromise;

        const pickCardPromise = Promise.resolve();
        untapClient.pickCard = () => pickCardPromise;

        const pickedCardsFirstPromise = Promise.resolve([]);
        const pickedCardsSecondPromise = Promise.resolve([DummyCard({id: 123, name: "A Card"})]);
        const pickedCardsSpy = jasmine.createSpy('pickedCards')
            .and.returnValues(
                pickedCardsFirstPromise,
                pickedCardsSecondPromise
            );
        untapClient.pickedCards = pickedCardsSpy;


        const subject = mountRender({untapClient: untapClient});


        await getPackPromise;
        await pickedCardsFirstPromise;
        subject.update();

        const draftedCards = () => subject.find('[data-cy="drafted-card"]');
        expect(draftedCards().length).toEqual(0);

        subject.find('img').first().simulate('click');
        subject.find('button').first().simulate('click');
        await pickCardPromise;
        await pickedCardsSecondPromise;
        subject.update();

        expect(draftedCards().length).toEqual(1);
    })
});

function mountRender(params = {}) {
    return mount(
        <DraftPack
            untapClient={params.untapClient ? params.untapClient : new DummyUntapClient()}
            username={params.username ? params.username : ""}
        />
    );
}