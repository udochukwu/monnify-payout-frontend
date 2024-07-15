import React from 'react'
import clsx from 'clsx'

type InputErrorProps = {
  children: React.ReactNode
} & React.LabelHTMLAttributes<HTMLLabelElement>

const InputError = ({ children, className, ...rest }: InputErrorProps) => {
  return (
    <span className={clsx('text-red-400 text-xs', className)} {...rest}>
      {children}
    </span>
  )
}

export default InputError
