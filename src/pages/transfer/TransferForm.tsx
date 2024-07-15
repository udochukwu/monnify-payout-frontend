import React from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import AmountField from './AmountField'
import DestinationAccountField from './DestinationAccountField'
import { useCreateTransfer, useValidateBank } from 'utils/actions'
import clsx from 'clsx'
import { generateTransactionRef } from 'utils'
import { Transfer } from 'utils/types'
import DestinationBankField from './DestinationBank'
import NarrationField from './NarationField'
import { toast } from 'react-toastify'

interface TransferFormProps {
  onSuccess: (result: any) => void
}

const TransferForm: React.FC<TransferFormProps> = ({ onSuccess }) => {
  const methods = useForm<Transfer>({
    mode: 'onBlur'
  })
  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = methods
  const mutation = useCreateTransfer()

  const destinationBankCode = watch('destinationBankCode')
  const destinationAccountNumber = watch('destinationAccountNumber')

  const { data: bankValidationData, isLoading: isValidationDataLoading } =
    useValidateBank({
      bankCode: destinationBankCode,
      accountNumber: destinationAccountNumber
    })

  const onSubmit: SubmitHandler<Transfer> = (data) => {
    mutation.mutate(
      {
        ...data,
        reference: generateTransactionRef(),
        currency: 'NGN',
        sourceAccountNumber: import.meta.env.VITE_MONNIFY_WALLET_ACCOUNT_NUMBER
      },
      {
        onSuccess: (result) => {
          console.log('Transfer created:', result)
          onSuccess(result)
        },
        onError: (error) => {
          toast?.error(error?.message)
        }
      }
    )
  }

  const isDisabled =
    !bankValidationData?.requestSuccessful ||
    isValidationDataLoading ||
    !isValid

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AmountField />
        <DestinationBankField />
        <DestinationAccountField
          accountName={bankValidationData?.responseBody?.accountName}
        />
        <NarrationField />
        <button
          type="submit"
          className={clsx(
            'justify-center px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white focus:outline-none focus:ring-2 focus:ring-offset-2 h-14 flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 sm:!mt-10 w-full sm:w-auto',
            {
              '': !isDisabled,
              'cursor-not-allowed opacity-50': isDisabled
            }
          )}
          disabled={isDisabled}
        >
          Make Transfer
        </button>
      </form>
    </FormProvider>
  )
}

export default TransferForm
