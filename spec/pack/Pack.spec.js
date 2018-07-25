import {shallow} from "enzyme"
import React from "react"
import {Pack} from "../../src/pack/Pack"
import { DummyCard } from "../support/DummyCard";

describe('Pack', () => {
    it('support empty card array', () => {
        const subject = shallow(<Pack cards={[]} />)

        expect(subject.find('img').length).toEqual(0);
    })

    it('displays card images', () => {
        const cards = [
            DummyCard({name: "Card", image: "some-image.png"}),
            DummyCard(),
        ]
        const subject = shallow(<Pack cards={cards} />)

        const images = subject.find('img');
        expect(images.length).toEqual(2);
        expect(images.first().prop('src')).toEqual('some-image.png');
        expect(images.first().prop('alt')).toEqual('Card');
    })
})