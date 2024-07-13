import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from 'utils/api'
import { Bank, Transfer } from './types'

export const TRANSFERS_URL = 'api/v2/disbursements/single/transactions'
export const CREATE_TRANSFER_URL = 'api/v2/disbursements/single'
export const GET_BANKS_URL = 'api/v1/sdk/transactions/banks'
export const AUTHORIZE_TRANSFER_URL = 'api/v2/disbursements/single/validate-otp'
export const VALIDATE_BANK_URL = 'api/v1/disbursements/account/validate'

interface PaginationParams {
  pageNo?: number
  pageSize?: number
}

interface BankValidationParams {
  accountNumber: string
  bankCode: string
}

export const createTransferApi = async (
  transferData: Transfer
): Promise<{
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
}> => {
  try {
    const response = await api().post(CREATE_TRANSFER_URL, transferData)
    return response.data
  } catch (error) {
    throw error
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
    throw error
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
    throw error
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
    throw error
  }
}

export const validateBankApi = async (
  bankValidationParams: BankValidationParams
): Promise<{
  requestSuccessful: boolean
  responseMessage: string
  responseCode: string
  responseBody: {
    accountNumber: string
    accountName: string
    bankCode: string
  }
}> => {
  try {
    const response = await api().get(VALIDATE_BANK_URL, {
      params: bankValidationParams
    })
    return response.data
  } catch (error) {
    throw error
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
    queryKey: [
      TRANSFERS_URL,
      paginationParams?.pageNo,
      paginationParams?.pageSize
    ],
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

export const useValidateBank = (bankValidationParams: BankValidationParams) => {
  return useQuery({
    queryKey: [
      VALIDATE_BANK_URL,
      bankValidationParams?.accountNumber,
      bankValidationParams?.bankCode
    ],
    queryFn: () => validateBankApi(bankValidationParams)
  })
}
