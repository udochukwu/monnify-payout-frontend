/// <reference types="cypress" />

describe('Transfer page', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('base_url')}/transfer`)
    cy.intercept(
      'GET',
      'https://sandbox.monnify.com/api/v1/sdk/transactions/banks',
      {
        requestSuccessful: true,
        responseMessage: 'success',
        responseCode: '0',
        responseBody: [
          {
            name: 'United Bank For Africa Plc',
            code: '033',
            ussdTemplate: '*919*4*AccountNumber*Amount#',
            baseUssdCode: '*919#',
            transferUssdTemplate: '*919*AccountNumber#',
            bankId: null,
            nipBankCode: '000004'
          },
          {
            name: 'Zenith bank',
            code: '057',
            ussdTemplate: '*966*Amount*AccountNumber#',
            baseUssdCode: '*966#',
            transferUssdTemplate: '*966*AccountNumber#',
            bankId: null,
            nipBankCode: '000015'
          }
        ]
      }
    ).as('getBanks')
    cy.intercept(
      'GET',
      'https://sandbox.monnify.com/api/v1/disbursements/account/validate*',
      {
        requestSuccessful: true,
        responseMessage: 'success',
        responseCode: '0',
        responseBody: {
          accountNumber: '2254044924',
          accountName: 'NNAJI UGOCHUKWU',
          bankCode: '033'
        }
      }
    ).as('validateBankAccount')
    cy.intercept(
      'POST',
      'https://sandbox.monnify.com/api/v2/disbursements/single',
      {
        requestSuccessful: true,
        responseMessage: 'success',
        responseCode: '0',
        responseBody: {
          amount: 100,
          reference: 'VEND14224072015135946185811V937TR',
          status: 'PENDING_AUTHORIZATION',
          dateCreated: '2024-07-20T14:48:56.786+00:00',
          totalFee: 35.0,
          destinationBankName: 'Zenith Bank',
          destinationAccountNumber: '2063594735',
          destinationBankCode: '033'
        }
      }
    ).as('initiateTransfer')

    cy.intercept(
      'POST',
      'https://sandbox.monnify.com/api/v2/disbursements/single/validate-otp',
      {
        requestSuccessful: true,
        responseMessage: 'success',
        responseCode: 200,
        responseBody: {
          amount: 100,
          reference: 'VEND14224072015135946185811V937TR',
          status: '',
          dateCreated: '',
          totalFee: '',
          destinationBankName: '',
          destinationAccountNumber: '',
          destinationBankCode: '',
          comment: ''
        }
      }
    ).as('authorizeTransfer')
  })

  it('Renders the transfer page successfully', () => {
    cy.get('#transferPage').contains('Quick Transfer')
  })

  it('Transfer button should be disabled by default, and only enabled when all input fields have been filler properly.', () => {
    cy.get('#amount').type('100')
    cy.get('#continueTransfer').should('be.disabled')
    cy.get('#destinationBankCode').select('057')
    cy.get('#continueTransfer').should('be.disabled')
    cy.get('#destinationAccountNumber').type('2254044924')
    cy.get('#continueTransfer').should('be.disabled')
    cy.get('#narration').type('Sending to nelson nnaji')
    cy.get('#continueTransfer').should('be.enabled')
  })

  describe('Valid Form', () => {
    beforeEach(() => {
      cy.get('#amount').type('100')
      cy.get('#destinationBankCode').select('057')
      cy.get('#destinationAccountNumber').type('2254044924')
      cy.get('#narration').type('Sending to nelson nnaji')
    })

    it('When form is valid, submitting the form should trigger the confirmation modal', () => {
      cy.get('#continueTransfer').click()
      cy.get('#confirmTransfer').should('be.visible')
    })

    it('Clicking the cancel button should close the confirm modal', () => {
      cy.get('#continueTransfer').click()
      cy.get('#confirmTransfer').should('be.visible')
      cy.get('#cancelBtn').click()
      cy.get('#confirmTransfer').should('not.exist')
    })

    it('Clicking the proceed button should initiate the transfer and display the authorization screen', () => {
      cy.get('#continueTransfer').click()
      cy.get('#proceedBtn').click()
      cy.get('#authorizationForm').should('be.visible')
    })

    it('Should complete the otp and and submit the authorization form, then display the success screen.', () => {
      cy.get('#continueTransfer').click()
      cy.get('#proceedBtn').click()

      // Authorize button should be disabled
      cy.get('#authorizeBtn').should('be.disabled')

      // Assuming OTPInput is rendered with a length of 6 by default
      cy.get('input').should('have.length', 6)

      // Enter a value into each OTP input field
      cy.get('input').first().type('1').should('have.value', '1')
      cy.get('input').eq(1).type('2').should('have.value', '2')
      cy.get('input').eq(2).type('3').should('have.value', '3')
      cy.get('input').eq(3).type('4').should('have.value', '4')
      cy.get('input').eq(4).type('5').should('have.value', '5')
      cy.get('input').eq(5).type('6').should('have.value', '6')

      // Authorize button should be enabled
      cy.get('#authorizeBtn').should('be.enabled')

      // click the authorize button
      cy.get('#authorizeBtn').click()
      cy.get('#transferSuccess').should('be.visible')
    })
  })
})
