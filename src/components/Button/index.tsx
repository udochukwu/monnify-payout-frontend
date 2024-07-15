// components/Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'solid' | 'outline' | 'text';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ appearance = 'solid', className, children, disabled, ...props }) => {
  const baseStyles = 'justify-center px-4 border shadow-sm text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 h-14 flex items-center w-full sm:w-60';
  const appearanceStyles = {
    solid: 'bg-indigo-600 text-white border-transparent hover:bg-indigo-700 focus:ring-indigo-500',
    outline: 'bg-transparent text-indigo-600 border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
    text: 'bg-transparent text-indigo-600 border-transparent hover:bg-indigo-50 focus:ring-indigo-500 inline-flex',
  };
  const disabledStyles = 'cursor-not-allowed opacity-50';
  
  return (
    <button
      className={clsx(baseStyles, appearanceStyles[appearance], className, { [disabledStyles]: disabled })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
