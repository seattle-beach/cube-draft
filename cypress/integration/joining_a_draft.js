describe('Joining a draft', function() {
    it('lets users join a draft', function() {
        cy.visit('/')
        cy.get('input').type('some-drafter')
        cy.contains('Join').click()
        cy.url().should('include', '/draft/some-drafter')
        cy.contains('Hello some-drafter')
        cy.contains('waiting for draft to start')

        cy.request(Cypress.env('backendUrl')).its('body')
            .should('include', 'Users waiting to draft')
            .should('include', 'some-drafter')
    })
  })