import React, { useState } from 'react'
import TransferForm from './TransferForm'
import AuthorizationForm from './AuthorizationForm'
import { CreateTransferResponse, TRANSFERS_URL } from 'utils/actions'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Modal from 'components/Modal'

const TransferPage = () => {
  const queryClient = useQueryClient()
  const [transferResponse, setTransferResponse] =
    useState<CreateTransferResponse | null>(null)

  const handleTransferSuccess = (response: CreateTransferResponse) => {
    if (response.responseBody.status === 'PENDING_AUTHORIZATION') {
      setTransferResponse(response)
    }
    queryClient.invalidateQueries({
      queryKey: [TRANSFERS_URL]
    })
  }

  const handleAuthorizationSuccess = () => {
    toast?.success('Transfer successful')
    setTransferResponse(null)
    queryClient.invalidateQueries({
      queryKey: [TRANSFERS_URL]
    })
  }

  return (
    <div className="px-3 font-urbanist pt-4  dark:text-white">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-wide text-gray-700 sm:text-2xl mb-2 dark:text-white">
          Quick Transfer
        </h1>
        <div className="flex gap-2 items-center text-gray-400 dark:text-gray-300">
          <Link to={'/'}>
            <p>Dashboard</p>
          </Link>
          <span>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              className="w-4 h-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
            </svg>
          </span>
          <p className="text-blue-400">Quick Transfer</p>
        </div>
      </div>
      {!transferResponse ? (
        <div className="overflow-x-auto p-6 rounded bg-white dark:bg-dark px-5 sm:px-10 lg:px-20 xl:px-40 py-20  shadow-lg">
          <TransferForm onSuccess={handleTransferSuccess} />
        </div>
      ) : (
        <div className="overflow-x-auto p-6 shadow-sm rounded bg-white dark:bg-[#1D1E24]  px-5 sm:px-10 lg:px-20 xl:px-40 py-20 border border-gray-200">
          <AuthorizationForm
            transferResponse={transferResponse}
            onSuccess={handleAuthorizationSuccess}
          />
        </div>
      )}
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Modal Title"
        footer={
          <div className="flex justify-end">
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mr-2"
            >
              Close
            </button>
            <button
              onClick={() => alert('Action!')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Action
            </button>
          </div>
        }
      >
        <p>This is the modal content.</p>
      </Modal>
    </div>
  )
}

export default TransferPage
