import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Input from './index'

describe('Input Component', () => {
  const renderInput = (
    props: Partial<React.ComponentProps<typeof Input>> = {}
  ) => {
    render(<Input {...props} />)
  }

  test('renders with default styles', () => {
    renderInput({ placeholder: 'Enter text' })
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass(
      'w-full border-none bg-transparent p-0 text-gray-900 placeholder:text-gray-200 focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-gray-700'
    )
  })

  test('applies additional class names', () => {
    renderInput({ placeholder: 'Enter text', className: 'custom-class' })
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('custom-class')
  })

  test('passes additional props to the input element', () => {
    renderInput({ placeholder: 'Enter text', id: 'input-field', type: 'text' })
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveAttribute('id', 'input-field')
    expect(input).toHaveAttribute('type', 'text')
  })
})
