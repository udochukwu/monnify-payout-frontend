import React, { useState } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import AmountField from './AmountField'
import DestinationAccountField from './DestinationAccountField'
import {
  CreateTransferResponse,
  useCreateTransfer,
  useValidateBank
} from 'utils/actions'
import { generateTransactionRef } from 'utils'
import { Transfer } from 'utils/types'
import DestinationBankField from './DestinationBank'
import NarrationField from './NarationField'
import { toast } from 'react-toastify'
import Button from 'components/Button'
import Modal from 'components/Modal'

interface TransferFormProps {
  onSuccess: (result: CreateTransferResponse) => void
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
  const [showConfirmation, setShowConfirmation] = useState(false)
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
        <div className="flex justify-between gap-1">
          <Button type="button" appearance="outline" color="red">
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isDisabled}
            loading={mutation?.status === 'pending'}
            onClick={() => setShowConfirmation(true)}
          >
            Continue
          </Button>
        </div>
        <Modal isOpen={showConfirmation}>
          <p>This is the modal content.</p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowConfirmation(false)}
              className="mr-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Close
            </button>
            <button
              onClick={() => alert('Action!')}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Procced
            </button>
          </div>
        </Modal>
      </form>
    </FormProvider>
  )
}

export default TransferForm
