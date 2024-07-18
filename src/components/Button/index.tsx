import React from 'react'
import clsx from 'clsx'
import LoadingSpinnerIcon from 'components/icons/LoadingSpinnerIcon'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'solid' | 'outline' | 'text'
  color?: 'blue' | 'red' | 'green'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  appearance = 'solid',
  color = 'blue',
  size = 'md',
  className,
  children,
  disabled,
  loading,
  ...props
}) => {
  const baseStyles =
    'justify-center border shadow-sm text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center'

  const colorStyles = {
    blue: {
      solid:
        'bg-blue-600 text-white border-transparent hover:bg-blue-700 focus:ring-blue-500',
      outline:
        'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      text: 'bg-transparent text-blue-600 border-transparent hover:bg-blue-50 focus:ring-blue-500 inline-flex'
    },
    red: {
      solid:
        'bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500',
      outline:
        'bg-transparent text-red-600 border-red-600 hover:bg-red-50 focus:ring-red-500',
      text: 'bg-transparent text-red-600 border-transparent hover:bg-red-50 focus:ring-red-500 inline-flex'
    },
    green: {
      solid:
        'bg-green-600 text-white border-transparent hover:bg-green-700 focus:ring-green-500',
      outline:
        'bg-transparent text-green-600 border-green-600 hover:bg-green-50 focus:ring-green-500',
      text: 'bg-transparent text-green-600 border-transparent hover:bg-green-50 focus:ring-green-500 inline-flex'
    }
  }

  const sizeStyles = {
    sm: 'px-2 py-1 h-10 text-xs',
    md: 'px-4 py-2 h-14 text-sm',
    lg: 'px-6 py-3 h-16 text-lg'
  }

  const disabledStyles = 'cursor-not-allowed opacity-50'

  return (
    <button
      className={clsx(
        baseStyles,
        colorStyles[color][appearance],
        sizeStyles[size],
        className,
        {
          [disabledStyles]: disabled
        }
      )}
      disabled={disabled}
      {...props}
    >
      {loading && <LoadingSpinnerIcon />}
      {children}
    </button>
  )
}

export default Button
