import {shallow} from "enzyme";
import * as React from "react";
import App from "../src/App";

describe('App', () => {
    it('renders', () => {
        const subject = shallow(<App />);
        expect(subject).toIncludeText("Welcome to React");
    })
});