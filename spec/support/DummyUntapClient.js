export class DummyUntapClient {
    getPack() {
        return [
            {
                name: "Card",
                image: "some-image.png"
            },
            {
                name: "Card Two",
                image: "some-other-image.png"
            },
        ]
    }
}
