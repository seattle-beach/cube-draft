import { withCards } from "../../src/pack/WithCards";
import { DummyUntapClient } from "../support/DummyUntapClient";
import { shallow, mount } from "enzyme";
import React from "react";
import { DummyCard } from "../support/DummyCard";

describe('WithCards', () => {
    
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

    it('passes the card data through to the passed in component', async () => {
        const untapClient = new DummyUntapClient()
        untapClient.getPack = () => Promise.resolve([
            DummyCard({name: "First Card"}),
            DummyCard({name: "Second Card"})
        ])

        const subject = await mountRender({
            untapClient: untapClient,
            component: (props) => {
                return <div>{props.cards.map((card) => card.name)}</div>
            }
        })
        subject.update()

        expect(subject.text()).toContain("First Card")
        expect(subject.text()).toContain("Second Card")

    })
});


function shallowRender(params={}) {    
    const WrapperComponent = withCards(React.Component)

    return shallow(
        <WrapperComponent
            username={params.username ? params.username : ""}
            untapClient={params.untapClient ? params.untapClient : new DummyUntapClient()}
        />
    );
}

function mountRender(params={}) {
    const WrapperComponent = withCards(params.component ? params.component : React.Component)

    return mount(
        <WrapperComponent
            username={params.username ? params.username : ""}
            untapClient={params.untapClient ? params.untapClient : new DummyUntapClient()}
        />
    );
}