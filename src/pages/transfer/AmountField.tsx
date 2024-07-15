import Label from 'components/Label'
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
          <div className="w-full rounded border border-gray-200  focus-within:border-blue-100 p-4 h-24 flex flex-col justify-between">
            <Label
              htmlFor="amount"
              className='mb-1'
            >
              Enter amount
            </Label>
            <div className="w-full h-[35px] flex justify-between items-center mb-1">
              <span className="text-2xl text-gray-900 font-bold mr-1">₦</span>
              <input
                type="text"
                {...field}
                id="amount"
                placeholder='100'
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '') // Remove non-numeric characters
                  field.onChange(value)
                  clearErrors('amount')
                }}
                className="focus:outline-none w-full  p-0 focus:ring-0 border-none text-2xl font-bold  text-gray-900 bg-transparent placeholder-gray-200 focus:placeholder-gray-200"
              />
            </div>
            {errors.amount && (
              <span className="text-red-400 text-xs">
                {errors.amount.message}
              </span>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default AmountField
