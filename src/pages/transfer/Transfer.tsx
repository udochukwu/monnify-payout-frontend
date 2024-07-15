import React, { useState } from 'react'
import TransferForm from './TransferForm'
import AuthorizationForm from './AuthorizationForm'
import { CreateTransferResponse, TRANSFERS_URL } from 'utils/actions'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const TransferPage = () => {
  const queryClient = useQueryClient()
  const [transferResponse, setTransferResponse] =
    useState<CreateTransferResponse | null>(
      // null
      {
        requestSuccessful: true,
        responseMessage: 'success',
        responseCode: '0',
        responseBody: {
          amount: 2000,
          reference: 'VEND14224071514284144924935V927TR',
          status: 'PENDING_AUTHORIZATION',
          dateCreated: '2024-07-15T13:28:42.059+00:00',
          totalFee: 35.0,
          destinationBankName: 'United Bank For Africa Plc',
          destinationAccountNumber: '2063594735',
          destinationBankCode: '033'
        }
      }
    )

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
    <div className="px-3 font-urbanist pt-4">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-wide text-gray-700 sm:text-2xl mb-2">
          Quick Transfer
        </h1>
        <div className="flex gap-2  items-center">
          <Link to={'/'}>
            <p className="text-gray-400">Dashboard</p>
          </Link>
          <span className="">
            <i aria-label="icon: right" className="text-xs">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                className=""
                data-icon="right"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
              </svg>
            </i>
          </span>
          <p className="text-indigo-400">Quick Transfer</p>
        </div>
      </div>
      {!transferResponse ? (
        <div className="moverflow-x-auto p-6 shadow-sm rounded bg-white px-5 sm:px-10 lg:px-20 xl:px-40 py-20 border border-gray-200">
          <TransferForm onSuccess={handleTransferSuccess} />
        </div>
      ) : (
        <div className="overflow-x-auto p-6 shadow-sm rounded bg-white px-5 sm:px-10 lg:px-20 xl:px-40 py-20 border border-gray-200">
          <AuthorizationForm
            transferResponse={transferResponse}
            onSuccess={handleAuthorizationSuccess}
          />
        </div>
      )}
    </div>
  )
}

export default TransferPage
