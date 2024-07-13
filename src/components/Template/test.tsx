import { render, screen } from '@testing-library/react'
import Template from '../Template'

describe('<Template />', () => {
  it('should render with default text when no text prop is provided', () => {
    render(<Template />)
    
    expect(
      screen.getByRole('heading', {
        name: /Default template text/i,
        level: 1
      })
    ).toBeInTheDocument()
  })

  it('should render with provided text', () => {
    const customText = 'Custom template text'
    render(<Template text={customText} />)
    
    expect(
      screen.getByRole('heading', {
        name: new RegExp(customText, 'i'),
        level: 1
      })
    ).toBeInTheDocument()
  })
})
