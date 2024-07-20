/// <reference types="cypress" />

describe('Dashboard page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('base_url'))
  })

  it('Renders the dashboard page successfully', () => {
    cy.get('#dashboardPage').contains('Dashboard')
  })
})
