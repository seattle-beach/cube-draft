import {mount} from "enzyme"
import React from "react"
import {DummyCard} from "../support/DummyCard"
import {DraftPack} from "../../src/draft/DraftPack";
import {DummyUntapClient} from "../support/DummyUntapClient"

describe('DraftPack', () => {
    it('reloads drafted cards after picking a card successfully', async () => {
        const untapClient = new DummyUntapClient();
        const getPackPromise = Promise.resolve([DummyCard({id: 123, name: "A Card"})]);
        const pickCardPromise = Promise.resolve();
        const pickedCardsSpy = jasmine.createSpy('pickedCards')
            .and.returnValues(
                Promise.resolve([]),
                Promise.resolve([DummyCard({id: 123, name: "A Card"})])
            );

        untapClient.getPack = () => getPackPromise;
        untapClient.pickCard = () => pickCardPromise;
        untapClient.pickedCards = pickedCardsSpy;

        const subject = mountRender({untapClient: untapClient});
        await getPackPromise;
        subject.update();

        const draftedCards = () => subject.find('[data-cy="drafted-card"]');
        expect(draftedCards().length).toEqual(0);

        subject.find('img').first().simulate('click');
        subject.find('button').first().simulate('click');

        await pickCardPromise;
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