import React from 'react'
import Button from 'components/Button'
import Modal from 'components/Modal'

interface ConfirmationModalProps extends React.HTMLAttributes<HTMLDivElement> {
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
  children,
  ...rest // Collect other props
}) => (
  <Modal isOpen={isOpen} className="w-80 sm:w-96" {...rest}>
    <div>
      {children}
      <div className="mt-4 flex justify-between">
        <Button
          type="reset"
          onClick={onCancel}
          color="red"
          appearance="solid"
          className="mr-2 w-full"
          id="cancelBtn"
        >
          Cancel
        </Button>
        <Button
          onClick={onProceed}
          color="green"
          appearance="solid"
          className="w-full"
          id="proceedBtn"
          loading={loading}
        >
          Proceed
        </Button>
      </div>
    </div>
  </Modal>
)

export default ConfirmationModal
