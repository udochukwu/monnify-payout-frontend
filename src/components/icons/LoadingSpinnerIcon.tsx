import React from 'react'

const LoadingSpinnerIcon = () => {
  return (
    <svg
      className="mr-3 size-5 animate-spin text-white dark:text-gray-800"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="spinner"
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
  )
}

export default LoadingSpinnerIcon
