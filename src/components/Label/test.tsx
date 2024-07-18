import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Label from './index'

describe('Label Component', () => {
  const renderLabel = (
    props: Partial<React.ComponentProps<typeof Label>> = {}
  ) => {
    render(<Label {...props}>Label text</Label>)
  }

  test('renders with default styles', () => {
    renderLabel()
    const label = screen.getByText('Label text')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass(
      'text-xs tracking-wider text-gray-700 dark:text-gray-300'
    )
  })

  test('applies additional class names', () => {
    renderLabel({ className: 'custom-class' })
    const label = screen.getByText('Label text')
    expect(label).toHaveClass(
      'text-xs tracking-wider text-gray-700 dark:text-gray-300 custom-class'
    )
  })

  test('passes additional props to the label element', () => {
    renderLabel({ id: 'label-text' })
    const label = screen.getByText('Label text')
    expect(label).toHaveAttribute('id', 'label-text')
  })
})
