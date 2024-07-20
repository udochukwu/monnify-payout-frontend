/// <reference types="cypress" />

describe('Dashboard page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('base_url'))
  })

  it('Renders the dashboard page successfully with the correct data from api', () => {
    cy.intercept(
      'GET',
      'https://sandbox.monnify.com/api/v1/disbursements/wallet/balance?accountNumber=8214936171',
      {
        requestSuccessful: true,
        responseMessage: 'success',
        responseCode: '0',
        responseBody: {
          availableBalance: 1000000,
          ledgerBalance: 1000000
        }
      }
    ).as('getWalletBalance')
    cy.get('#dashboardPage').contains('Dashboard')
    cy.get('#dashboardPage').contains('₦1,000,000.00')
  })
})
