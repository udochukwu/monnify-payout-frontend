import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  CreateTransferResponse,
  useAuthorizeTransfer,
  useResendOtp,
  useValidateBank
} from 'utils/actions'
import OTPInput from './OtpInput'
import clsx from 'clsx'
import { formatAmount } from 'utils'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
interface AuthorizationFormProps {
  transferResponse: CreateTransferResponse
  onSuccess: (result: any) => void
}

interface AuthorizationData {
  authorizationCode: string
}

const AuthorizationForm: React.FC<AuthorizationFormProps> = ({
  transferResponse,
  onSuccess
}) => {
  const navigate = useNavigate()
  const authorizeMutation = useAuthorizeTransfer()
  const resendOtpMutation = useResendOtp()

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<AuthorizationData>({
    defaultValues: {
      authorizationCode: ''
    },
    mode: 'onBlur'
  })


  const { data: bankValidationData } = useValidateBank({
    bankCode: transferResponse?.responseBody?.destinationBankCode,
    accountNumber: transferResponse?.responseBody?.destinationAccountNumber
  })

  const onAuthorizeSubmit: SubmitHandler<AuthorizationData> = (
    authorizationData
  ) => {
    if (!transferResponse) return

    authorizeMutation.mutate(
      {
        reference: transferResponse?.responseBody?.reference,
        authorizationCode: authorizationData.authorizationCode
      },
      {
        onSuccess: (result) => {
          onSuccess(result)
          navigate('/')
        },
        onError: (error) => {
          console.error('Error authorizing transfer:', error)
          toast?.error(error?.message)
        }
      }
    )
  }

  const resendOtp = () => {
    resendOtpMutation.mutate(transferResponse?.responseBody?.reference, {
      onSuccess: (result) => {
        toast?.success(result?.responseBody?.message)
      },
      onError: (error) => {
        toast?.error(error?.message)
        navigate('/')
      }
    })
  }
  return (
    <form onSubmit={handleSubmit(onAuthorizeSubmit)} className="space-y-4 mt-8">
      <h2 className="text-4xl text-gray-900 sm:text-3xl font-bold tracking-normal">
        Authorize transfer
      </h2>

      <div className="text-gray-500 text-sm text-light">
        <p className="mb-2">
          You are about to transfer{' '}
          <b>{formatAmount(transferResponse?.responseBody?.amount)}</b> from{' '}
          <b>{import.meta.env.VITE_MONNIFY_WALLET_ACCOUNT_NUMBER}</b> to{' '}
          <b>
            {bankValidationData?.responseBody?.accountName} (
            {transferResponse?.responseBody?.destinationBankName}) -{' '}
            {transferResponse?.responseBody?.destinationAccountNumber}
          </b>
        </p>
        <p>A 6-digit Authorization code has been sent to your email</p>
      </div>
      <div>
        <label
          htmlFor="authorizationCode"
          className="block text-sm font-medium text-gray-700 mb-5"
        >
          Authorization Code
        </label>
        <Controller
          name="authorizationCode"
          control={control}
          rules={{ required: 'Authorization code is required' }}
          render={({ field, fieldState: { error } }) => (
            <>
              <OTPInput
                length={6}
                value={field.value}
                onChange={(otp) => {
                  field.onChange(otp)
                  clearErrors('authorizationCode')
                }}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div className="flex gap-2 sm:!mt-10">
        <button
          type="submit"
          className={clsx(
            'justify-center px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white focus:outline-none focus:ring-2 focus:ring-offset-2 h-14 flex items-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500  w-full sm:w-60'
          )}
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={clsx(
            'justify-center px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white focus:outline-none focus:ring-2 focus:ring-offset-2 h-14 flex items-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 w-full sm:w-60',
            {
              '': !isValid,
              'cursor-not-allowed opacity-50': !isValid
            }
          )}
          disabled={!isValid}
        >
          Authorize
        </button>
      </div>

      <p>
        Didn't recieve code?{' '}
        <button type='button' className="underline text-blue-600" onClick={resendOtp}>
          Request again
        </button>
      </p>
    </form>
  )
}

export default AuthorizationForm
