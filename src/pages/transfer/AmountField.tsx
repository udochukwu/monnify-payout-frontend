import InputError from 'components/InputError'
import Label from 'components/Label'
import Input from 'components/TextInput'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Transfer } from 'utils/types'

const AmountField: React.FC = () => {
  const {
    control,
    clearErrors,
    formState: { errors }
  } = useFormContext<Transfer>()

  return (
    <div>
      <Controller
        name="amount"
        control={control}
        rules={{ required: 'Amount is required', min: 1 }}
        render={({ field }) => (
          <div className="flex h-24 w-full flex-col justify-between rounded border border-gray-200 p-4 focus-within:border-blue-200 dark:border-gray-700">
            <Label htmlFor="amount" className="mb-1">
              Enter amount
            </Label>
            <div className="mb-1 flex h-[35px] w-full items-center justify-between">
              <span className="mr-1 text-2xl font-bold text-gray-900 dark:text-white">
                ₦
              </span>
              <Input
                type="text"
                {...field}
                id="amount"
                placeholder="100"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 7) // Remove non-numeric characters
                  field.onChange(value)
                  clearErrors('amount')
                }}
                className="text-2xl font-bold"
              />
            </div>
            {errors.amount && <InputError>{errors.amount.message}</InputError>}
          </div>
        )}
      />
    </div>
  )
}

export default AmountField
