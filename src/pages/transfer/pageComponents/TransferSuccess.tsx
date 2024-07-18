import React from 'react'
import { CreateTransferResponse } from 'utils/actions'
import { Link } from 'react-router-dom'
import Button from 'components/Button'
import { formatAmount } from 'utils'
import SuccessIcon from 'components/icons/SuccessIcon'

const TransferSuccess = ({
  transferResponse
}: {
  transferResponse: CreateTransferResponse
}) => {
  return (
    <div className="text-center">
      <div className="flex justify-center">
        <SuccessIcon />
      </div>
      <h2 className="mb-2 text-3xl font-bold tracking-normal text-gray-700 dark:text-white sm:text-3xl">
        Success!
      </h2>

      <div className="text-sm text-gray-500 dark:text-gray-300">
        <p className="mb-2">
          You have successfully transfered{' '}
          <b>{formatAmount(transferResponse?.responseBody?.amount || 0)}</b>{' '}
          from <b>{import.meta.env.VITE_MONNIFY_WALLET_ACCOUNT_NUMBER}</b> to{' '}
          <b>
            ({transferResponse?.responseBody?.destinationBankName}) -{' '}
            {transferResponse?.responseBody?.destinationAccountNumber}
          </b>
        </p>
      </div>

      <div className="flex justify-center gap-2 sm:!mt-10">
        <Link to={'/'}>
          <Button appearance="solid" color="blue">
            Back to homepage
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default TransferSuccess
