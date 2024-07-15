export enum GATEWAY_ENUM {
  MONNIFY = 'monnify',
  FLUTTERWAVE = 'flutterwave'
}

export enum TRANSFER_STATUS_ENUM {
  EXPIRED = 'EXPIRED',
  SUCCESS = 'SUCCESS',
  PENDING_AUTHORIZATION = 'PENDING_AUTHORIZATION'
}

export type Bank = {
  name: string
  code: string
  ussdTemplate: string
  baseUssdCode: string
  transferUssdTemplate: string
  bankId?: string | number | null
  nipBankCode: string
}

export type Transfer = {
  amount: number
  createdOn: string
  currency: string
  destinationAccountNumber: string
  destinationBankCode: string
  destinationBankName: string
  fee: number
  narration: string
  reference: string
  sourceAccountNumber: string
  status: TRANSFER_STATUS_ENUM
  transactionDescription: string
  transactionReference: string
  twoFaEnabled: boolean
}
