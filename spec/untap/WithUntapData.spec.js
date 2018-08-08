import { withUntapData } from "../../src/untap/WithUntapData";
import { mount } from "enzyme";
import React from "react";

describe('WithUntapData', () => {
    const testComponent = (props) => {
        return (
            <div>
                Loading: {props.loading}
                Error: {props.error}
                Data: {props.data}
            </div>
        )
    }

    it('passes loading indicator through to passed in component', async () => {
        const subject = await mountRender({
            component: testComponent
        })

        expect(subject.text()).toContain('Loading: true');
        expect(subject.text()).toContain('Error: ');
        expect(subject.text()).toContain('Data: ');
    });

    it('passes the error message through when data loading fails', async () => {
        const subject = await mountRender({
            component: testComponent,
            dataSource: (untapClient, props) => untapClient.pickCard(props.username),
            additionalProps: {username: "some-user"}
        })

        expect(subject.text()).toContain('Loading: false');
        expect(subject.text()).toContain('Error: failed to load');
        expect(subject.text()).toContain('Data: ');
    });
 
    // it('shows an error when loading fails', async () => {
    //     const untapClient = new DummyUntapClient()
    //     untapClient.getPack = () => Promise.reject();

    //     const subject = await shallowRender({untapClient:untapClient})
    //     subject.update()

    //     expect(subject.find('p').text()).toEqual('Unable to load Pack')
    // })

    // it('passes the card data through to the passed in component', async () => {
    //     const untapClient = new DummyUntapClient()
    //     untapClient.getPack = () => Promise.resolve([
    //         DummyCard({name: "First Card"}),
    //         DummyCard({name: "Second Card"})
    //     ])

    //     const subject = await mountRender({
    //         untapClient: untapClient,
    //         component: (props) => {
    //             return <div>{props.cards.map((card) => card.name)}</div>
    //         }
    //     })
    //     subject.update()

    //     expect(subject.text()).toContain("First Card")
    //     expect(subject.text()).toContain("Second Card")

    // })
});

function mountRender(params={}) {
    const WrapperComponent = withUntapData(
        params.component ? params.component : React.Component
    )

    return mount(
        <WrapperComponent {...params.additionalProps}/>
    );
}