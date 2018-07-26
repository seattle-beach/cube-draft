import {mount} from "enzyme";
import * as React from "react";
import App from "../src/App";
import { DummyUntapClient } from "./support/DummyUntapClient"
import { DummyCard } from "./support/DummyCard";
import {MemoryRouter} from 'react-router'
import {PackProvider} from '../src/pack/PackProvider'

describe('App', () => {
    it('allows user to join a draft', () => {
        const subject = mountRender({
            route: "/"
        })

        const packProvider = () => subject.find(PackProvider)
        const usernameField = () => subject.find('input')
        const submitButton = () => subject.find('button')

        expect(subject.find('label').text()).toEqual('Enter username:')
        expect(usernameField().exists()).toBeTruthy()
        expect(submitButton().exists()).toBeTruthy()
        expect(submitButton().text()).toEqual('Join')
        expect(packProvider().exists()).toBeFalsy()

        usernameField().simulate('change', {target: {value: 'a-drafter'}})
        // submitButton().simulate('click', { button: 0 })
        subject.find('form').simulate('submit')
        subject.update()
        // console.log(subject.debug())

        expect(usernameField().exists()).toBeFalsy()
        expect(submitButton().exists()).toBeFalsy()
        expect(packProvider().exists()).toBeTruthy()
        expect(subject.find(".username").text()).toEqual('a-drafter')
    })

    it('renders cards when a user is drafting', async () => {
        const untapClient = new DummyUntapClient()
        untapClient.getPack = () => {
            return Promise.resolve([ DummyCard(), DummyCard() ])
        }

        const subject = await mountRender({
            route: "/draft",
            untapClient: untapClient
        })

        subject.update();
        const images = subject.find('img');
        expect(images.length).toEqual(2);
    })
});

function mountRender(params) {
    return mount(
        <MemoryRouter initialEntries={[params.route ? params.route : "/:"]}>
            <App untapClient={params.untapClient ? params.untapClient : new DummyUntapClient () } />
        </MemoryRouter>
    );
}