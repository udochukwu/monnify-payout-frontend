import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import ConfirmationModal from './index'

describe('ConfirmationModal Component', () => {
  const defaultProps = {
    isOpen: true,
    onCancel: vi.fn(),
    onProceed: vi.fn(),
    loading: false,
    children: <div>Are you sure?</div>
  }

  const renderConfirmationModal = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props }
    render(<ConfirmationModal {...mergedProps} />)
  }

  test('renders correctly when open', () => {
    renderConfirmationModal()
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /proceed/i })).toBeInTheDocument()
  })

  test('does not render when closed', () => {
    renderConfirmationModal({ isOpen: false })
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument()
  })

  test('calls onCancel when Cancel button is clicked', () => {
    const handleCancel = vi.fn()
    renderConfirmationModal({ onCancel: handleCancel })
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)
    expect(handleCancel).toHaveBeenCalledTimes(1)
  })

  test('calls onProceed when Proceed button is clicked', () => {
    const handleProceed = vi.fn()
    renderConfirmationModal({ onProceed: handleProceed })
    const proceedButton = screen.getByRole('button', { name: /proceed/i })
    fireEvent.click(proceedButton)
    expect(handleProceed).toHaveBeenCalledTimes(1)
  })

  test('shows loading spinner on Proceed button when loading', () => {
    renderConfirmationModal({ loading: true })
    expect(screen.getByRole('spinner')).toBeInTheDocument()
  })
})
