import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Row,
  Col,
  Table,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Label,
  Input,
  Button,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faPrint, faSort } from '@fortawesome/free-solid-svg-icons'
import '../components/style.css'
// Configure datepicker using react-widgets
import moment from 'moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets-moment'
import { sortUp, sortDown } from '../helpers/sorting'
import { getSummaryReport } from '../actions/summaryReportActions'
import 'react-widgets/dist/css/react-widgets.css'
import printPDF from '../helpers/printPDF'

momentLocalizer(moment)

const SummaryReport = () => {
  const isLoading = useSelector(state => state.summaryReport.isLoading)
  const data = useSelector(state => state.summaryReport.payload)
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [firstItem, setFirstItem] = useState('')
  const [firstItemHead, setFirstItemHead] = useState('')
  const [secondItem, setSecondItem] = useState('')
  const [secondtemHead, setSecondItemHead] = useState('')
  const [bindData, setBindData] = useState(false)
  const [isSortingUp, setIsSortingUp] = useState(true)

  useEffect(() => {
    switch (firstItem) {
      case 'brand':
        setFirstItemHead('Brand')
        break
      case 'vendor':
        setFirstItemHead('Vendor')
        break
      case 'destination':
        setFirstItemHead('Destination')
        break
      case 'other':
        setFirstItemHead('Other')
        break
      default:
        setFirstItemHead('Truck Number')
    }
  }, [firstItem])

  useEffect(() => {
    switch (secondItem) {
      case 'brand':
        setSecondItemHead('Brand')
        break
      case 'vendor':
        setSecondItemHead('Vendor')
        break
      case 'destination':
        setSecondItemHead('Destination')
        break
      case 'other':
        setSecondItemHead('Other')
        break
      default:
        setSecondItemHead('Truck Number')
    }
  }, [secondItem])

  useEffect(() => {
    setItems(data)
  }, [data])

  const handleFilter = () => {
    setBindData(true)
    dispatch(getSummaryReport(firstItem, secondItem, fromDate, toDate))
  }

  const handleSortUp = (key1, key2) => {
    const temp = [...items]
    temp.sort(sortUp(key1, key2))
    setItems(temp)
  }

  const handleSortDown = (key1, key2) => {
    const temp = [...items]
    temp.sort(sortDown(key1, key2))
    setItems(temp)
  }

  const hanldleSort = (key1, key2) => {
    setIsSortingUp(!isSortingUp)
    if (key2 === '' || key2 === undefined) {
      if (isSortingUp) {
        handleSortUp(key1)
      } else {
        handleSortDown(key1)
      }
    } else if (isSortingUp) {
      handleSortUp(key1, key2)
    } else {
      handleSortDown(key1, key2)
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <FontAwesomeIcon icon={faTable} /> Summary Report
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={12} lg={6} xl={3} className="mb-2">
              <Label for="date">From date:</Label>
              <DateTimePicker
                time={false}
                value={fromDate}
                onChange={value => setFromDate(value)}
              />
            </Col>
            <Col md={12} lg={6} xl={3}>
              <Label for="date">To date:</Label>
              <DateTimePicker
                time={false}
                value={toDate}
                onChange={value => setToDate(value)}
              />
            </Col>
          </Row>
          <Label for="date" className="mt-2">
            Filter by:
          </Label>
          <Row>
            <Col md={12} lg={6} xl={3}>
              <Input
                className="mr-2 mb-2"
                type="select"
                name="select"
                onChange={e => {
                  setFirstItem(e.target.value)
                  setBindData(false)
                }}
              >
                <option value="">-- Select item 1 --</option>
                <option value="truckNumber">Truck number</option>
                <option value="brand">Brand</option>
                <option value="vendor">Vendor</option>
                <option value="destination">Destination</option>
                <option value="other">Other</option>
              </Input>
            </Col>
            <Col md={12} lg={6} xl={3}>
              <Input
                className="mb-2"
                type="select"
                name="select"
                disabled={firstItem === ''}
                onChange={e => {
                  setSecondItem(e.target.value)
                  setBindData(false)
                }}
              >
                <option value="">-- Select item 2 --</option>
                <option value="truckNumber">Truck number</option>
                <option value="brand">Brand</option>
                <option value="vendor">Vendor</option>
                <option value="destination">Destination</option>
                <option value="other">Other</option>
              </Input>
            </Col>
            <Col md={12} xl={3}>
              <Button color="primary" onClick={handleFilter}>
                Filter
              </Button>
              <Button
                color="primary"
                className="ml-2 px-4"
                onClick={() => printPDF()}
              >
                <FontAwesomeIcon icon={faPrint} /> Print
              </Button>
            </Col>
          </Row>
          {isLoading && (
            <div className="animated fadeIn pt-3 text-center">
              <Spinner color="secondary" />
            </div>
          )}
          {!isLoading &&
            bindData &&
            (secondItem === '' ? (
              <div id="printableTable" className="mt-2">
                <Table bordered responsive className="dataTable">
                  <thead>
                    <tr>
                      <th onClick={() => hanldleSort('_id')}>
                        {firstItemHead} <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th onClick={() => hanldleSort('totalCount')}>
                        Times <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th onClick={() => hanldleSort('totalWeight')}>
                        Net weight (kg) <FontAwesomeIcon icon={faSort} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ minWidth: '110px' }}>
                            {(firstItem === 'truckNumber' && '') ||
                              (firstItem === 'brand' &&
                                `${item.brandCode} - `) ||
                              (firstItem === 'vendor' &&
                                `${item.vendorCode} - `) ||
                              (firstItem === 'destination' &&
                                `${item.destinationCode} - `) ||
                              (firstItem === 'other' &&
                                `${item.otherCode} - `)}{' '}
                            {item._id}
                          </td>
                          <td>{item.totalCount}</td>
                          <td>{item.totalWeight}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div id="printableTable" className="mt-2">
                <Table bordered responsive className="dataTable">
                  <thead>
                    <tr>
                      <th onClick={() => hanldleSort('_id', 'firstItem')}>
                        {firstItemHead} <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th onClick={() => hanldleSort('_id', 'secondItem')}>
                        {secondtemHead} <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th onClick={() => hanldleSort('totalCount')}>
                        Times <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th onClick={() => hanldleSort('totalWeight')}>
                        Net weight (kg) <FontAwesomeIcon icon={faSort} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ minWidth: '110px' }}>
                            {(firstItem === 'truckNumber' && '') ||
                              (firstItem === 'brand' &&
                                `${item.brandCode} - `) ||
                              (firstItem === 'vendor' &&
                                `${item.vendorCode} - `) ||
                              (firstItem === 'destination' &&
                                `${item.destinationCode} - `) ||
                              (firstItem === 'other' && `${item.otherCode} - `)}
                            {item._id.firstItem}
                          </td>
                          <td style={{ minWidth: '110px' }}>
                            {(secondItem === 'truckNumber' && '') ||
                              (secondItem === 'brand' &&
                                `${item.brandCode} - `) ||
                              (secondItem === 'vendor' &&
                                `${item.vendorCode} - `) ||
                              (secondItem === 'destination' &&
                                `${item.destinationCode} - `) ||
                              (secondItem === 'other' &&
                                `${item.otherCode} - `)}
                            {item._id.secondItem}
                          </td>
                          <td>{item.totalCount}</td>
                          <td>{item.totalWeight}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            ))}
        </CardBody>
      </Card>
    </div>
  )
}

export default SummaryReport
