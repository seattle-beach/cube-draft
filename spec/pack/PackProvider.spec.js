import { PackProvider } from "../../src/pack/PackProvider";
import { Pack } from "../../src/pack/Pack";
import { DummyUntapClient } from "../support/DummyUntapClient";
import { shallow, mount } from "enzyme";
import React from "react";

describe('PackProvider', () => {
    it('shows loading indicator', () => {
        const subject = shallowRender();

        const loadingText = subject.find('p');
        expect(loadingText.text()).toEqual('Loading...');
    });
 
    it('shows an error when loading fails', async () => {
        const untapClient = new DummyUntapClient()
        untapClient.getPack = () => Promise.reject();

        const subject = await shallowRender({untapClient:untapClient})
        subject.update()

        expect(subject.find('p').text()).toEqual('Unable to load Pack')
    })

    it('renders a pack when data is returned', async () => {
        const untapClient = new DummyUntapClient()
        untapClient.getPack = () => Promise.resolve([])

        const subject = await shallowRender({untapClient:untapClient})
        subject.update()

        expect(subject.find(Pack).exists()).toBeTruthy();
    })
});

function shallowRender(params={}) {
    return shallow(
        <PackProvider
            username={params.username ? params.username : ""}
            untapClient={params.untapClient ? params.untapClient : new DummyUntapClient()}
        />
    );
}