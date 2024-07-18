import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import ThemeToggleButton from './index'
import { useTheme } from 'pages/layout/ThemeProvider'

vi.mock('pages/layout/ThemeProvider')

describe('ThemeToggleButton Component', () => {
  test('renders with MoonIcon when theme is light', () => {
    const mockToggleTheme = vi.fn()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme
    })
    render(<ThemeToggleButton />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  })

  test('renders with SunIcon when theme is dark', () => {
    const mockToggleTheme = vi.fn()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme
    })
    render(<ThemeToggleButton />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
  })

  test('calls toggleTheme when button is clicked', () => {
    const mockToggleTheme = vi.fn()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme
    })
    render(<ThemeToggleButton />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })
})
