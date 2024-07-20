import React, { useState } from 'react'
import TransferForm from './pageComponents/TransferForm'
import AuthorizationForm from './pageComponents/AuthorizationForm'
import { CreateTransferResponse, TRANSFERS_URL } from 'utils/actions'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import TransferSuccess from './pageComponents/TransferSuccess'

const TransferPage = () => {
  const queryClient = useQueryClient()
  const [transferResponse, setTransferResponse] =
    useState<CreateTransferResponse | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const handleTransferSuccess = (response: CreateTransferResponse) => {
    if (response.responseBody.status === 'PENDING_AUTHORIZATION') {
      setTransferResponse(response)
    }
    queryClient.invalidateQueries({
      queryKey: [TRANSFERS_URL]
    })
  }

  const handleAuthorizationSuccess = () => {
    setShowConfirmation(true)
    toast?.success('Transfer successful')
    queryClient.invalidateQueries({
      queryKey: [TRANSFERS_URL]
    })
  }

  return (
    <div className="px-3 pt-4 font-urbanist  dark:text-white" id="transferPage">
      <div className="mb-10 items-center justify-between sm:flex">
        <h1 className="mb-2 text-2xl font-bold tracking-wide text-gray-700 dark:text-white sm:text-2xl">
          Quick Transfer
        </h1>
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-300">
          <Link to={'/'}>
            <p>Dashboard</p>
          </Link>
          <span>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              className="size-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
            </svg>
          </span>
          <p className="text-blue-400">Quick Transfer</p>
        </div>
      </div>
      <div className="overflow-x-auto rounded bg-white p-6 px-5 py-20 shadow-lg dark:bg-dark sm:px-10  lg:px-20 xl:px-40">
        {showConfirmation && transferResponse ? (
          <TransferSuccess transferResponse={transferResponse} />
        ) : !transferResponse ? (
          <TransferForm onSuccess={handleTransferSuccess} />
        ) : (
          <AuthorizationForm
            transferResponse={transferResponse}
            onSuccess={handleAuthorizationSuccess}
          />
        )}
      </div>
    </div>
  )
}

export default TransferPage
