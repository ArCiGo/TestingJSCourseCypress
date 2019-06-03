import {userBuilder} from '../support/generate'

describe('registration', () => {
  it('should register a new user', () => {
    const user = userBuilder()

    cy.visit('/')

    cy.getByText(/register/i).click()
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

  it(`should show an error message if there's an error`, () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/register',
      status: 500,
      response: {},
    })

    cy.visit('/register')

    cy.getByText(/submit/i).click()
    cy.getByText(/error.*try again/i)
  })
})
