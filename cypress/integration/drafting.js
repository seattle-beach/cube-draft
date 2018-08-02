describe('Drafting cards', () => {
    beforeEach(() => {
        cy.registerDrafter("first-drafter")
        cy.registerDrafter("second-drafter")
    })

    it('lets 2 users draft', () => {
        cy.visit(Cypress.env('BACKEND_URL'))
        cy.get('body').should('contain', "Users waiting to draft")
        cy.get('body').should('not.contain', "Users drafting")
        cy.get('[data-cy=draft-start-button]').click()
        cy.get('body').should('not.contain', "Users waiting to draft")
        cy.get('body').should('contain', "Users drafting")

        cy.visit('/draft/first-drafter')
        cy.get('[data-cy=card]').then(($firstDrafterCards) => {
            cy.visit('/draft/second-drafter')
            cy.get('[data-cy=card]').then(($secondDrafterCards) => {
                var firstCards = []
                $firstDrafterCards.each((i, el) => firstCards.push(el.src))
                var secondCards = []
                $secondDrafterCards.each((i, el) => secondCards.push(el.src))
                expect(firstCards).to.not.deep.equal(secondCards)
            })
        })
    })
})