import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
import { faTable, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import {
  getStayingTrucks,
  deleteStayingTruck,
} from '../actions/weighingActions'
import { getItemsOperationSetting } from '../actions/setting/itemOperationSettingActions'

import DeleteModal from '../components/DeleteModal'

const StayingTruckList = () => {
  const items = useSelector(state => state.weighing.stayingTrucks)
  const isLoading = useSelector(state => state.weighing.isLoading)
  const itemOperation = useSelector(state => state.itemOperationSetting.payload)
  const dispatch = useDispatch()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [currentItem, setCurrentItem] = useState({})
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getStayingTrucks())
    dispatch(getItemsOperationSetting())
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
              <FontAwesomeIcon icon={faTable} /> Staying Truck List
            </CardHeader>
            <CardBody>
              <Col
                sm={{ size: 6, offset: 6 }}
                xl={{ size: 4, offset: 8 }}
                className="d-flex mb-2 p-0"
              >
                <Input
                  className="ml-auto"
                  type="text"
                  name="search"
                  placeholder="Search for truck number..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </Col>
              {isLoading ? (
                <div className="animated fadeIn pt-3 text-center">
                  <Spinner color="secondary" />
                </div>
              ) : (
                <div style={{ height: '65vh', overflowY: 'auto' }}>
                  <Table bordered responsive className="dataTable">
                    <thead>
                      <tr>
                        <th>{itemOperation.item1.name}</th>
                        <th>{itemOperation.item2.name}</th>
                        <th>{itemOperation.item3.name}</th>
                        <th>{itemOperation.item4.name}</th>
                        <th>{itemOperation.item5.name}</th>
                        <th>Time</th>
                        <th>Weight (kg)</th>
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
                            <td>{item.grossTime}</td>
                            <td>{item.grossWeight}</td>
                            <td>
                              <div
                                style={{ minWidth: '170px', minHeight: '100%' }}
                                className="d-flex"
                              >
                                <Button
                                  tag={Link}
                                  to={{
                                    pathname: '/',
                                    updatingStayingTruck: { weighing: item },
                                  }}
                                  color="warning"
                                  className="mr-2"
                                  size="sm"
                                >
                                  <FontAwesomeIcon icon={faEdit} /> Update
                                </Button>
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => {
                                    setOpenDeleteModal(!openDeleteModal)
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
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <DeleteModal
        modal={openDeleteModal}
        toggle={() => setOpenDeleteModal(!openDeleteModal)}
        currentItem={currentItem}
        deleteItem={() => dispatch(deleteStayingTruck(currentItem._id))}
      />
    </div>
  )
}

export default StayingTruckList
