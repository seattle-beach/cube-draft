import { UntapClient } from "../../src/untap/Client"
import nock from "nock"
import axios from "axios"

describe('UntapClient', () => {
    const server = nock('http://untap-api.com')
    var subject

    beforeEach(function() {
        subject = new UntapClient("http://untap-api.com", axios);
    });

    afterEach(() => nock.cleanAll())

    it('calls service for packs', async () => {
        const scope = server.get('/pack/Noah').reply(
            200, [{
                id: 123,
                name: "some-card",
                image: "some-image",
            }]
        )

        const actualCards = await subject.getPack("Noah");
        
        expect(actualCards).toEqual([
            {
                id: 123,
                name: "some-card", 
                image: "some-image",
            }
        ])
        expect(scope.isDone()).toBeTruthy()
    })

    it('posts to register drafters', async () => {
        const scope = server.post('/drafter/create', { drafter: "Zach" }).reply(201)

        const created = await subject.createDrafter("Zach");

        expect(created).toBeTruthy()
        expect(scope.isDone()).toBeTruthy()
    })

    describe("pickCard", () => {
        it('saves drafted cards', async () => {
            const scope = server.post('/drafter/LSV/pickCard', { cardId: 123 }).reply(201)

            const created = await subject.pickCard("LSV", 123);

            expect(created).toBeTruthy()
            expect(scope.isDone()).toBeTruthy()
        })
    })

    describe("pickedCards", () => {
        it('calls service for picked cards', async () => {
            const scope = server.get('/drafter/LSV/pickedCards').reply(
                200, 
                [{
                    id: 123,
                    name: "some-card",
                    image: "some-image.png",
                }]
            )

            const actualCards = await subject.pickedCards("LSV");

            expect(actualCards).toEqual([
                {
                    id: 123,
                    name: "some-card",
                    image: "some-image.png",
                }
            ])
            expect(scope.isDone()).toBeTruthy()
        })
    })
})