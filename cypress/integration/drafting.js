describe('Drafting cards', () => {
    beforeEach(() => {
        cy.registerDrafter("first-drafter")
        cy.registerDrafter("second-drafter")
    })

    it('lets 2 users draft', () => {
        cy.visit(Cypress.env('BACKEND_URL'))
            .get('body').should('contain', "Users waiting to draft")
            .get('body').should('not.contain', "Users drafting")
            .get('[data-cy=draft-start-button]').click()
            .get('body').should('not.contain', "Users waiting to draft")
            .get('body').should('contain', "Users drafting")

        var firstCards = []
        var secondCards = []

        cy.visit('/draft/first-drafter').get('[data-cy=card]').each(($img) => {
            firstCards.push($img.attr('src'))
        }).visit('/draft/second-drafter').get('[data-cy=card]').each(($img) => {
            secondCards.push($img.attr('src'))
        }).then(() => {
            expect(firstCards).to.not.deep.equal(secondCards)
        })
    })
})