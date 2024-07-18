/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import Dashboard from './Dashboard'
import { useWalletBalance } from 'utils/actions'

vi.mock('utils/actions')

vi.mock('utils', () => ({
  formatAmount: (amount: number) => `$${amount.toLocaleString()}`
}))

vi.mock('pages/transfer/pageComponents/Transfers', () => ({
  default: () => (
    <div data-testid="transfers-component">Transfers Component</div>
  )
}))

vi.mock('components/icons/WalletIcon', () => ({
  default: () => <svg data-testid="wallet-balance-icon">WalletIcon</svg>
}))

describe('Dashboard Component', () => {
  test('renders the wallet balance section', () => {
    ;(useWalletBalance as any).mockReturnValue({
      data: { responseBody: { availableBalance: 0 } }
    })

    render(<Dashboard />)

    expect(screen.getByText('Available Balance')).toBeInTheDocument()
    expect(screen.getByTestId('wallet-balance-icon')).toBeInTheDocument()
  })

  test('renders the Transfers component', () => {
    render(<Dashboard />)
    expect(screen.getByTestId('transfers-component')).toBeInTheDocument()
  })

  test('renders balance as $0 when no balance is available', () => {
    ;(useWalletBalance as any).mockReturnValue({
      data: { responseBody: { availableBalance: 0 } }
    })

    render(<Dashboard />)

    expect(screen.getByText('$0')).toBeInTheDocument()
  })

  test('renders balance as $0 when data is undefined', () => {
    ;(useWalletBalance as any).mockReturnValue({ data: undefined })

    render(<Dashboard />)

    expect(screen.getByText('$0')).toBeInTheDocument()
  })
})
