import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from 'utils/api'
import { Bank, Transfer } from './types'
import { apiErrorHandler } from 'utils'

export const TRANSFERS_URL = 'api/v2/disbursements/single/transactions'
export const CREATE_TRANSFER_URL = 'api/v2/disbursements/single'
export const GET_BANKS_URL = 'api/v1/sdk/transactions/banks'
export const AUTHORIZE_TRANSFER_URL = 'api/v2/disbursements/single/validate-otp'
export const VALIDATE_BANK_URL = 'api/v1/disbursements/account/validate'
export const WALLET_BALANCE_URL = 'api/v1/disbursements/wallet/balance'
export const RESEND_OTP_URL = 'api/v2/disbursements/single/resend-otp'

interface PaginationParams {
  pageNo?: number
  pageSize?: number
}

interface BankValidationParams {
  accountNumber: string
  bankCode: string
}

export interface BankValidationResponse {
  requestSuccessful: boolean
  responseMessage: string
  responseCode: string
  responseBody: {
    accountNumber: string
    accountName: string
    bankCode: string
  }
}

export interface CreateTransferResponse {
  requestSuccessful: boolean
  responseMessage: string
  responseCode: string
  responseBody: {
    amount: number
    reference: string
    status: string
    dateCreated: string
    totalFee: number
    destinationBankName: string
    destinationAccountNumber: string
    destinationBankCode: string
  }
}

export const createTransferApi = async (
  transferData: Transfer
): Promise<CreateTransferResponse> => {
  try {
    const response = await api().post(CREATE_TRANSFER_URL, transferData)
    return response.data
  } catch (error) {
    return apiErrorHandler(error)
  }
}

export const getTransfersApi = async ({
  pageNo,
  pageSize
}: PaginationParams): Promise<{
  requestSuccessful: boolean
  responseMessage: string
  responseCode: string
  responseBody: {
    content: Transfer[]
  }
}> => {
  try {
    const response = await api().get(TRANSFERS_URL, {
      params: {
        pageNo,
        pageSize
      }
    })
    return response.data
  } catch (error) {
    return apiErrorHandler(error)
  }
}

export const getBanksApi = async (): Promise<{
  requestSuccessful: boolean
  responseMessage: string
  responseCode: string
  responseBody: Bank[]
}> => {
  try {
    const response = await api().get(GET_BANKS_URL)
    return response.data
  } catch (error) {
    return apiErrorHandler(error)
  }
}

export const authorizeTransferApi = async (authorizationData: {
  reference: string
  authorizationCode: string
}): Promise<{
  requestSuccessful: boolean
  responseMessage: string
  responseCode: string
  responseBody: {
    amount: number
    reference: string
    status: string
    dateCreated: string
    totalFee: number
    destinationBankName: string
    destinationAccountNumber: string
    destinationBankCode: string
    comment: string
  }
}> => {
  try {
    const response = await api().post(AUTHORIZE_TRANSFER_URL, authorizationData)
    return response.data
  } catch (error) {
    return apiErrorHandler(error)
  }
}

export const validateBankApi = async (
  bankValidationParams: BankValidationParams
): Promise<BankValidationResponse> => {
  try {
    const response = await api().get(VALIDATE_BANK_URL, {
      params: bankValidationParams
    })
    return response.data
  } catch (error) {
    return apiErrorHandler(error)
  }
}

export const getWalletBalanceApi = async (
  accountNumber: string
): Promise<{
  requestSuccessful: boolean
  responseMessage: string
  responseCode: string
  responseBody: {
    availableBalance: number
    ledgerBalance: number
  }
}> => {
  try {
    const response = await api().get(WALLET_BALANCE_URL, {
      params: {
        accountNumber
      }
    })
    return response.data
  } catch (error) {
    return apiErrorHandler(error)
  }
}

export const resendOtpApi = async (
  reference: string
): Promise<{
  requestSuccessful: true
  responseMessage: string
  responseCode: string
  responseBody: {
    message: string
  }
}> => {
  try {
    const response = await api().post(RESEND_OTP_URL, {
      reference
    })
    return response.data
  } catch (error) {
    return apiErrorHandler(error)
  }
}

// Hooks
export const useCreateTransfer = () => {
  return useMutation({
    mutationFn: createTransferApi
  })
}

export const useTransfers = (paginationParams: PaginationParams) => {
  return useQuery({
    queryKey: [TRANSFERS_URL, paginationParams],
    queryFn: () => getTransfersApi(paginationParams)
  })
}

export const useBanks = () => {
  return useQuery({
    queryKey: [GET_BANKS_URL],
    queryFn: () => getBanksApi()
  })
}

export const useAuthorizeTransfer = () => {
  return useMutation({
    mutationFn: authorizeTransferApi
  })
}

export const useValidateBank = ({
  accountNumber,
  bankCode
}: BankValidationParams) => {
  return useQuery({
    queryKey: [VALIDATE_BANK_URL, accountNumber, bankCode],
    queryFn: () => validateBankApi({ accountNumber, bankCode }),
    enabled: !!accountNumber && !!bankCode && accountNumber?.length === 10
  })
}

export const useWalletBalance = (accountNumber: string) => {
  return useQuery({
    queryKey: [WALLET_BALANCE_URL, accountNumber],
    queryFn: () => getWalletBalanceApi(accountNumber),
    enabled: !!accountNumber
  })
}

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtpApi
  })
}
