import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Modal from './index'

describe('Modal Component', () => {
  const renderModal = (
    props: Partial<React.ComponentProps<typeof Modal>> = {}
  ) => {
    render(
      <Modal isOpen={props.isOpen ?? true} className={props.className}>
        <div>Modal content</div>
      </Modal>
    )
  }

  test('renders when isOpen is true', () => {
    renderModal({ isOpen: true })
    const modalContent = screen.getByText('Modal content')
    expect(modalContent).toBeInTheDocument()
  })

  test('does not render when isOpen is false', () => {
    renderModal({ isOpen: false })
    const modalContent = screen.queryByText('Modal content')
    expect(modalContent).not.toBeInTheDocument()
  })
})
