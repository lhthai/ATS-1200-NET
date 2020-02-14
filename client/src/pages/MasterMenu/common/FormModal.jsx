import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Col,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

const initialState = { _id: '', code: '', name: '' }

const FormModal = ({
  isEditing,
  currentItem,
  createItem,
  updateItem,
  toggle,
  itemName,
  modal,
}) => {
  const [item, setItem] = useState(initialState)

  useEffect(() => {
    setItem(currentItem)
  }, [currentItem])

  const validateForm = () => {
    return item.code.length > 0 && item.name.length > 0
  }

  const handleChange = e => {
    const { name, value } = e.target
    setItem({ ...item, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!isEditing) {
      createItem(item)
    } else {
      updateItem(item)
    }
    setItem(initialState)
    toggle()
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {isEditing ? 'Update ' : 'Create New '}
        {itemName}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup row>
            <Label for="code" sm={2}>
              Code:
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="code"
                maxLength={3}
                value={item.code}
                onChange={handleChange}
                placeholder="Code"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="name" sm={2}>
              Name:
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="name"
                value={item.name}
                onChange={handleChange}
                placeholder="Name"
                onKeyPress={e => {
                  if (e.key === 'Enter') handleSubmit(e)
                }}
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="mr-2"
          onClick={handleSubmit}
          disabled={!validateForm()}
        >
          {isEditing ? 'Update' : 'Create'}
        </Button>
        <Button color="secondary" onClick={() => toggle()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

FormModal.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  currentItem: PropTypes.shape({
    _id: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  toggle: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  createItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
}

export default FormModal
