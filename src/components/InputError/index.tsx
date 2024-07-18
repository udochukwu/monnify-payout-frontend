import React from 'react'
import clsx from 'clsx'

type InputErrorProps = {
  children: React.ReactNode
} & React.LabelHTMLAttributes<HTMLLabelElement>

const InputError = ({ children, className, ...rest }: InputErrorProps) => {
  return (
    <span className={clsx('text-xs text-red-400', className)} {...rest}>
      {children}
    </span>
  )
}

export default InputError
