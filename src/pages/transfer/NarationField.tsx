import InputError from 'components/InputError'
import Label from 'components/Label'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Transfer } from 'utils/types'

const NarrationField: React.FC = () => {
  const {
    control,
    clearErrors,
    formState: { errors }
  } = useFormContext<Transfer>()

  return (
    <div>
      <Controller
        name="narration"
        control={control}
        rules={{ required: 'Narration is required' }}
        render={({ field }) => (
          <div className="w-full rounded border border-gray-200 dark:border-gray-700  focus-within:border-blue-200 p-4 h-24 flex flex-col justify-between">
            <Label htmlFor="narration" className="mb-1">
              Narration
            </Label>
            <input
              type="text"
              {...field}
              id="narration"
              onChange={(e) => {
                field.onChange(e)
                clearErrors('narration')
              }}
              className="focus:outline-none w-full  p-0 focus:ring-0 border-none text-sm   text-gray-900  dark:text-white bg-transparent"
            />
            {errors.narration && (
              <InputError>{errors.narration.message}</InputError>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default NarrationField
