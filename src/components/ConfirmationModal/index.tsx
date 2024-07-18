import React from 'react'
import Button from 'components/Button'
import Modal from 'components/Modal'

interface ConfirmationModalProps {
  isOpen: boolean
  onCancel: () => void
  onProceed: () => void
  loading: boolean
  children: React.ReactNode
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onProceed,
  loading,
  children
}) => (
  <Modal isOpen={isOpen} className="w-80 sm:w-96">
    {children}
    <div className="flex justify-between">
      <Button
        onClick={onCancel}
        color="red"
        appearance="solid"
        className="mr-2 w-full"
      >
        Cancel
      </Button>
      <Button
        onClick={onProceed}
        color="green"
        appearance="solid"
        className="w-full"
        loading={loading}
      >
        Proceed
      </Button>
    </div>
  </Modal>
)

export default ConfirmationModal
