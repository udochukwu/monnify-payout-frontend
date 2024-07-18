import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import Button, { ButtonProps } from './index'

// Helper function to render the button with props
const renderButton = (props: Partial<ButtonProps>) => {
  render(<Button {...props}>Click me</Button>)
}

describe('Button Component', () => {
  test('renders with default props', () => {
    renderButton({})
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600 text-white')
    expect(button).toHaveClass('px-4 py-2 h-14')
  })

  test('renders with different appearances', () => {
    renderButton({ appearance: 'outline' })
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('bg-transparent text-blue-600 border-blue-600')
  })

  test('renders with different colors', () => {
    renderButton({ color: 'red' })
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('bg-red-600 text-white')
  })

  test('renders with different sizes', () => {
    renderButton({ size: 'lg' })
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('px-6 py-3 h-16 text-lg')
  })

  test('renders with loading spinner', () => {
    renderButton({ loading: true })
    const spinner = screen.getByRole('spinner')
    expect(spinner).toBeInTheDocument()
  })

  test('renders with disabled state', () => {
    renderButton({ disabled: true })
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('cursor-not-allowed opacity-50')
  })

  test('executes onClick handler when clicked', () => {
    const handleClick = vi.fn()
    renderButton({ onClick: handleClick })
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
