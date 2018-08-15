import {shallow} from "enzyme"
import React from "react"
import {DummyCard} from "../support/DummyCard"
import {DummyUntapClient} from "../support/DummyUntapClient"
import {DraftedCards} from "../../src/pack/DraftedCards";

describe('DraftedCards', () => {

    it('displays a loading screen', () => {
        const subject = mountRender();

        expect(subject.text()).toContain('Loading picked cards...')
    });

    it('shows an error when loading fails', async () => {
        const untapClient = new DummyUntapClient();
        untapClient.pickedCards = () => Promise.reject();

        const subject = await mountRender({untapClient: untapClient});
        subject.update();

        expect(subject.text()).toContain('Unable to load picked cards');
    });

    it('shows a drafters picked cards', async () => {
        const untapClient = new DummyUntapClient();
        const pickedCardsPromise = Promise.resolve([
            DummyCard({name: "First Card"}),
            DummyCard({name: "Second Card"})
        ]);
        untapClient.pickedCards = () => pickedCardsPromise;

        const subject = mountRender({untapClient: untapClient});

        await pickedCardsPromise;
        subject.update();

        expect(subject.text()).toContain('First Card');
        expect(subject.text()).toContain('Second Card');
    });

    it('updates picked cards when trigger toggle prop changes', async () => {
        const untapClient = new DummyUntapClient();
        const pickedCardsSpy = jasmine.createSpy('pickedCards')
            .and.returnValue(Promise.resolve([]));
        untapClient.pickedCards = pickedCardsSpy;

        const subject = mountRender({
            untapClient: untapClient,
            triggerToggle: false
        });

        expect(pickedCardsSpy).toHaveBeenCalledTimes(1);
        subject.setProps({triggerToggle: true});
        expect(pickedCardsSpy).toHaveBeenCalledTimes(2);
    })
});

function mountRender(params = {}) {
    return shallow(
        <DraftedCards
            untapClient={params.untapClient ? params.untapClient : new DummyUntapClient()}
            username={params.username ? params.username : ""}
            triggerToggle={params.triggerToggle ? params.triggerToggle : false }
        />
    );
}