import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Form, FormGroup, Input, Label, Card, CardHeader, CardBody, Button, Table, Badge } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import DataModal from '../MasterMenu/TruckMaster/DataModal'
import socket from '../../socket'
import PrintModal from '../../components/PrintModal'
import IndicatorStatus from './IndicatorStatus'

function Weighing(props) {
    const [currentTime, setCurrentTime] = useState('')
    const initialWeight = {
        _id: "",
        slipNo: 0,
        numberingType: 0,
        truckNumber: "",
        brandCode: "",
        brandName: "",
        vendorCode: "",
        vendor: "",
        destinationCode: "",
        destination: "",
        otherCode: "",
        other: "",
        emptyWeight: null,
        emptyTime: '',
        grossWeight: 0,
        grossTime: '',
        correctionNet: 0,
        edited: false
    }
    // weighingProp used for pass item from Staying Truck List to Weighing to update
    const updateStayingTruck = props.location.updateStayingTruck ? props.location.updateStayingTruck.weighing : ''
    const updateMeasurementData = props.location.updateMeasurementData ? props.location.updateMeasurementData.weighing : ''
    const [weightData, setWeightData] = useState(updateStayingTruck !== '' ? updateStayingTruck : (updateMeasurementData !== '' ? updateMeasurementData : initialWeight))
    const [weight, setWeight] = useState(0)

    // Declare things for modal Select Master data
    const [modal, setModal] = useState(false)
    const [printModal, setPrintModal] = useState(false)
    const [printData, setPrintData] = useState({})
    const [itemName, setItemName] = useState('brand') // ===> This is a trick to prevent 404 not found error when load modal
    const [inputName, setInputName] = useState('')
    const [inputCode, setInputCode] = useState('')

    const [stayingTrucks, setStayingTrucks] = useState([])
    const [isUpdating, setIsUpdating] = useState(false) // ==> For update weightData when Truck Out
    const [isUpdatingStayingTruck, setIsUpdatingStayingTruck] = useState(false) // ==> For update item from Staying Truck List
    const [isUpdatingMeasurementData, setIsUpdatingMeasurementData] = useState(false) // ==> For update item from Measurement Data List

    // Declare settings
    // Naming label of the Master items input
    const [itemOperation, setItemOperation] = useState({
        item1: {
            name: "",
            display: true,
            require: true
        },
        item2: {
            name: "",
            display: true,
            require: true
        },
        item3: {
            name: "",
            display: true,
            require: true
        },
        item4: {
            name: "",
            display: true,
            require: true
        },
        item5: {
            name: "",
            display: true,
            require: true
        },
        item6: {
            name: "",
            display: true,
            require: true
        }
    })
    const [weighingOperationSetting, setWeighingOperationSetting] = useState({
        weighingStartWeight: 0,
        slipNoStart: 0,
        documentNumbering: 0
    })
    const [slipNo, setSlipNo] = useState(0)
    const [disableWeighing, setDisableWeighing] = useState(false)
    const [forceWeighing, setForceWeighing] = useState(false)

    // Get other items when mount component
    useEffect(() => {
        if (updateStayingTruck !== '') {
            setIsUpdatingStayingTruck(true)
        } else if (updateMeasurementData !== '') {
            setIsUpdatingMeasurementData(true)
        }
        // Get setttings
        getItemsName()
        getOperationSetting()
        getMaxSlipNo()
        
    }, [])

    // Get realtime OS time
    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            setCurrentTime(now.getHours() + ":" + now.getMinutes())
        })
    }, [currentTime])

    // Get Staying trucks list from database
    useEffect(() => {
        getStayingTrucks();
    }, [stayingTrucks])

    socket.on("readWeight", data => {
        setWeight(Number(data.weight).toFixed(0))
    })

    // Read Weight value from indicator
    useEffect(() => {
        setDisableWeighing(weighingOperationSetting.weighingStartWeight > weight ? true : false)
    }, [weight])

    // Handle onChange when change input value
    const handleChange = e => {
        const { name, value } = e.target;
        setWeightData({ ...weightData, [name]: value })
    }

    // Handle onClick when click to input to select Master data
    const handleOnClick = async (e, itemName, itemCode) => {
        setItemName(itemName)
        setInputName(e.target.name)
        setInputCode(itemCode)
        setModal(!modal)
    }

    // Select item to popup modal when click to master data input
    const handleSelectItem = (selectedItem) => {
        const { code, name } = selectedItem;
        setWeightData({ ...weightData, [inputName]: name, [inputCode]: code })
    }

    // Handle button Cancel Weighing
    const handleCancelWeighing = () => {
        setDisableWeighing(weighingOperationSetting.weighingStartWeight > weight ? true : false)
        setForceWeighing(false)
        setIsUpdating(false)
        setWeightData(initialWeight)
        setIsUpdating(false)
        setIsUpdatingMeasurementData(false)
        setIsUpdatingStayingTruck(false)
    }

    // Get Staying Cars list
    const getStayingTrucks = async () => {
        try {
            const { data } = await axios.get("/weighing/stayingtruck")
            setStayingTrucks(data)
        } catch (error) {

        }
    }
    // Start weighing
    const createWeighing = async (weight) => {
        try {
            const { data } = await axios.post("/weighing", weight)
            setStayingTrucks([...stayingTrucks, data])
        } catch (error) {

        }
    }

    const updateWeighing = (item) => {
        setWeightData(item)
    }

    // Handle event for button Start/Complete Weighing
    const handleCompleteWeighing = async (e) => {
        e.preventDefault();

        if (isUpdating) {
            Object.assign(weightData, { slipNo: slipNo, numberingType: weighingOperationSetting.slipNoStart, emptyTime: currentTime, emptyWeight: weight, correctionNet: Number(Math.abs(weight - weightData.grossWeight)).toFixed(0) })
            try {
                await axios.put(`/weighing/${weightData._id}`, weightData)
                setStayingTrucks(stayingTrucks.filter(truck => truck._id !== weightData._id))
                setIsUpdating(false)
                setPrintData(weightData)
                setPrintModal(!printModal)
            } catch (error) {

            }
        } else if (isUpdatingStayingTruck) {
            try {
                await axios.put(`/weighing/${weightData._id}`, weightData)
                setIsUpdatingStayingTruck(false)
            } catch (error) {

            }
        } else if (isUpdatingMeasurementData) {
            Object.assign(weightData, { edited: true, correctionNet: Number(Math.abs(weightData.emptyWeight - weightData.grossWeight)).toFixed(0) })
            await axios.put(`/weighing/${weightData._id}`, weightData)
            setIsUpdatingMeasurementData(false)
        } else {
            Object.assign(weightData, { grossWeight: weight, grossTime: currentTime, emptyWeight: null })
            createWeighing(weightData)
        }
        setWeightData(initialWeight)
    }

    // Get item list [Master Data]
    const getItemsName = async () => {
        try {
            const { data } = await axios.get(`/setting/itemoperationsetting`)
            setItemOperation(data[0])
        } catch (error) {
        }
    }

    const getOperationSetting = async () => {
        try {
            const { data } = await axios.get(`/setting/operationsetting`)
            Object.assign(weighingOperationSetting, data[0].weighingOperationSetting)
        } catch (error) {
        }
    }

    // ==== Functions for get & set SlipNo setting from OperationSetting
    const getMaxSlipNo = async () => {
        try {
            const { data } = await axios.get('/weighing/getmaxslipno')
            setSlipNo(data)
        } catch (error) {
        }
    }
    // ====
    const handleAutocomplete = async (e, item, itemName) => {
        const { name, value } = e.target;
        setWeightData({ ...weightData, [name]: value })
        if (value === '') {
            setWeightData({ ...weightData, [name]: value, [itemName]: '' })
        } else {
            try {
                const { data } = await axios.get(`/${item}/${value}`)
                if (data.length > 0) {
                    setWeightData({ ...weightData, [name]: value, [itemName]: data[0].name })
                }
            } catch (error) {
            }
        }

    }

    const loadTruckMasterData = async (e) => {
        setWeightData({
            ...weightData,
            truckNumber: e.target.value,
            brandName: "",
            brandCode: "",
            vendor: "",
            vendorCode: "",
            destination: "",
            destinationCode: "",
            other: "",
            otherCode: ""
        })
        try {
            const { data } = await axios.get(`/truck/${e.target.value}`)
            if (data.length > 0) {
                setWeightData({
                    ...weightData,
                    truckNumber: data[0].truckNumber,
                    brandName: data[0].brandName,
                    brandCode: data[0].brandCode,
                    vendor: data[0].vendor,
                    vendorCode: data[0].vendorCode,
                    destination: data[0].destination,
                    destinationCode: data[0].destinationCode,
                    other: data[0].other,
                    otherCode: data[0].otherCode
                })
            }
        } catch (error) {
        }
    }

    return (
        <div>
            <Row>
                <Col sm={12} xl={6} className="mb-2">
                    <Card>
                        <CardHeader>
                            <b>Weighing</b>
                            <h5 style={{ display: weightData.edited ? '' : 'none' }} className="float-right m-0">
                                <Badge color="warning">Edited</Badge>
                            </h5>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleCompleteWeighing}>
                                <fieldset disabled={disableWeighing && forceWeighing === false}>
                                    <FormGroup row style={{ display: itemOperation.item1.display ? '' : 'none' }}  >
                                        <Label for="truckNumber" sm={4}>{itemOperation.item1.name}:</Label>
                                        <Col sm={3}>
                                            <Input type="text" name="truckNumber"
                                                tabIndex='1'
                                                required={itemOperation.item1.require ? true : false}
                                                value={weightData.truckNumber}
                                                onChange={loadTruckMasterData} />
                                        </Col>
                                        <Label for="slipNo" sm={3}>Slip No:</Label>
                                        <Col sm={2}>
                                            <Input type="text" name="slipNo"
                                                disabled={isUpdatingMeasurementData || isUpdatingStayingTruck ? false : true}
                                                value={weightData.slipNo}
                                                onChange={handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row style={{ display: itemOperation.item2.display ? '' : 'none' }}  >
                                        <Label for="brandName" sm={4}>{itemOperation.item2.name}:</Label>
                                        <Col xs={4} sm={3}>
                                            <Input type="text" name="brandCode"
                                                tabIndex='2'
                                                maxLength={3}
                                                value={weightData.brandCode}
                                                onChange={e => handleAutocomplete(e, 'brand', 'brandName')}
                                            />
                                        </Col>
                                        <Col xs={8} sm={5}>
                                            <Input type="text" name="brandName"
                                                required={itemOperation.item2.require ? true : false}
                                                value={weightData.brandName}
                                                onClick={(e) => handleOnClick(e, 'Brand', 'brandCode')}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row style={{ display: itemOperation.item3.display ? '' : 'none' }}  >
                                        <Label for="vendor" sm={4}>{itemOperation.item3.name}:</Label>
                                        <Col xs={4} sm={3}>
                                            <Input type="text" name="vendorCode" tabIndex='3'
                                                maxLength={3}
                                                value={weightData.vendorCode}
                                                onChange={e => handleAutocomplete(e, 'vendor', 'vendor')}
                                            />
                                        </Col>
                                        <Col xs={8} sm={5}>
                                            <Input type="text" name="vendor"
                                                required={itemOperation.item3.require ? true : false}
                                                value={weightData.vendor}
                                                onClick={(e) => handleOnClick(e, 'Vendor', 'vendorCode')}
                                                onChange={handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row style={{ display: itemOperation.item4.display ? '' : 'none' }}  >
                                        <Label for="destination" sm={4}>{itemOperation.item4.name}:</Label>
                                        <Col xs={4} sm={3}>
                                            <Input type="text" name="destinationCode" tabIndex='4'
                                                maxLength={3}
                                                value={weightData.destinationCode}
                                                onChange={e => handleAutocomplete(e, 'destination', 'destination')}
                                            />
                                        </Col>
                                        <Col xs={8} sm={5}>
                                            <Input type="text" name="destination"
                                                required={itemOperation.item4.require ? true : false}
                                                value={weightData.destination}
                                                onClick={(e) => handleOnClick(e, 'Destination', 'destinationCode')}
                                                onChange={handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row style={{ display: itemOperation.item5.display ? '' : 'none' }}  >
                                        <Label for="other" sm={4}>{itemOperation.item5.name}:</Label>
                                        <Col xs={4} sm={3}>
                                            <Input type="text" name="otherCode" tabIndex='5'
                                                maxLength={3}
                                                value={weightData.otherCode}
                                                onChange={e => handleAutocomplete(e, 'other', 'other')}
                                            />
                                        </Col>
                                        <Col xs={8} sm={5}>
                                            <Input type="text" name="other"
                                                required={itemOperation.item5.require ? true : false}
                                                value={weightData.other}
                                                onClick={(e) => handleOnClick(e, 'Other', 'otherCode')}
                                                onChange={handleChange} />
                                        </Col>
                                    </FormGroup>
                                    {/* <FormGroup row style={{ display: itemOperation.item6.display ? '' : 'none' }}>
                                        <Label for="other_2" sm={2}>{itemOperation.item6.name}:</Label>
                                        <Col sm={8}>
                                            <Input type="text" name="other_2"
                                                value={weightData.other}
                                                onClick={(e) => handleOnClick(e, 'Other_2')}
                                                onChange={handleChange} />
                                        </Col>
                                    </FormGroup> */}
                                    <FormGroup row  >
                                        <Label for="grossWeight" sm={4}>Truck In:</Label>
                                        <Col xs={4} sm={3}>
                                            <Input type="text" name="grossTime"
                                                value={isUpdating ? weightData.grossTime : (isUpdatingStayingTruck ? weightData.grossTime : (isUpdatingMeasurementData ? weightData.grossTime : currentTime))}
                                                onChange={handleChange} />
                                        </Col>
                                        <Col xs={8} sm={5}>
                                            <Input type="number" name="grossWeight"
                                                value={isUpdating ? weightData.grossWeight : (isUpdatingStayingTruck ? weightData.grossWeight : (isUpdatingMeasurementData ? weightData.grossWeight : weight))}
                                                onChange={handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row  >
                                        <Label for="emptyWeight" sm={4}>Truck Out:</Label>
                                        <Col xs={4} sm={3}>
                                            <Input type="text" name="emptyTime"
                                                value={isUpdating ? currentTime : (isUpdatingStayingTruck ? '' : (isUpdatingMeasurementData ? weightData.emptyTime : weightData.emptyTime))}
                                                onChange={handleChange} />
                                        </Col>
                                        <Col xs={8} sm={5}>
                                            <Input type="number" name="emptyWeight"
                                                value={isUpdating ? weight : (isUpdatingStayingTruck ? 0 : (isUpdatingMeasurementData ? weightData.emptyWeight : 0))}
                                                onChange={handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row  >
                                        <Label for="correctionNet" sm={4}>Net Weight:</Label>
                                        <Col sm={{ size: 5, offset: 3 }}>
                                            <Input type="number" name="correctionNet"
                                                value={isUpdating ? Number(Math.abs(weight - weightData.grossWeight)).toFixed(0) :
                                                    (isUpdatingStayingTruck ? 0 :
                                                        (isUpdatingMeasurementData ? Number(Math.abs(weightData.emptyWeight - weightData.grossWeight)).toFixed(0) : 0))}
                                                onChange={handleChange} />
                                        </Col>
                                    </FormGroup>
                                </fieldset>
                                <FormGroup row>
                                    <Col md={{ size: 6, offset: 4 }} xl={{ size: 6, offset: 4 }}>
                                        <Button color="primary" className="mr-2"
                                            style={{ display: disableWeighing && !forceWeighing ? '' : 'none' }}
                                            onClick={() => {
                                                setDisableWeighing(false);
                                                setForceWeighing(true)
                                            }}>Force Weighing</Button>
                                        <Button color="primary" type="submit" className="mr-2"
                                            style={{ display: disableWeighing && !forceWeighing ? 'none' : '' }}>
                                            {isUpdating ? 'Complete' : (isUpdatingStayingTruck ? 'Update' : (isUpdatingMeasurementData ? 'Update' : 'Start'))}</Button>
                                        <Button color="primary" className="mr-2" style={{ display: isUpdatingMeasurementData ? "" : "none" }} onClick={() => {
                                            setPrintModal(!printModal)
                                            setPrintData(weightData)
                                            // console.log(weightData)
                                        }}>Print</Button>
                                        <Button color="secondary" onClick={handleCancelWeighing}
                                            style={{ display: disableWeighing && !forceWeighing ? 'none' : '' }}>Cancel</Button>
                                    </Col>

                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                    <IndicatorStatus />
                </Col>

                <Col sm={12} xl={6}>
                    <Card >
                        <CardHeader><b>Staying trucks list</b></CardHeader>
                        <CardBody>
                            <Table bordered hover responsive className="dataTable">
                                <thead>
                                    <tr>
                                        <th>Truck Number</th>
                                        <th>Vendor</th>
                                        {/* <th>Weight (kg)</th> */}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stayingTrucks.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.truckNumber}</td>
                                                <td>{item.vendorCode} - {item.vendor}</td>
                                                {/* <td>{item.grossWeight}</td> */}
                                                <td style={{ minWidth: '110px' }}>
                                                    <Button
                                                        className="mr-2" color="warning" size="sm"
                                                        disabled={disableWeighing && !forceWeighing}
                                                        onClick={() => {
                                                            setIsUpdating(true)
                                                            updateWeighing(item)

                                                        }}>
                                                        <FontAwesomeIcon icon={faEdit} />{' '}Select
                                                        </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Data modal */}
            <DataModal modal={modal} toggle={() => setModal(!modal)} itemName={itemName} onSelect={handleSelectItem} />
            <PrintModal modal={printModal} toggle={() => setPrintModal(!printModal)} data={printData} />
        </div>
    )
}

export default Weighing
