describe('Drafting cards', () => {
    beforeEach(() => {
        cy.registerDrafter("first-drafter")
        cy.registerDrafter("second-drafter")
    })

    it('lets 2 users draft', () => {
        // Draft can be started
        cy.visit(Cypress.env('BACKEND_URL'))
            .get('body').should('contain', "Users waiting to draft")
            .get('body').should('not.contain', "Users drafting")
            .get('[data-cy=draft-start-button]').click()
            .get('body').should('not.contain', "Users waiting to draft")
            .get('body').should('contain', "Users drafting")

        // Drafters see different cards
        var firstCards = []
        var secondCards = []

        cy.visit('/draft/first-drafter').get('[data-cy=card]').each(($img) => {
            firstCards.push($img.attr('src'))
        }).visit('/draft/second-drafter').get('[data-cy=card]').each(($img) => {
            secondCards.push($img.attr('src'))
        }).then(() => {
            expect(firstCards).to.not.deep.equal(secondCards)
        })

        // Drafter can choose a card
        let clickedCard

        cy.visit('/draft/first-drafter')
            .get('[data-cy=drafted-card]').should('have.length', 0)
            .get('[data-cy=card]').should('have.length', 15)
            .get('[data-cy=card]:first-child').then(($card) => {
                clickedCard = $card.attr('alt')
            }).click()
            .get('[data-cy=draft-selected-card]').click()
            .get('[data-cy=drafted-card]').should('have.length', 1)
            .then(($cards) => {
                expect($cards).to.contain(clickedCard)
            })
    })
})