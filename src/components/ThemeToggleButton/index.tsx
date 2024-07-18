import { useTheme } from 'pages/layout/ThemeProvider'
import React from 'react'

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full bg-gray-200 p-2 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    >
      {theme === 'light' ? (
        <svg
          className="stroke-black"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3284 14.8687C13.249 14.8687 9.13135 10.751 9.13135 5.67163C9.13135 4.74246 9.26914 3.84548 9.5254 3C5.74897 4.14461 3 7.65276 3 11.803C3 16.8824 7.11765 21 12.197 21C16.3472 21 19.8554 18.251 21 14.4746C20.1545 14.7309 19.2575 14.8687 18.3284 14.8687Z"
            strokeWidth="1.5"
            strokeLinejoin="round"
          ></path>
        </svg>
      ) : (
        <svg
          className="stroke-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="5" strokeWidth="1.5"></circle>
          <path d="M12 2V4" strokeWidth="1.5" strokeLinecap="round"></path>
          <path d="M12 20V22" strokeWidth="1.5" strokeLinecap="round"></path>
          <path
            d="M20.6602 7L18.9281 8"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
          <path
            d="M5.07178 16L3.33973 17"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
          <path
            d="M3.33984 7L5.07189 8"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
          <path
            d="M18.9282 16L20.6603 17"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>
        </svg>
      )}
    </button>
  )
}

export default ThemeToggleButton
