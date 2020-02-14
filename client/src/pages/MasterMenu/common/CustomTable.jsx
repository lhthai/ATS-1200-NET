import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Table,
  Button,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Input,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTable,
  faPlusCircle,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons'
import DeleteModal from '../../../components/DeleteModal'
import FormModal from './FormModal'
import ExportCSV from '../../../components/ExportCSV'

const initialState = { _id: '', code: '', name: '' }

const CustomTable = ({
  items,
  isLoading,
  dispatch,
  tableName,
  getItems,
  createItem,
  updateItem,
  deleteItem,
}) => {
  const [currentItem, setCurrentItem] = useState(initialState)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [formModal, setFormModal] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch, getItems])

  const handleCreate = () => {
    setIsEditing(false)
    setCurrentItem(initialState)
    setFormModal(!formModal)
  }

  const handleUpdate = item => {
    setIsEditing(true)
    setCurrentItem(item)
    setFormModal(!formModal)
  }

  const handleDelete = item => {
    setCurrentItem(item)
    setDeleteModal(!deleteModal)
  }

  const fildteredItems = items.filter(item => {
    return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  return (
    <div>
      <Row>
        <Col sm={12}>
          <Card>
            <CardHeader>
              <FontAwesomeIcon icon={faTable} /> {tableName} Data
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs={12} lg={6}>
                  <Button
                    color="primary"
                    className="mb-2 mr-2"
                    onClick={handleCreate}
                  >
                    <FontAwesomeIcon icon={faPlusCircle} /> Create
                  </Button>
                  <ExportCSV csvData={items} fileName={tableName} />
                </Col>
                <Col sm={12} md={12} lg={6} xl={{ size: 4, offset: 2 }}>
                  <Input
                    className="mb-2"
                    type="text"
                    name="search"
                    placeholder="Search for name..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </Col>
              </Row>
              {isLoading ? (
                <div className="animated fadeIn pt-3 text-center">
                  <Spinner color="secondary" />
                </div>
              ) : (
                <div style={{ height: '65vh', overflowY: 'auto' }}>
                  <Table bordered hover responsive className="dataTable">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fildteredItems.map(item => {
                        return (
                          <tr key={item._id}>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>
                              <div className="d-flex">
                                <Button
                                  className="mr-2"
                                  color="warning"
                                  size="sm"
                                  onClick={() => handleUpdate(item)}
                                >
                                  <FontAwesomeIcon icon={faEdit} /> Update
                                </Button>
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => handleDelete(item)}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Declare all modals here */}
      <FormModal
        modal={formModal}
        toggle={() => setFormModal(!formModal)}
        itemName={tableName}
        currentItem={currentItem}
        isEditing={isEditing}
        createItem={item => dispatch(createItem(item))}
        updateItem={item => {
          dispatch(updateItem(item))
          setIsEditing(false)
        }}
      />
      <DeleteModal
        modal={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        currentItem={currentItem}
        deleteItem={() => dispatch(deleteItem(currentItem._id))}
      />
    </div>
  )
}

CustomTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(initialState)).isRequired,
  isLoading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  tableName: PropTypes.string.isRequired,
  getItems: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
}

export default CustomTable
