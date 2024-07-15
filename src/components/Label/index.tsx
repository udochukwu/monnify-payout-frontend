import React from 'react'
import clsx from 'clsx'

type LabelProps = {
  children: React.ReactNode
} & React.LabelHTMLAttributes<HTMLLabelElement>

const Label = ({ children, className, ...rest }: LabelProps) => {
  return (
    <label
      className={clsx(
        'text-xs text-gray-600 font-light tracking-wide',
        className
      )}
      {...rest}
    >
      {children}
    </label>
  )
}

export default Label
