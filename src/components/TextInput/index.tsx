import React from 'react'
import clsx from 'clsx'

type InputProps = {
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      className={clsx(
        'w-full border-none bg-transparent p-0 text-gray-900 placeholder:text-gray-200 focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-gray-700',
        className
      )}
      {...rest}
    />
  )
}

export default Input
