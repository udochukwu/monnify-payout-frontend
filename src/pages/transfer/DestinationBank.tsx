import InputError from 'components/InputError'
import Label from 'components/Label'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useBanks } from 'utils/actions'
import { Transfer } from 'utils/types'

const DestinationBankField: React.FC = () => {
  const {
    control,
    clearErrors,
    formState: { errors }
  } = useFormContext<Transfer>()
  const { data, isLoading, error } = useBanks()

  return (
    <div>
      <Controller
        name="destinationBankCode"
        control={control}
        rules={{ required: 'Destination bank code is required' }}
        render={({ field }) => (
          <div className="w-full rounded border border-gray-200  focus-within:border-indigo-100 p-4 h-24 flex flex-col justify-between">
            <Label htmlFor="destinationBankCode" className="mb-1">
              Destination Bank
            </Label>
            <div className="relative inline-block w-full">
              <select
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  clearErrors('destinationBankCode')
                }}
                id="destinationBankCode"
                className="block appearance-none w-full bg-white  text-gray-700 py-2  pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm cursor-pointer"
              >
                <option value="">Select a bank</option>
                {isLoading && <option>Loading...</option>}
                {error && <option>Error loading banks</option>}
                {!isLoading &&
                  !error &&
                  data?.responseBody.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12l-6-6h12z" />
                </svg>
              </div>
            </div>
            {errors.destinationBankCode && (
              <InputError>{errors.destinationBankCode.message}</InputError>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default DestinationBankField
