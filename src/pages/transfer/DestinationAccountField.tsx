import InputError from 'components/InputError'
import Label from 'components/Label'
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
          <div className="w-full rounded border border-gray-200  focus-within:border-blue-100 p-4 h-24 flex flex-col justify-between">
            <Label htmlFor="destinationAccountNumber" className="mb-1">
              Destination Account Number
            </Label>
            <input
              type="text"
              id="destinationAccountNumber"
              placeholder="2254044924"
              {...field}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10) // Remove non-numeric characters and limit to 10 digits
                field.onChange(value)
                clearErrors('destinationAccountNumber')
              }}
              className="focus:outline-none w-full p-0 focus:ring-0 border-none text-lg text-gray-900 bg-transparent placeholder-gray-200 focus:placeholder-gray-200"
            />

            {!!accountName && (
              <span className="text-blue-400 text-[10px] mt-2 font-bold tracking-widest">
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
