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
import { autoCompleteMasterData } from '../../../helpers/autoComplete'
import DataModal from './DataModal'

const initialState = {
  truckNumber: '',
  brand: '',
  brandCode: '',
  vendor: '',
  vendorCode: '',
  destination: '',
  destinationCode: '',
  other: '',
  otherCode: '',
  emptyWeight: 0,
  maximumWeight: 0,
}
const TruckFormModal = ({
  currentTruck,
  isEditing,
  updateTruck,
  createTruck,
  toggle,
  modal,
}) => {
  const [truckItem, setTruckItem] = useState(initialState)
  const [openDataModal, setOpenDataModal] = useState(false)
  const [masterItem, setMasterItem] = useState('brand') // This is a trick to prevent 404 not found error when load this Data Modal

  useEffect(() => {
    setTruckItem(currentTruck)
  }, [currentTruck])

  const validateForm = () => {
    return truckItem.truckNumber.length > 0
  }

  const handleChange = e => {
    const { name, value } = e.target
    setTruckItem({ ...truckItem, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!isEditing) {
      createTruck(truckItem)
    } else {
      updateTruck(truckItem)
    }
    setTruckItem(initialState)
    toggle()
  }

  const handleOnClick = item => {
    setMasterItem(item)
    setOpenDataModal(!openDataModal)
  }

  const handleSelectItem = selectedItem => {
    const { code, name } = selectedItem
    const itemName = masterItem // Ex: brand
    const itemCode = `${masterItem}Code` // Ex: brandCode
    setTruckItem({ ...truckItem, [itemName]: name, [itemCode]: code })
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') handleSubmit(e)
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {isEditing ? 'Update Truck Master' : 'Create New Truck Master'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="truckNumber" sm={4}>
                Truck Number:
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="truckNumber"
                  value={truckItem.truckNumber}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="brand" sm={4}>
                Brand Name:
              </Label>
              <Col xs={4} sm={3}>
                <Input
                  type="text"
                  name="brandCode"
                  value={truckItem.brandCode}
                  maxLength="3"
                  onChange={e =>
                    autoCompleteMasterData(e, 'brand', truckItem, setTruckItem)
                  }
                  onKeyPress={handleKeyPress}
                />
              </Col>
              <Col xs={8} sm={5}>
                <Input
                  type="text"
                  name="brand"
                  value={truckItem.brand}
                  onClick={() => handleOnClick('brand')}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="vendor" sm={4}>
                Vendor:
              </Label>
              <Col xs={4} sm={3}>
                <Input
                  type="text"
                  name="vendorCode"
                  value={truckItem.vendorCode}
                  maxLength="3"
                  onChange={e =>
                    autoCompleteMasterData(e, 'vendor', truckItem, setTruckItem)
                  }
                  onKeyPress={handleKeyPress}
                />
              </Col>
              <Col xs={8} sm={5}>
                <Input
                  type="text"
                  name="vendor"
                  value={truckItem.vendor}
                  onClick={() => handleOnClick('vendor')}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="destination" sm={4}>
                Destination:
              </Label>
              <Col xs={4} sm={3}>
                <Input
                  type="text"
                  name="destinationCode"
                  maxLength="3"
                  value={truckItem.destinationCode}
                  onChange={e =>
                    autoCompleteMasterData(
                      e,
                      'destination',
                      truckItem,
                      setTruckItem,
                    )
                  }
                  onKeyPress={handleKeyPress}
                />
              </Col>
              <Col xs={8} sm={5}>
                <Input
                  type="text"
                  name="destination"
                  value={truckItem.destination}
                  onClick={() => handleOnClick('destination')}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="other" sm={4}>
                Other:
              </Label>
              <Col xs={4} sm={3}>
                <Input
                  type="text"
                  name="otherCode"
                  maxLength="3"
                  value={truckItem.otherCode}
                  onChange={e =>
                    autoCompleteMasterData(e, 'other', truckItem, setTruckItem)
                  }
                  onKeyPress={handleKeyPress}
                />
              </Col>
              <Col xs={8} sm={5}>
                <Input
                  type="text"
                  name="other"
                  value={truckItem.other}
                  onClick={() => handleOnClick('other')}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="emptyWeight" sm={5}>
                Empty Weight:
              </Label>
              <Col sm={7}>
                <Input
                  type="number"
                  name="emptyWeight"
                  value={truckItem.emptyWeight}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="maximumWeight" sm={5}>
                Maximum Weight:
              </Label>
              <Col sm={7}>
                <Input
                  type="number"
                  name="maximumWeight"
                  value={truckItem.maximumWeight}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
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

      {/* Data openDataModal */}
      <DataModal
        modal={openDataModal}
        toggle={() => setOpenDataModal(!openDataModal)}
        masterItem={masterItem}
        onSelect={handleSelectItem}
      />
    </div>
  )
}

TruckFormModal.propTypes = {
  currentTruck: PropTypes.shape(initialState).isRequired,
  isEditing: PropTypes.bool.isRequired,
  updateTruck: PropTypes.func.isRequired,
  createTruck: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
}

export default TruckFormModal
