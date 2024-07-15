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
import InputError from 'components/InputError'
import Button from 'components/Button'
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
      <h2 className="text-3xl text-gray-700 sm:text-3xl font-bold tracking-normal">
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
                <InputError className="mt-1">{error.message}</InputError>
              )}
            </>
          )}
        />
      </div>


      <div className="flex gap-2 sm:!mt-10">
        <Button appearance="outline" onClick={() => navigate('/')} color='red'>
          Cancel
        </Button>
        <Button appearance="solid" type="submit" disabled={!isValid}>
          Authorize
        </Button>
      </div>
      <p>
        Didn't recieve code?{' '}
        <button
          type="button"
          className="underline text-blue-600"
          onClick={resendOtp}
        >
          Request again
        </button>
      </p>
    </form>
  )
}

export default AuthorizationForm
