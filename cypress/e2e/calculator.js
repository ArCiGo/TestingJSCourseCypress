describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')

    cy.getByText(/^1$/).click()
    cy.getByText(/^\+$/).click()
    cy.getByText(/^2$/).click()
    cy.getByText(/^=$/).click()

    cy.getByTestId('total').should('have.text', '3')
  })
})
