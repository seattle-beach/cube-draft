import { UntapClient } from "../../src/untap/Client"
import ServerMock from "mock-http-server"
import axios from "axios"

describe('UntapClient', () => {
    const server = new ServerMock({ host: "localhost", port: 9000 });
    var subject

    beforeEach(function(done) {
        server.start(done);
        subject = new UntapClient("http://localhost:9000", axios);
    });
 
    afterEach(function(done) {
        server.stop(done);
    });

    it('calls service for packs', async () => {
        server.on({
            method: 'GET',
            path: '/pack',
            reply: {
                status:  200,
                headers: { "content-type": "application/json" },
                body:    JSON.stringify([
                    {
                        name: "some-card", 
                        image: "some-image",
                    }
                ])
            }
        })

        const actualCards = await subject.getPack();
        
        expect(actualCards).toEqual([
            {
                name: "some-card", 
                image: "some-image",
            }
        ])
    })
})