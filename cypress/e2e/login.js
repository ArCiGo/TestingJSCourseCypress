describe('login', () => {
  it('should login an existing user', () => {
    cy.createUser().then(user => {
      cy.visit('/')

      cy.getByText(/login/i).click()
      cy.getByLabelText(/username/i).type(user.username)
      cy.getByLabelText(/password/i).type(user.password)
      cy.getByText(/submit/i).click()

      cy.assertHome()
      cy.assertLoggedInAs(user)
    })
  })
})
