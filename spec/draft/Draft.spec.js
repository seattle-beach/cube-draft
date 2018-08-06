import {shallow, mount} from "enzyme"
import React from "react"
import { Draft } from "../../src/draft/Draft"
import {DummyRouteProps} from "../support/DummyRouteProps"
import { DummyUntapClient } from "../support/DummyUntapClient";
import {DummyCard} from "../support/DummyCard"

describe('Draft', () => {
    it('shows the drafters username', () => {
        const props = DummyRouteProps({pathParams: {username: "a-drafter"}})

        const subject = shallow(<Draft untapClient={new DummyUntapClient()} {...props}/>)

        expect(subject.text()).toContain('Hello a-drafter')
    })

    it('adds selected card to drafted cards', async () => {
        const untapClient = new DummyUntapClient()
        untapClient.getPack = () => {
            return Promise.resolve([ DummyCard({name: "some-card"}) ])
        }

        const props = DummyRouteProps()

        const subject = await mount(<Draft untapClient={untapClient} {...props}/>)
        subject.update()

        expect(subject.find('[data-cy="drafted-card"]').length).toEqual(0)

        subject.find('img').first().simulate('click')
        subject.find('button').first().simulate('click')

        const draftCard = subject.find('[data-cy="drafted-card"]')
        expect(draftCard.length).toEqual(1)
        expect(draftCard.first().text()).toEqual("some-card")
    })

    it('only drafts when a card is selected', async () => {
        const untapClient = new DummyUntapClient()
        untapClient.getPack = () => {
            return Promise.resolve([ DummyCard({name: "some-card"}) ])
        }

        const props = DummyRouteProps()

        const subject = await mount(<Draft untapClient={untapClient} {...props}/>)
        subject.update()

        subject.find('button').first().simulate('click')
        subject.find('img').first().simulate('click')

        expect(subject.find('[data-cy="drafted-card"]').length).toEqual(0)
    })
});