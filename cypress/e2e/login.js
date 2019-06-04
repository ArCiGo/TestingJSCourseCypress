import {userBuilder} from '../support/generate'

describe('login', () => {
  it('should login an existing user', () => {
    const user = userBuilder()

    cy.request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })

    cy.visit('/')

    cy.getByText(/login/i).click()
    cy.getByLabelText(/username/i).type(user.username)
    cy.getByLabelText(/password/i).type(user.password)
    cy.getByText(/submit/i).click()

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.window()
      .its('localStorage.token')
      .should('be.a', 'string')

    cy.getByTestId('username-display', {timeout: 500}).should(
      'have.text',
      user.username,
    )
  })
})
