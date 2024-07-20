import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  children: ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  className,
  ...rest
}) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/80"
      {...rest}
    >
      <div
        className={clsx(
          'rounded-lg bg-white shadow-lg dark:bg-dark ',
          className
        )}
      >
        <div className="h-full overflow-auto p-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
