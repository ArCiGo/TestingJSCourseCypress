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

describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser().then(user => {
      cy.visit('/')

      cy.getByText(/login/i).click()
      cy.getByLabelText(/username/i).type(user.username)
      cy.getByLabelText(/password/i).type(user.password)
      cy.getByText(/submit/i).click()

      cy.assertLoggedInAs(user)
      cy.getByText(/logout/i).click()

      cy.queryByTestId('username-display', {timeout: 300}).should('not.exist')
    })
  })
})
