import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import axios from 'axios'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Table,
} from 'reactstrap'

const DataModal = ({ modal, toggle, masterItem, onSelect }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await axios.get(`/${masterItem}`)
        setItems(data)
      } catch (error) {
        toast.error('Cannot load master data. Please restart Raspberry Pi')
      }
    }

    getItems()
  }, [masterItem])

  const onSelectClick = item => {
    onSelect(item)
    toggle()
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{masterItem} List</ModalHeader>
      <ModalBody>
        <div className="border" style={{ height: '50vh', overflowY: 'auto' }}>
          <Table bordered hover className="dataTable">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                return (
                  <tr key={item._id}>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>
                      <Button
                        className="mr-2"
                        color="warning"
                        size="sm"
                        onClick={() => onSelectClick(item)}
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="ml-auto" color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

DataModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  masterItem: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}
export default DataModal
