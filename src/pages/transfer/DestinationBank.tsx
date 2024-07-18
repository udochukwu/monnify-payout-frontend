import InputError from 'components/InputError'
import Label from 'components/Label'
import React, { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useBanks } from 'utils/actions'
import { Transfer } from 'utils/types'

const DestinationBankField: React.FC = () => {
  const {
    control,
    clearErrors,
    setValue,
    formState: { errors }
  } = useFormContext<Transfer>()
  const { data, isLoading, error } = useBanks()

  const destinationBankCode = useWatch({
    name: 'destinationBankCode'
  })

  useEffect(() => {
    const destinationBankName = data?.responseBody.find(
      (bank) => bank?.code === destinationBankCode
    )
    setValue('destinationBankName', destinationBankName?.name || '')
  }, [destinationBankCode, data?.responseBody, setValue])
  return (
    <div>
      <Controller
        name="destinationBankCode"
        control={control}
        rules={{ required: 'Destination bank code is required' }}
        render={({ field }) => (
          <div className="flex h-24 w-full flex-col justify-between rounded border border-gray-200 p-4 focus-within:border-blue-200 dark:border-gray-700">
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
                className="block w-full cursor-pointer appearance-none  rounded bg-transparent py-2  pr-8 text-sm leading-tight text-gray-700  focus:border-gray-500 focus:outline-none dark:text-white"
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
                  className="size-4 fill-current"
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
