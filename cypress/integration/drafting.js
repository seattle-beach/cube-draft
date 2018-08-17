describe('Drafting cards', () => {
    beforeEach(() => {
        cy.registerDrafter("first-drafter")
        cy.registerDrafter("second-drafter")
    });

    it('lets 2 users draft', () => {
        // Draft can be started
        cy.visit(Cypress.env('BACKEND_URL'))
            .get('body').should('contain', "Users waiting to draft")
            .get('body').should('not.contain', "Users drafting")
            .get('[data-cy=draft-start-button]').click()
            .get('body').should('not.contain', "Users waiting to draft")
            .get('body').should('contain', "Users drafting")

        // Drafters see different cards
        var firstCards = [];
        var secondCards = [];

        cy.visit('/draft/first-drafter').get('[data-cy=card]').each(($img) => {
            firstCards.push($img.attr('alt'))
        }).visit('/draft/second-drafter').get('[data-cy=card]').each(($img) => {
            secondCards.push($img.attr('alt'))
        }).then(() => {
            expect(firstCards).to.not.deep.equal(secondCards)
        });

        // Drafters can choose a card
        let firstClickedCard;
        let secondClickedCard;

        // first drafter picks a card
        cy.visit('/draft/first-drafter')
            .get('[data-cy=drafted-card]').should('have.length', 0)
            .get('[data-cy=card]').should('have.length', 15)
            .get('[data-cy=card]:first-child').then(($card) => {
                firstClickedCard = $card.attr('alt')
            }).click()
            .get('[data-cy=draft-selected-card]').click()
            .get('[data-cy=drafted-card]').should('have.length', 1)
            .then(($cards) => {
                const draftedCardNames = $cards.toArray().map(i => i.textContent);
                expect(draftedCardNames).to.contain(firstClickedCard);
            })

            // second drafter picks a card
            .visit('/draft/second-drafter')
            .get('[data-cy=card]:first-child').then(($card) => {
                secondClickedCard = $card.attr('alt')
            }).click()
            .get('[data-cy=draft-selected-card]').click()

            // second drafter sees remaining 14 cards from first drafter
            .get('[data-cy=card]').then(($cards) => {
                const cardsPassed = firstCards.filter(item => item !== firstClickedCard);
                const cardNames = $cards.toArray().map(i => i.alt);
                expect(cardNames).to.deep.equal(cardsPassed)
            })

            // first drafter sees remaining 14 cards from second drafter
            .visit('/draft/first-drafter')
            .get('[data-cy=card]').then(($cards) => {
                const cardsPassed = secondCards.filter(item => item !== secondClickedCard);
                const cardNames = $cards.toArray().map(i => i.alt);
                expect(cardNames).to.deep.equal(cardsPassed)
            })
    })
});