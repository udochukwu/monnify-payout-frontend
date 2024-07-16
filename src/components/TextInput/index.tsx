import React from 'react'
import clsx from 'clsx'

type InputProps = {
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      className={clsx(
        'focus:outline-none w-full p-0 focus:ring-0 border-none text-gray-900 dark:text-white bg-transparent placeholder-gray-200 dark:placeholder-gray-700',
        className
      )}
      {...rest}
    />
  )
}

export default Input
