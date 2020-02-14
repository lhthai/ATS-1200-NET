import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Table,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Label,
  Button,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTable,
  faEdit,
  faTrash,
  faPrint,
} from '@fortawesome/free-solid-svg-icons'

// Configure datepicker using react-widgets
import moment from 'moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets-moment'
import { getItemsOperationSetting } from '../actions/setting/itemOperationSettingActions'
import {
  getMeasurementDataList,
  deleteMeassurementDataList,
} from '../actions/weighingActions'
import DeleteModal from '../components/DeleteModal'
import ExportCSV from '../components/ExportCSV'
import 'react-widgets/dist/css/react-widgets.css'
import printPDF from '../helpers/printPDF'

momentLocalizer(moment)

function MeasurementDataList() {
  const isLoading = useSelector(state => state.weighing.isLoading)
  const items = useSelector(state => state.weighing.measurementData)
  const itemOperation = useSelector(state => state.itemOperationSetting.payload)
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date())
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [currentItem, setCurrentItem] = useState({})

  useEffect(() => {
    dispatch(getMeasurementDataList(date))
    dispatch(getItemsOperationSetting())
  }, [date, dispatch])

  return (
    <div>
      <Card>
        <CardHeader>
          <FontAwesomeIcon icon={faTable} /> Measurement Data List
        </CardHeader>
        <CardBody>
          <Row>
            <Label for="date" className="col-lg-2 col-xl-2 mt-2 mr-2">
              Select Date:
            </Label>
            <DateTimePicker
              className="col-md-6 col-lg-4 col-xl-3 mb-4"
              time={false}
              value={date}
              onChange={value => setDate(value)}
            />
            <Col className="col-md-12 col-lg-5">
              <Button
                color="primary"
                className="mb-2 mr-2"
                onClick={() => printPDF()}
              >
                <FontAwesomeIcon icon={faPrint} /> Print
              </Button>
              <ExportCSV csvData={items} fileName="Measurement Data List" />
            </Col>
          </Row>
          {isLoading ? (
            <div className="animated fadeIn pt-3 text-center">
              <Spinner color="secondary" />
            </div>
          ) : (
            <div style={{ height: '65vh', overflowY: 'auto' }}>
              <Table
                bordered
                responsive
                className="dataTable"
                id="printableTable"
              >
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>No</th>
                    <th>{itemOperation.item1.name}</th>
                    <th>{itemOperation.item2.name}</th>
                    <th>{itemOperation.item3.name}</th>
                    <th>{itemOperation.item4.name}</th>
                    <th>{itemOperation.item5.name}</th>
                    <th>Truck In (kg)</th>
                    <th>Truck Out (kg)</th>
                    <th>Net Weight (kg)</th>
                    <th className="noprint">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => {
                    return (
                      <tr key={item._id}>
                        <td>{item.emptyTime}</td>
                        <td>{item.slipNo}</td>
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
                        <td>{item.grossWeight}</td>
                        <td>{item.correctionNet}</td>
                        <td className="noprint">
                          <div
                            style={{ minWidth: '170px', minHeight: '100%' }}
                            className="d-flex"
                          >
                            <Button
                              tag={Link}
                              to={{
                                pathname: '/',
                                updatingMeasurementData: { weighing: item },
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
      {/* Declare all modals here */}
      <DeleteModal
        modal={openDeleteModal}
        toggle={() => setOpenDeleteModal(!openDeleteModal)}
        currentItem={currentItem}
        deleteItem={() => dispatch(deleteMeassurementDataList(currentItem._id))}
      />
    </div>
  )
}

export default MeasurementDataList
