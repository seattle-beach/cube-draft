import {shallow} from "enzyme";
import * as React from "react";
import {Join} from "../../src/join/Join"

describe('Join', () => {
    it('allows user to join a draft', () => {
        const subject = shallow(<Join />)

        const signupForm = subject.find('form')
        expect(signupForm.exists()).toBeTruthy()
        expect(signupForm.prop("action")).toEqual('/draft')
        expect(signupForm.prop("type")).toEqual('GET')

        expect(signupForm.find('label').text()).toEqual('Enter username:')
        expect(signupForm.find('input').exists()).toBeTruthy()
        expect(signupForm.find('button').text()).toEqual('Join')
    })
});