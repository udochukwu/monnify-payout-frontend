import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50">
      <div
        className={clsx(
          'rounded-lg bg-white shadow-lg dark:bg-dark md:w-1/2 lg:w-1/3'
        )}
      >
        <div className="h-full overflow-auto p-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
