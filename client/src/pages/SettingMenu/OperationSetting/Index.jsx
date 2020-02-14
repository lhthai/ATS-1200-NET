import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Spinner,
} from 'reactstrap'
import {
  getWeighingOperationSetting,
  getSerialPorts,
  updateWeighingOperationSetting,
} from '../../../actions/setting/weighingOperationSettingActions'
import IndicatorDetail from './IndicatorDetail'

const initialState = {
  _id: '',
  indicatorSetting: {
    portName: '',
    baudRate: 0,
    parity: '',
    dataBits: 0,
    stopBits: 0,
  },
  weighingOperationSetting: {
    weighingStartWeight: 0,
    slipNoStart: 0,
    documentNumbering: 0,
  },
  maintenanceDataUpload: {
    isEnabling: false,
    uploadInterval: 1,
  },
}
const OperationSetting = () => {
  const isLoading = useSelector(
    state => state.weighingOperationSetting.isLoading,
  )
  const operationSetting = useSelector(
    state => state.weighingOperationSetting.payload,
  )
  const serialPorts = useSelector(
    state => state.weighingOperationSetting.serialPorts,
  )
  const dispatch = useDispatch()
  const [item, setItem] = useState(initialState)
  const [showIndicator, setShowIndicator] = useState(false)
  const [showSlipPrinter, setShowSlipPrinter] = useState(false)

  useEffect(() => {
    dispatch(getWeighingOperationSetting())
    dispatch(getSerialPorts())
  }, [dispatch])

  useEffect(() => {
    setItem(operationSetting)
  }, [operationSetting])

  const handleChangeOperationWeighing = e => {
    const { name, value } = e.target
    setItem({
      ...item,
      weighingOperationSetting: {
        ...item.weighingOperationSetting,
        [name]: value,
      },
    })
  }

  const handleChangeIndicatorSetting = e => {
    const { name, value } = e.target
    setItem({
      ...item,
      indicatorSetting: {
        ...item.indicatorSetting,
        [name]: value,
      },
    })
  }

  return (
    <div>
      {isLoading ? (
        <div className="animated fadeIn pt-3 text-center">
          <Spinner color="secondary" />
        </div>
      ) : (
        <Row>
          <Col lg={8} xl={6}>
            <Card>
              <CardBody>
                <CardTitle>
                  <b>Operation Weighing</b>
                </CardTitle>
                <Form>
                  <FormGroup row>
                    <Label for="item1" sm={6}>
                      Weighing start weight:
                    </Label>
                    <Col sm={4}>
                      <Input
                        type="number"
                        name="weighingStartWeight"
                        value={
                          item.weighingOperationSetting.weighingStartWeight ||
                          ''
                        }
                        onChange={handleChangeOperationWeighing}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="item1" sm={6}>
                      How to number Slip No:
                    </Label>
                    <Col sm={6}>
                      <Input
                        type="select"
                        name="slipNoStart"
                        value={item.weighingOperationSetting.slipNoStart}
                        onChange={handleChangeOperationWeighing}
                      >
                        <option value={0}>Starts at No.1 every day</option>
                        <option value={1}>
                          Starts with the specified number every day
                        </option>
                        <option value={2}>Sequential number</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="item1" sm={6}>
                      Document number for next weighing:
                    </Label>
                    <Col sm={2}>
                      <Input
                        type="number"
                        name="documentNumbering"
                        value={
                          item.weighingOperationSetting.documentNumbering || 0
                        }
                        disabled={
                          item.weighingOperationSetting.slipNoStart === 0
                        }
                        onChange={handleChangeOperationWeighing}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <Card className="mt-3">
              <CardBody>
                <CardTitle>
                  <b>Devices Setting</b>
                </CardTitle>
                <Form>
                  <FormGroup row>
                    <Label for="item1" sm={6}>
                      Indicator port:
                    </Label>
                    <Col xs={8}>
                      <Input
                        type="text"
                        name="portName"
                        onChange={handleChangeIndicatorSetting}
                        value={item.indicatorSetting.portName || ''}
                      />
                    </Col>
                    <Col xs={4}>
                      <Button
                        color="secondary"
                        onClick={() => {
                          if (showSlipPrinter) {
                            setShowSlipPrinter(false)
                          }
                          setShowIndicator(!showIndicator)
                        }}
                      >
                        Details
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <Card className="my-3">
              <CardBody>
                <CardTitle>
                  <b>Serial port list</b>
                </CardTitle>
                {serialPorts.length > 0 ? (
                  <Table bordered hover className="dataTable">
                    <tbody>
                      {serialPorts.map(port => {
                        if (port.manufacturer) {
                          return (
                            <tr key={port.serialNumber}>
                              <td>
                                {port.manufacturer} - (<b>{port.path}</b>)
                              </td>
                              <td>
                                <div className="d-flex">
                                  <Button
                                    color="warning"
                                    className="mr-2"
                                    onClick={() =>
                                      setItem({
                                        ...item,
                                        indicatorSetting: {
                                          ...item.indicatorSetting,
                                          portName: port.path,
                                        },
                                      })
                                    }
                                  >
                                    Set as Indicator
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )
                        }
                        return <div />
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <div />
                )}
              </CardBody>
            </Card>
          </Col>
          <IndicatorDetail
            showIndicator={showIndicator || false}
            baudRate={parseInt(item.indicatorSetting.baudRate, 10) || 0}
            parity={item.indicatorSetting.parity || ''}
            dataBits={parseInt(item.indicatorSetting.dataBits, 10) || 0}
            stopBits={parseInt(item.indicatorSetting.stopBits, 10) || 0}
            handleChange={handleChangeIndicatorSetting}
          />
        </Row>
      )}
      <Row>
        <Col xs={4} lg="12" className="mb-3">
          <Button
            color="primary"
            onClick={() => dispatch(updateWeighingOperationSetting(item))}
          >
            Update
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default OperationSetting
