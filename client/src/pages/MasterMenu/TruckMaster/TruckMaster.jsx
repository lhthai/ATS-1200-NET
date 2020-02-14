import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import {
  getTrucks,
  createTruck,
  updateTruck,
  deleteTruck,
} from '../../../actions/master/truckActions'
import DeleteModal from '../../../components/DeleteModal'
import TruckFormModal from './TruckFormModal'
import ExportCSV from '../../../components/ExportCSV'

const initialState = {
  _id: '',
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
const TruckMaster = () => {
  const items = useSelector(state => state.trucks.payload)
  const isLoading = useSelector(state => state.trucks.isLoading)
  const dispatch = useDispatch()
  const [currentTruck, setCurrentItem] = useState(initialState)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [formModal, setFormModal] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getTrucks())
  }, [dispatch])

  const fildteredItems = items.filter(item => {
    return item.truckNumber.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  return (
    <div>
      <Row>
        <Col sm={12}>
          <Card>
            <CardHeader>
              <FontAwesomeIcon icon={faTable} /> Truck Master Data
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs={12} lg={6}>
                  <Button
                    color="primary"
                    className="mb-2 mr-2"
                    onClick={() => {
                      setIsEditing(false)
                      setFormModal(!formModal)
                    }}
                  >
                    <FontAwesomeIcon icon={faPlusCircle} /> Create
                  </Button>
                  <ExportCSV csvData={items} fileName="Truck Master" />
                </Col>
                <Col sm={12} md={12} lg={6} xl={{ size: 4, offset: 2 }}>
                  <Input
                    className="mb-2"
                    type="text"
                    name="search"
                    placeholder="Search for truck number..."
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
                <Table bordered responsive className="dataTable">
                  <thead>
                    <tr>
                      <th>Truck Number</th>
                      <th>Brand Name</th>
                      <th>Vendor</th>
                      <th>Destination</th>
                      <th>Other</th>
                      <th>Empty Weight (kg)</th>
                      <th>Maximum Weight (kg)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fildteredItems.map(item => {
                      return (
                        <tr key={item._id}>
                          <td style={{ minWidth: '110px' }}>
                            {item.truckNumber}
                          </td>
                          <td>
                            {item.brandCode} - {item.brand}
                          </td>
                          <td>
                            {item.vendorCode} - {item.vendor}
                          </td>
                          <td>
                            {item.destinationCode} - {item.destination}
                          </td>
                          <td>
                            {item.otherCode} - {item.other}
                          </td>
                          <td>{item.emptyWeight}</td>
                          <td>{item.maximumWeight}</td>
                          <td>
                            <div
                              style={{ minWidth: '170px', minHeight: '100%' }}
                              className="d-flex"
                            >
                              <Button
                                className="mr-2"
                                color="warning"
                                size="sm"
                                onClick={() => {
                                  setIsEditing(true)
                                  setCurrentItem(item)
                                  setFormModal(!formModal)
                                }}
                              >
                                <FontAwesomeIcon icon={faEdit} /> Update
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => {
                                  setDeleteModal(!deleteModal)
                                  setCurrentItem(item)
                                }}
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
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Declare all modals here */}
      <TruckFormModal
        modal={formModal}
        toggle={() => setFormModal(!formModal)}
        itemName="Truck"
        createTruck={truck => dispatch(createTruck(truck))}
        updateTruck={truck => {
          dispatch(updateTruck(truck))
          setIsEditing(false)
        }}
        currentTruck={currentTruck}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <DeleteModal
        modal={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        currentItem={currentTruck}
        deleteItem={() => dispatch(deleteTruck(currentTruck._id))}
      />
    </div>
  )
}

export default TruckMaster
