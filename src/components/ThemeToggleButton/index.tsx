import MoonIcon from 'components/icons/MoonIcon'
import SunIcon from 'components/icons/SunIcon'
import { useTheme } from 'pages/layout/ThemeProvider'
import React from 'react'

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full bg-gray-200 p-2 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}

export default ThemeToggleButton
