// components/Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'solid' | 'outline' | 'text';
  color?: 'blue' | 'red';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  appearance = 'solid',
  color = 'blue',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'justify-center px-4 border shadow-sm text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 h-14 flex items-center w-full sm:w-60';
  
  const colorStyles = {
    blue: {
      solid: 'bg-blue-600 text-white border-transparent hover:bg-blue-700 focus:ring-blue-500',
      outline: 'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      text: 'bg-transparent text-blue-600 border-transparent hover:bg-blue-50 focus:ring-blue-500 inline-flex',
    },
    red: {
      solid: 'bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500',
      outline: 'bg-transparent text-red-600 border-red-600 hover:bg-red-50 focus:ring-red-500',
      text: 'bg-transparent text-red-600 border-transparent hover:bg-red-50 focus:ring-red-500 inline-flex',
    },
  };

  const disabledStyles = 'cursor-not-allowed opacity-50';

  return (
    <button
      className={clsx(baseStyles, colorStyles[color][appearance], className, { [disabledStyles]: disabled })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
