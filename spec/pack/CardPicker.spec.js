import {mount} from "enzyme"
import React from "react"
import {DummyCard} from "../support/DummyCard"
import {CardPicker} from "../../src/pack/CardPicker";
import {DummyUntapClient} from "../support/DummyUntapClient"
import {Pack} from "../../src/pack/Pack";

describe('CardPicker', () => {

    it('only drafts when a card is selected', async () => {
        const untapClient = new DummyUntapClient();
        const getPackPromise = Promise.resolve([DummyCard()]);
        untapClient.getPack = () => getPackPromise;

        const subject = mountRender({untapClient: untapClient});
        await getPackPromise;
        subject.update();

        const button = () => subject.find('button');
        expect(button().prop('disabled')).toBeTruthy();

        subject.find('img').first().simulate('click');

        expect(button().prop('disabled')).toBeFalsy();
    });

    it('saves the drafted card', async () => {
        const untapClient = new DummyUntapClient();
        const getPackPromise = Promise.resolve([DummyCard({id: 123})]);
        untapClient.getPack = () => getPackPromise;
        untapClient.pickCard = jasmine.createSpy('pickCard')
            .and.returnValue(Promise.resolve());

        const subject = mountRender({
            untapClient: untapClient,
            username: "some-user"
        });
        await getPackPromise;
        subject.update();

        expect(untapClient.pickCard).toHaveBeenCalledTimes(0);

        subject.find('img').first().simulate('click');
        subject.find('button').first().simulate('click');

        expect(untapClient.pickCard).toHaveBeenCalledTimes(1);
        expect(untapClient.pickCard).toHaveBeenCalledWith("some-user", 123);
    });

    it('displays a loading screen while waiting for a card to be picked', async () => {
        const untapClient = new DummyUntapClient();
        const getPackPromise = Promise.resolve([DummyCard({id: 123})]);
        untapClient.getPack = () => getPackPromise;
        untapClient.pickCard = jasmine.createSpy('pickCard')
            .and.returnValue(Promise.resolve());

        const subject = mountRender({
            untapClient: untapClient,
            username: "some-user"
        });
        await getPackPromise;
        subject.update();

        expect(subject.text()).not.toContain('Loading...');
        expect(subject.find(Pack).exists()).toBeTruthy();

        subject.find('img').first().simulate('click');
        subject.find('button').first().simulate('click');

        expect(subject.text()).toContain('Loading...');
        expect(subject.find(Pack).exists()).toBeFalsy();
    });

    it('displays an error when picking a card errors', async () => {
        const untapClient = new DummyUntapClient();
        const getPackPromise = Promise.resolve([DummyCard({id: 123})]);
        const reason = "Some reason";
        untapClient.getPack = () => getPackPromise;
        untapClient.pickCard = () => Promise.reject(Error(reason));

        const subject = mountRender({
            untapClient: untapClient,
            username: "some-user"
        });
        await getPackPromise;
        subject.update();

        expect(subject.text()).not.toContain(reason);
        expect(subject.find(Pack).exists()).toBeTruthy();

        subject.find('img').first().simulate('click');
        subject.find('button').first().simulate('click');

        await
            subject.update();

        expect(subject.text()).not.toContain('Loading...');
        expect(subject.text()).toContain(reason);
        expect(subject.find(Pack).exists()).toBeFalsy();
    });

    it('calls passed in function when picking a card completes', async () => {
        const untapClient = new DummyUntapClient();
        const getPackPromise = Promise.resolve([DummyCard({id: 123})]);
        const pickCardPromise = Promise.resolve([]);
        untapClient.getPack = () => getPackPromise;
        untapClient.pickCard = () => pickCardPromise;

        const spyFunc = jasmine.createSpy('onPickCompletedCallback');

        const subject = mountRender({
            untapClient: untapClient,
            username: "some-user",
            onPickCompleted: spyFunc
        });
        await getPackPromise;
        subject.update();

        expect(spyFunc).not.toHaveBeenCalled();

        subject.find('img').first().simulate('click');
        subject.find('button').first().simulate('click');

        await pickCardPromise;

        expect(spyFunc).toHaveBeenCalled();
    });
});

function mountRender(params = {}) {
    return mount(
        <CardPicker
            untapClient={params.untapClient ? params.untapClient : new DummyUntapClient()}
            username={params.username ? params.username : ""}
            onPickCompleted={params.onPickCompleted ? params.onPickCompleted : () => {}}
        />
    );
}