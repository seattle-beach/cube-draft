import {shallow} from "enzyme";
import * as React from "react";
import {Join} from "../../src/join/Join"
import {Redirect} from 'react-router-dom'
import {DummyUntapClient} from '../support/DummyUntapClient'

describe('Join', () => {
    describe('input box', () => {
        let subject, button, redirect

        beforeEach(() => {
            const untapClient = new DummyUntapClient()
            untapClient.createDrafter = () => Promise.resolve()

            subject = shallow(<Join untapClient={untapClient} />)
            button = subject.find('button')
            redirect = () => subject.find(Redirect)

            expect(redirect().exists()).toBeFalsy()
            subject.find('input').simulate('change', {
                target: {
                    value: "some-user"
                }
            })
            expect(redirect().exists()).toBeFalsy()
        })

        it('redirects to the draft page when the user clicks join', async () => {
            await button.simulate('click')

            subject.update()
            expect(redirect().exists()).toBeTruthy()
            expect(redirect().prop('to')).toEqual({pathname: "/draft/some-user"})
        })

        it('redirects to the draft page when the user presses enter', async () => {
            await subject.find('input').simulate('keypress', {key: 'Enter'})

            subject.update()
            expect(redirect().exists()).toBeTruthy()
            expect(redirect().prop('to')).toEqual({pathname: "/draft/some-user"})
        })

        it('does not redirects to the draft page when the user presses other keys', async () => {
            await subject.find('input').simulate('keypress', {key: 'a'})

            subject.update()
            expect(redirect().exists()).toBeFalsy()
        })

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