// components/Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'solid' | 'outline' | 'text';
  color?: 'blue' | 'red';
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  appearance = 'solid',
  color = 'blue',
  className,
  children,
  disabled,
  loading,
  ...props
}) => {
  const baseStyles =
    'justify-center px-4 border shadow-sm text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 h-14 flex items-center w-full sm:w-60';

  const colorStyles = {
    blue: {
      solid:
        'bg-blue-600 text-white border-transparent hover:bg-blue-700 focus:ring-blue-500',
      outline:
        'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      text: 'bg-transparent text-blue-600 border-transparent hover:bg-blue-50 focus:ring-blue-500 inline-flex',
    },
    red: {
      solid:
        'bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500',
      outline:
        'bg-transparent text-red-600 border-red-600 hover:bg-red-50 focus:ring-red-500',
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
      {loading && (
        <svg
          className="animate-spin mr-3 h-5 w-5 text-white dark:text-gray-800" // Adjust spinner color for dark mode
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C6.48 0 2 4.48 2 10h2zm2 5.3a7.97 7.97 0 01-1.33-3.27l-2 .42c.32 1.44.96 2.73 1.82 3.83l1.51-1.03z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
