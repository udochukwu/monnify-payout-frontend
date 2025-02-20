import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  CreateTransferResponse,
  useAuthorizeTransfer,
  useResendOtp,
  useValidateBank
} from 'utils/actions'
import OTPInput from './OtpInput'
import { formatAmount } from 'utils'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import InputError from 'components/InputError'
import Button from 'components/Button'

interface AuthorizationFormProps {
  transferResponse: CreateTransferResponse
  onSuccess: (result: unknown) => void
}

interface AuthorizationData {
  authorizationCode: string
}

const AuthorizationForm: React.FC<AuthorizationFormProps> = ({
  transferResponse,
  onSuccess
}) => {
  const navigate = useNavigate()

  // Hooks for authorizing transfer and resending OTP
  const authorizeMutation = useAuthorizeTransfer()
  const resendOtpMutation = useResendOtp()

  // Initialize react-hook-form methods
  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { isValid }
  } = useForm<AuthorizationData>({
    defaultValues: {
      authorizationCode: ''
    },
    mode: 'onBlur'
  })

  // Hook for validating the bank details
  const { data: bankValidationData } = useValidateBank({
    bankCode: transferResponse?.responseBody?.destinationBankCode,
    accountNumber: transferResponse?.responseBody?.destinationAccountNumber
  })

  // Handler for form submission
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
        },
        onError: (error) => {
          toast?.error(error?.message)
          setValue('authorizationCode', '')
        }
      }
    )
  }

  // Handler for resending OTP
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
    <form
      onSubmit={handleSubmit(onAuthorizeSubmit)}
      className="mt-8 space-y-4"
      id="authorizationForm"
    >
      <h2 className="text-3xl font-bold tracking-normal text-gray-700 dark:text-white sm:text-3xl">
        Authorize transfer
      </h2>

      <div className="text-sm text-gray-500 dark:text-gray-300">
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
          className="mb-5 block text-sm font-medium text-gray-700 dark:text-white"
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
        {/* Cancel button */}
        <Button
          appearance="outline"
          type="reset"
          onClick={() => navigate('/')}
          color="red"
          className="w-40"
          disabled={authorizeMutation?.status === 'pending'}
          id="cancelAuthorizationBtn"
        >
          Cancel
        </Button>

        {/* Authorize button */}
        <Button
          appearance="solid"
          type="submit"
          disabled={!isValid}
          className="w-40"
          loading={authorizeMutation?.status === 'pending'}
          id="authorizeBtn"
        >
          Authorize
        </Button>
      </div>
      <p>
        {"Didn't"} receive code?{' '}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={resendOtp}
        >
          Request again
        </button>
      </p>
    </form>
  )
}

export default AuthorizationForm
