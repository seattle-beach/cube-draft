import {shallow} from "enzyme";
import * as React from "react";
import {Join} from "../../src/join/Join"
import {Redirect} from 'react-router-dom'
import {DummyUntapClient} from '../support/DummyUntapClient'

describe('Join', () => {
    it('redirects to the draft page when the user registers', async () => {
        const untapClient = new DummyUntapClient()
        untapClient.createDrafter = () => Promise.resolve()

        const subject = shallow(<Join untapClient={untapClient} />)
        const button = subject.find('button')
        const redirect = () => subject.find(Redirect)

        expect(redirect().exists()).toBeFalsy()
        subject.find('input').simulate('change', {
            target: {
                value: "some-user"
            }
        })
        expect(redirect().exists()).toBeFalsy()
        await button.simulate('click')
        subject.update()
        expect(redirect().exists()).toBeTruthy()
        expect(redirect().prop('to')).toEqual({pathname: "/draft/some-user"})
    })

    it('shows the user an error when registering fails', async () => {
        const untapClient = new DummyUntapClient()
        untapClient.createDrafter = () => Promise.reject()

        const subject = shallow(<Join untapClient={untapClient} />)

        await subject.find('button').simulate('click')
        subject.update()

        expect(subject.find(Redirect).exists()).toBeFalsy()
        expect(subject.text()).toContain('Draft registration failed')
    })
});