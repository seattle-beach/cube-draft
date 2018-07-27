describe('My First Test', function() {
    it('Looks at some things', function() {
        cy.visit('http://localhost:3000/')
        cy.get('input').type('some-drafter')
        cy.contains('Join').click()
        cy.url().should('include', '/draft/some-drafter')
    })
  })