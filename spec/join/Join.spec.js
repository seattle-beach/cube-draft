import {shallow} from "enzyme";
import * as React from "react";
import {Join} from "../../src/join/Join"
import {Redirect} from 'react-router-dom'

describe('Join', () => {
    it('redirects to the draft page when join button is clicked', () => {
        const subject = shallow(<Join />)
        const button = subject.find('button')
        const redirect = () => subject.find(Redirect)

        expect(redirect().exists()).toBeFalsy()
        subject.find('input').simulate('change', {
            target: {
                value: "some-user"
            }
        })
        expect(redirect().exists()).toBeFalsy()
        button.simulate('click')
        expect(redirect().exists()).toBeTruthy()
        expect(redirect().prop('to')).toEqual({pathname: "/draft/some-user"})
    })
});