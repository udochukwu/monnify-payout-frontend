import InputError from 'components/InputError'
import Label from 'components/Label'
import Input from 'components/TextInput'
import { Controller, useFormContext } from 'react-hook-form'
import { Transfer } from 'utils/types'

interface DestinationAccountFieldProps {
  accountName?: string
}

const DestinationAccountField = ({
  accountName
}: DestinationAccountFieldProps) => {
  const {
    control,
    clearErrors,
    formState: { errors }
  } = useFormContext<Transfer>()

  return (
    <div>
      <Controller
        name="destinationAccountNumber"
        control={control}
        rules={{
          required: 'Destination account number is required',
          pattern: {
            value: /^\d{10}$/,
            message: 'Destination account number must be a 10-digit number'
          }
        }}
        render={({ field }) => (
          <div className="flex h-24 w-full flex-col justify-between  rounded border border-gray-200 p-4 focus-within:border-blue-200 dark:border-gray-700">
            <Label htmlFor="destinationAccountNumber" className="mb-1">
              Destination Account Number
            </Label>
            <Input
              type="text"
              id="destinationAccountNumber"
              placeholder="2254044924"
              {...field}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10) // Remove non-numeric characters and limit to 10 digits
                field.onChange(value)
                clearErrors('destinationAccountNumber')
              }}
              className="text-lg"
            />

            {!!accountName && (
              <span className="mt-2 text-[10px] font-bold tracking-widest text-blue-400">
                {accountName}{' '}
              </span>
            )}

            {errors.destinationAccountNumber && (
              <InputError>{errors.destinationAccountNumber.message}</InputError>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default DestinationAccountField
