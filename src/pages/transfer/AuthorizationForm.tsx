import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useAuthorizeTransfer } from 'utils/actions'

interface AuthorizationFormProps {
  transferReference: string | null
  onSuccess: (result: any) => void
}

interface AuthorizationData {
  authorizationCode: string
}

const AuthorizationForm: React.FC<AuthorizationFormProps> = ({ transferReference, onSuccess }) => {
  const { control, handleSubmit, clearErrors, formState: { errors } } = useForm<AuthorizationData>({
    mode: 'onBlur'
  })
  const authorizeMutation = useAuthorizeTransfer()

  const onAuthorizeSubmit: SubmitHandler<AuthorizationData> = (authorizationData) => {
    if (!transferReference) return

    authorizeMutation.mutate(
      {
        reference: transferReference,
        authorizationCode: authorizationData.authorizationCode
      },
      {
        onSuccess: (result) => {
          console.log('Transfer authorized:', result)
          onSuccess(result)
        },
        onError: (error) => {
          console.error('Error authorizing transfer:', error)
        }
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onAuthorizeSubmit)} className="space-y-4 mt-8">
      <div>
        <label htmlFor="authorizationCode" className="block text-sm font-medium text-gray-700">Authorization Code</label>
        <Controller
          name="authorizationCode"
          control={control}
          rules={{ required: 'Authorization code is required' }}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              onChange={(e) => {
                field.onChange(e)
                clearErrors('authorizationCode')
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          )}
        />
        {errors.authorizationCode && <span className="text-red-600">{errors.authorizationCode.message}</span>}
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Authorize
      </button>
    </form>
  )
}

export default AuthorizationForm
