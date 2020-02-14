import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Button, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Table, Spinner } from 'reactstrap';

import Message from '../../components/Message'
import socket from '../../socket'

function OperationSetting() {
    const [signal] = useState(true)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({ type: "", show: false, content: "" })

    const [showIndicator, setShowIndicator] = useState(false)
    const [showSlipPrinter, setShowSlipPrinter] = useState(false)
    const [operationSetting, setOperationSetting] = useState({
        _id: '',
        indicatorSetting: {
            portName: "",
            baudRate: 0,
            parity: "",
            dataBits: 0,
            stopBits: 0
        },
        slipPrinterSetting: {
            portName: "",
            baudRate: 0,
            parity: "",
            dataBits: 0,
            stopBits: 0
        },
        weighingOperationSetting: {
            weighingStartWeight: 0,
            slipNoStart: 0,
            documentNumbering: 0
        }
    })
    const [serialPorts, setSerialPorts] = useState([])

    useEffect(() => {
        getOperationSetting();
        getSerialPorts()
    }, [])

    const showAlert = () => {
        setMessage({ ...message, show: true })
        setTimeout(() => {
            setMessage({ ...message, show: false })
        }, 3000);
    }

    const handleUpdate = async () => {
        try {
            const { data } = await axios.put(`/setting/operationsetting/${operationSetting._id}`, operationSetting)
            setOperationSetting(data)
            Object.assign(message, { type: "success", content: 'Settings are updated successfully!' })
            showAlert()
            socket.emit("restartServer")
        } catch (error) {
            Object.assign(message, { type: "error", content: 'Something went wrong. Please try again!' })
        }
    }

    const handleChangeOperationWeighing = e => {
        setOperationSetting({ ...operationSetting, weighingOperationSetting: { ...operationSetting.weighingOperationSetting, [e.target.name]: e.target.value } })
        // Object.assign(operationSetting, {})
        // console.log(operationSetting.weighingOperationSetting.slipNoStart)
    }

    const handleChangeIndicatorSetting = e => {
        setOperationSetting({ ...operationSetting, indicatorSetting: { ...operationSetting.indicatorSetting, [e.target.name]: e.target.value } })
    }

    const handleChangeSlipPrinterSetting = e => {
        setOperationSetting({ ...operationSetting, slipPrinterSetting: { ...operationSetting.slipPrinterSetting, [e.target.name]: e.target.value } })
    }

    const getOperationSetting = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(`/setting/operationsetting`)
            if (signal) {
                setOperationSetting(data[0])
                setIsLoading(false)
            }
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }


    const getSerialPorts = async () => {
        try {
            const { data } = await axios.get(`/setting/getserialports`)
            if (signal) {
                setSerialPorts(data)
            }
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }

    return (
        <div>
            {isLoading && !error ? (<div className="animated fadeIn pt-3 text-center"><Spinner color="secondary" /></div>)
                : error ? (<Message type="error" show={true} content="Failed to load data!" />)
                    : (
                        <Row>
                            <Col lg={8} xl={6}>
                                <Message show={message.show} content={message.content} type="success" />
                                <Card>
                                    <CardBody>
                                        <CardTitle><b>Operation Weighing</b></CardTitle>
                                        <Form>
                                            <FormGroup row>
                                                <Label for="item1" sm={6}>Weighing start weight:</Label>
                                                <Col sm={4}>
                                                    <Input type="number" name="weighingStartWeight"
                                                        value={operationSetting.weighingOperationSetting.weighingStartWeight}
                                                        onChange={handleChangeOperationWeighing}></Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="item1" sm={6}>How to number Slip No:</Label>
                                                <Col sm={6}>
                                                    <Input type="select" name="slipNoStart"
                                                        value={operationSetting.weighingOperationSetting.slipNoStart}
                                                        onChange={handleChangeOperationWeighing}>
                                                        <option value={0}>Starts at No.1 every day</option>
                                                        <option value={1}>Starts with the specified number every day</option>
                                                        <option value={2}>Sequential number</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="item1" sm={6}>Document number for next weighing:</Label>
                                                <Col sm={2}>
                                                    <Input type="number" name="documentNumbering"
                                                        value={operationSetting.weighingOperationSetting.documentNumbering}
                                                        disabled={operationSetting.weighingOperationSetting.slipNoStart === 0 ? true : false}
                                                        onChange={handleChangeOperationWeighing}></Input>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="mt-3">
                                    <CardBody>
                                        <CardTitle><b>Devices Setting</b></CardTitle>
                                        <Form>
                                            <FormGroup row>
                                                <Label for="item1" sm={6}>Indicator port:</Label>
                                                <Col xs={8}>
                                                    <Input type="text" name="portName"
                                                        onChange={handleChangeIndicatorSetting}
                                                        value={operationSetting.indicatorSetting.portName}>
                                                    </Input>
                                                </Col>
                                                <Col xs={4}>
                                                    <Button color="secondary" onClick={() => {
                                                        if (showSlipPrinter) {
                                                            setShowSlipPrinter(false)
                                                        }
                                                        setShowIndicator(!showIndicator)
                                                    }}>Details</Button>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="item1" sm={6}>Slip Printer port:</Label>
                                                <Col xs={8}>
                                                    <Input type="text" name="portName"
                                                        value={operationSetting.slipPrinterSetting.portName}
                                                        onChange={handleChangeSlipPrinterSetting}>
                                                    </Input>
                                                </Col>
                                                <Col xs={4}>
                                                    <Button color="secondary" onClick={() => {
                                                        if (showIndicator) {
                                                            setShowIndicator(false)
                                                        }
                                                        setShowSlipPrinter(!showSlipPrinter)
                                                    }}>Details</Button>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="my-3">
                                    <CardBody>
                                        <CardTitle><b>Serial port list</b></CardTitle>
                                        {serialPorts.length > 0 ? (
                                            <Table bordered hover className="dataTable">
                                                <tbody>
                                                    {serialPorts.map((port, index) => {
                                                        if (port.manufacturer) {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{port.manufacturer} (<b>{port.comName}</b>)</td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <Button color="warning" className="mr-2"
                                                                                onClick={() => setOperationSetting({
                                                                                    ...operationSetting,
                                                                                    indicatorSetting: {
                                                                                        ...operationSetting.indicatorSetting,
                                                                                        portName: port.comName
                                                                                    }
                                                                                })}>Set as Indicator</Button>
                                                                            {/* <Button color="warning"
                                                                                onClick={() => setOperationSetting({
                                                                                    ...operationSetting,
                                                                                    slipPrinterSetting: {
                                                                                        ...operationSetting.slipPrinterSetting,
                                                                                        portName: port.comName
                                                                                    }
                                                                                })}>Set as Printer</Button> */}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    })}
                                                </tbody>
                                            </Table>
                                        ) : (<Message type="error" show={true} content="Serial device not found!" />)}
                                    </CardBody>
                                </Card>

                            </Col>

                            <Col lg={4} xl={6}>
                                <Card style={{ display: showIndicator ? '' : 'none' }}>
                                    <CardBody>
                                        <CardTitle><b>Indicator settings</b></CardTitle>
                                        <Form>
                                            <FormGroup row>
                                                <Label for="item1" xs={6} lg={12} xl={4}>Baud Rate:</Label>
                                                <Col xs={6} lg={12} xl={4}>
                                                    <Input type="select" name="baudRate"
                                                        value={operationSetting.indicatorSetting.baudRate}
                                                        onChange={handleChangeIndicatorSetting}>
                                                        <option value={1200}>1200</option>
                                                        <option value={2400}>2400</option>
                                                        <option value={4800}>4800</option>
                                                        <option value={9600}>9600</option>
                                                        <option value={19200}>19200</option>
                                                        <option value={38400}>38400</option>
                                                        <option value={57600}>57600</option>
                                                        <option value={115200}>115200</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="item1" xs={6} lg={12} xl={4}>Parity:</Label>
                                                <Col xs={6} lg={12} xl={4}>
                                                    <Input type="select" name="parity"
                                                        value={operationSetting.indicatorSetting.parity}
                                                        onChange={handleChangeIndicatorSetting}>
                                                        <option value="none">None</option>
                                                        <option value="even">Even</option>
                                                        <option value="odd">Odd</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="item1" xs={6} lg={12} xl={4}>Data bits:</Label>
                                                <Col xs={6} lg={12} xl={4}>
                                                    <Input type="select" name="dataBits"
                                                        value={operationSetting.indicatorSetting.dataBits}
                                                        onChange={handleChangeIndicatorSetting}>
                                                        <option value={7}>7</option>
                                                        <option value={8}>8</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="item1" xs={6} lg={12} xl={4}>Stop bits:</Label>
                                                <Col xs={6} lg={12} xl={4}>
                                                    <Input type="select" name="stopBits"
                                                        value={operationSetting.indicatorSetting.stopBits}
                                                        onChange={handleChangeIndicatorSetting}>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>

                                {/* Slip printer settings */}
                                <Card style={{ display: showSlipPrinter ? '' : 'none' }}>
                                    <CardBody>
                                        <CardTitle><b>Slip Printer settings</b></CardTitle>
                                        <Form>
                                            <FormGroup row>
                                                <Label for="item1" xs={6} lg={12} xl={4}>Baud Rate:</Label>
                                                <Col xs={6} lg={12} xl={4}>
                                                    <Input type="select" name="baudRate"
                                                        value={operationSetting.slipPrinterSetting.baudRate}
                                                        onChange={handleChangeSlipPrinterSetting}>
                                                        <option value={1200}>1200</option>
                                                        <option value={2400}>2400</option>
                                                        <option value={4800}>4800</option>
                                                        <option value={9600}>9600</option>
                                                        <option value={19200}>19200</option>
                                                        <option value={38400}>38400</option>
                                                        <option value={57600}>57600</option>
                                                        <option value={115200}>115200</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="item1" xs={6} lg={12} xl={4}>Parity:</Label>
                                                <Col xs={6} lg={12} xl={4}>
                                                    <Input type="select" name="parity"
                                                        value={operationSetting.slipPrinterSetting.parity}
                                                        onChange={handleChangeSlipPrinterSetting}>
                                                        <option value="none">None</option>
                                                        <option value="even">Even</option>
                                                        <option value="odd">Odd</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="item1" xs={6} lg={12} xl={4}>Data bits:</Label>
                                                <Col xs={6} lg={12} xl={4}>
                                                    <Input type="select" name="dataBits"
                                                        value={operationSetting.slipPrinterSetting.dataBits}
                                                        onChange={handleChangeSlipPrinterSetting}>
                                                        <option value={7}>7</option>
                                                        <option value={8}>8</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="item1" xs={6} lg={12} xl={4}>Stop bits:</Label>
                                                <Col xs={6} lg={12} xl={4}>
                                                    <Input type="select" name="stopBits"
                                                        value={operationSetting.slipPrinterSetting.stopBits}
                                                        onChange={handleChangeSlipPrinterSetting}>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    )}
            <Row >
                <Col xs={4} lg="12" className="mb-3" >
                    <Button color="primary" onClick={handleUpdate}>Update</Button>
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(OperationSetting)
