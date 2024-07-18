import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'

interface OTPInputProps {
  length?: number
  value: string
  onChange: (otp: string) => void
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, value, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''))

  useEffect(() => {
    const otpArray = value
      .split('')
      .concat(Array(length).fill(''))
      .slice(0, length)
    setOtp(otpArray)
  }, [value, length])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (/[^0-9]/.test(element.value)) return
    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)
    onChange(newOtp.join(''))
    if (element.nextElementSibling) {
      ;(element.nextElementSibling as HTMLInputElement).focus()
    }
  }

  const handleKeyDown = (
    element: HTMLInputElement,
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === 'Backspace' &&
      !element.value &&
      element.previousElementSibling
    ) {
      ;(element.previousElementSibling as HTMLInputElement).focus()
    }
  }

  return (
    <div className="flex space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="size-10 rounded border border-gray-300 bg-transparent text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 sm:size-12"
          value={data}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target, index)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e.currentTarget, index, e)
          }
        />
      ))}
    </div>
  )
}

export default OTPInput
