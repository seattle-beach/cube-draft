import {shallow} from "enzyme"
import React from "react"
import { Draft } from "../../src/draft/Draft"
import {DummyRouteProps} from "../support/DummyRouteProps"
import { DummyUntapClient } from "../support/DummyUntapClient";

describe('Draft', () => {
    it('shows the drafters username', () => {
        const props = DummyRouteProps({pathParams: {username: "a-drafter"}})

        const subject = shallow(<Draft untapClient={new DummyUntapClient()} {...props}/>)

        expect(subject.text()).toContain('Hello a-drafter')
    })
});