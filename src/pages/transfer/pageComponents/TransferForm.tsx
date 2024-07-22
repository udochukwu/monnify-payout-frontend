import React, { useState } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import AmountField from './AmountField'
import DestinationAccountField from './DestinationAccountField'
import {
  CreateTransferResponse,
  useCreateTransfer,
  useValidateBank
} from 'utils/actions'
import { formatAmount, generateTransactionRef } from 'utils'
import { Transfer } from 'utils/types'
import DestinationBankField from './DestinationBank'
import NarrationField from './NarationField'
import { toast } from 'react-toastify'
import Button from 'components/Button'
import ConfirmationModal from 'components/ConfirmationModal'
import { Link } from 'react-router-dom'

interface TransferFormProps {
  onSuccess: (result: CreateTransferResponse) => void
}

const TransferForm: React.FC<TransferFormProps> = ({ onSuccess }) => {
  // Initialize react-hook-form methods
  const methods = useForm<Transfer>({
    mode: 'onBlur'
  })
  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = methods

  // Hook for creating a transfer
  const mutation = useCreateTransfer()

  // State to control the visibility of the confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Watch form fields to get their current values
  const destinationBankCode = watch('destinationBankCode')
  const destinationAccountNumber = watch('destinationAccountNumber')
  const amount = watch('amount')
  const destinationBankName = watch('destinationBankName')

  // Hook for validating the bank details
  const { data: bankValidationData } = useValidateBank({
    bankCode: destinationBankCode,
    accountNumber: destinationAccountNumber
  })

  // Handler for form submission
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
          onSuccess(result)
        },
        onError: (error) => {
          toast?.error(error?.message)
        }
      }
    )
  }

  // Disable the Continue button if the form is not valid
  const isDisabled = !isValid

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Form fields for amount, destination bank, account, and narration */}
        <AmountField />
        <DestinationBankField />
        <DestinationAccountField
          accountName={bankValidationData?.responseBody?.accountName}
        />
        <NarrationField />

        {/* Buttons for cancel and continue */}
        <div className="flex justify-between gap-1">
          <Link to="/">
            <Button
              type="button"
              appearance="outline"
              color="red"
              className="w-32 sm:w-52"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="button"
            disabled={isDisabled}
            onClick={() => setShowConfirmation(true)}
            className="w-32 sm:w-52"
            id="continueTransfer"
          >
            Continue
          </Button>
        </div>

        {/* Confirmation modal for transfer details */}
        <ConfirmationModal
          isOpen={showConfirmation}
          onCancel={() => setShowConfirmation(false)}
          onProceed={handleSubmit(onSubmit)}
          loading={mutation?.status === 'pending'}
          id="confirmTransfer"
        >
          <p className="mb-5">
            You are about to transfer <b>{formatAmount(amount)}</b> from{' '}
            <b>{import.meta.env.VITE_MONNIFY_WALLET_ACCOUNT_NUMBER}</b> to{' '}
            <b>
              {bankValidationData?.responseBody?.accountName}{' '}
              {destinationBankName && `${destinationBankName}`} -{' '}
              {destinationAccountNumber}
            </b>
          </p>
        </ConfirmationModal>
      </form>
    </FormProvider>
  )
}

export default TransferForm
