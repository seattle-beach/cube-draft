import { UntapClient } from "../../src/untap/Client"
import nock from "nock"
import axios from "axios"

describe('UntapClient', () => {
    const server = nock('http://untap-api.com')
    var subject

    beforeEach(function() {
        subject = new UntapClient("http://untap-api.com", axios);
    });

    it('calls service for packs', async () => {
        server.get('/pack').reply(
            200, [{
                name: "some-card",
                image: "some-image",
            }]
        )

        const actualCards = await subject.getPack();
        
        expect(actualCards).toEqual([
            {
                name: "some-card", 
                image: "some-image",
            }
        ])
    })

    it('posts to register drafters', async () => {
        server.post('/drafter/create', { drafter: "Zach" }).reply(201)

        const created = await subject.createDrafter("Zach");

        expect(created).toBeTruthy()
    })

    it('returns false if drafter not created', async () => {
        server.post('/drafter/create').reply(500)

        const created = await subject.createDrafter();

        expect(created).toBeFalsy()
    })
})