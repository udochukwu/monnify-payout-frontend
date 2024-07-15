import React from 'react'
import clsx from 'clsx'

type LabelProps = {
  children: React.ReactNode
} & React.LabelHTMLAttributes<HTMLLabelElement>

const Label = ({ children, className, ...rest }: LabelProps) => {
  return (
    <label
      className={clsx(
        'text-xs  tracking-wider text-gray-700 dark:text-gray-300',
        className
      )}
      {...rest}
    >
      {children}
    </label>
  )
}

export default Label
