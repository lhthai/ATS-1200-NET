import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

import socket from '../helpers/socket'

const PrintModal = ({ data, toggle, modal }) => {
  const handlePrint = () => {
    socket.emit('printVoucher', data)
    toggle()
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Printing Confirmation</ModalHeader>
        <ModalBody>Do you want to print this weighing slip?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePrint}>
            Print
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
PrintModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
}
export default PrintModal
