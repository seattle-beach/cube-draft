describe('Joining a draft', function() {
    it('lets users join a draft', function() {
        cy.visit('/')
        cy.get('input').type('some-drafter')
        cy.contains('Join').click()
        cy.url().should('include', '/draft/some-drafter')
        cy.contains('Hello some-drafter')
        cy.contains('waiting for draft to start')

        cy.request(Cypress.env('BACKEND_URL')).its('body')
            .should('include', 'Users waiting to draft')
            .should('include', 'some-drafter')
    })

    it('does not let a drafter join twice', function() {
        cy.visit('/')
        cy.get('input').type('some-drafter')
        cy.contains('Join').click()
        cy.contains('Hello some-drafter')
        cy.visit('/')
        cy.get('input').type('some-drafter')
        cy.contains('Join').click()

        cy.request(Cypress.env('BACKEND_URL')).its('body').should((body) => {
            expect(body.match(/some-drafter/g).length).to.eq(1)
        })
    })
})