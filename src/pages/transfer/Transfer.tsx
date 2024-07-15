import React, { useState } from 'react'
import TransferForm from './TransferForm'
import AuthorizationForm from './AuthorizationForm'

const TransferPage = () => {
  const [transferReference, setTransferReference] = useState<string | null>(
    null
  )

  const handleTransferSuccess = (result: any) => {
    if (result.responseBody.status === 'PENDING_AUTHORIZATION') {
      setTransferReference(result.responseBody.reference)
    }
  }

  const handleAuthorizationSuccess = () => {
    setTransferReference(null)
  }

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Transfer Page {transferReference}
      </h1>
      <div className="mt-8 overflow-x-auto p-6 shadow-sm rounded bg-white px-5 sm:px-10 lg:px-20 xl:px-40 py-20 border border-gray-200">
        <TransferForm onSuccess={handleTransferSuccess} />
      </div>
      {transferReference && (
        <AuthorizationForm
          transferReference={transferReference}
          onSuccess={handleAuthorizationSuccess}
        />
      )}
    </>
  )
}

export default TransferPage
