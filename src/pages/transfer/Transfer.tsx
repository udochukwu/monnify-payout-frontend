import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { generateTransactionRef } from 'utils'
import {
  useBanks,
  useCreateTransfer,
  useAuthorizeTransfer
} from 'utils/actions'
import { Transfer as TransferType } from 'utils/types'

type TransferProps = {}
const sourceAccountNumber = import.meta.env.VITE_MONNIFY_WALLET_ACCOUNT_NUMBER

type AuthorizationData = {
  authorizationCode: string
}

const Transfer = ({}: TransferProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TransferType>()

  const {
    control: authorizationControl,
    handleSubmit: handleAuthorizationSubmit,
    formState: { errors: authorizationErrors }
  } = useForm<AuthorizationData>()

  const [transferReference, setTransferReference] = useState<string | null>(
    null
  )

  const mutation = useCreateTransfer()
  const authorizeMutation = useAuthorizeTransfer()
  const { data, isLoading, error } = useBanks()

  const onSubmit: SubmitHandler<TransferType> = (data) => {
    mutation.mutate(
      {
        ...data,
        reference: generateTransactionRef(),
        currency: 'NGN',
        sourceAccountNumber
      },
      {
        onSuccess: (result) => {
          console.log('Transfer created:', result)
          if (result.responseBody.status === 'PENDING_AUTHORIZATION') {
            setTransferReference(result.responseBody.reference)
          }
        },
        onError: (error) => {
          console.error('Error creating transfer:', error)
        }
      }
    )
  }

  const onAuthorizeSubmit: SubmitHandler<AuthorizationData> = (
    authorizationData
  ) => {
    if (!transferReference) return

    authorizeMutation.mutate(
      {
        reference: transferReference,
        authorizationCode: authorizationData.authorizationCode
      },
      {
        onSuccess: (result) => {
          console.log('Transfer authorized:', result)
          setTransferReference(null)
        },
        onError: (error) => {
          console.error('Error authorizing transfer:', error)
        }
      }
    )
  }

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Transfer Page
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <Controller
            name="amount"
            control={control}
            rules={{ required: 'Amount is required', min: 1 }}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.amount && (
            <span className="text-red-600">{errors.amount.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="destinationBankCode"
            className="block text-sm font-medium text-gray-700"
          >
            Destination Bank
          </label>
          <Controller
            name="destinationBankCode"
            control={control}
            rules={{ required: 'Destination bank code is required' }}
            render={({ field }) => (
              <select
                {...field}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a bank</option>
                {isLoading ? (
                  <option>Loading...</option>
                ) : error ? (
                  <option>Error loading banks</option>
                ) : (
                  data?.responseBody.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))
                )}
              </select>
            )}
          />
          {errors.destinationBankCode && (
            <span className="text-red-600">
              {errors.destinationBankCode.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="destinationAccountNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Destination Account Number
          </label>
          <Controller
            name="destinationAccountNumber"
            control={control}
            rules={{
              required: 'Destination account number is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Destination account number must be a 10-digit number'
              }
            }}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.destinationAccountNumber && (
            <span className="text-red-600">
              {errors.destinationAccountNumber.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="narration"
            className="block text-sm font-medium text-gray-700"
          >
            Narration
          </label>
          <Controller
            name="narration"
            control={control}
            rules={{ required: 'Narration is required' }}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.narration && (
            <span className="text-red-600">{errors.narration.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>

      {transferReference && (
        <form
          onSubmit={handleAuthorizationSubmit(onAuthorizeSubmit)}
          className="space-y-4 mt-8"
        >
          <div>
            <label
              htmlFor="authorizationCode"
              className="block text-sm font-medium text-gray-700"
            >
              Authorization Code
            </label>
            <Controller
              name="authorizationCode"
              control={authorizationControl}
              rules={{ required: 'Authorization code is required' }}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              )}
            />
            {authorizationErrors.authorizationCode && (
              <span className="text-red-600">
                {authorizationErrors.authorizationCode.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Authorize
          </button>
        </form>
      )}
    </>
  )
}

export default Transfer
