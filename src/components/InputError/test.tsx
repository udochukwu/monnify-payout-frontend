import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import InputError from './index'

describe('InputError Component', () => {
  const renderInputError = (
    props: Partial<React.ComponentProps<typeof InputError>> = {}
  ) => {
    render(<InputError {...props}>Error message</InputError>)
  }

  test('renders with default styles', () => {
    renderInputError()
    const errorMessage = screen.getByText('Error message')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-xs text-red-400')
  })

  test('applies additional class names', () => {
    renderInputError({ className: 'custom-class' })
    const errorMessage = screen.getByText('Error message')
    expect(errorMessage).toHaveClass('text-xs text-red-400 custom-class')
  })

  test('passes additional props to the span element', () => {
    renderInputError({ id: 'error-message' })
    const errorMessage = screen.getByText('Error message')
    expect(errorMessage).toHaveAttribute('id', 'error-message')
  })
})
