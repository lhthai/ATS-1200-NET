import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
} from 'reactstrap'
import { getItemsOperationSetting } from '../../actions/setting/itemOperationSettingActions'
import {
  updateWeighing,
  getMaxSlipNo,
  updateStayingTruck,
  createStayingTrucks,
} from '../../actions/weighingActions'
import { getWeighingOperationSetting } from '../../actions/setting/weighingOperationSettingActions'
import {
  autoCompleteMasterData,
  autoCompleteTruckMasterData,
} from '../../helpers/autoComplete'
import { updateMeasurementDataList } from '../../actions/measurementDataListActions'
import DataModal from '../MasterMenu/TruckMaster/DataModal'
import socket from '../../helpers/socket'
import PrintModal from '../../components/PrintModal'
import IndicatorStatus from './IndicatorStatus'
import StayingTrucks from './StayingTrucks'
import MasterDataInput from './MasterDataInput'

const initialState = {
  _id: '',
  slipNo: 0,
  numberingType: 0,
  truckNumber: '',
  brandCode: '',
  brand: '',
  vendorCode: '',
  vendor: '',
  destinationCode: '',
  destination: '',
  otherCode: '',
  other: '',
  emptyWeight: null,
  emptyTime: '',
  grossWeight: 0,
  grossTime: '',
  correctionNet: 0,
  edited: false,
}

const Weighing = ({ location }) => {
  const { updatingStayingTruck, updatingMeasurementData } = location
  const [currentTime, setCurrentTime] = useState('')
  const dispatch = useDispatch()
  const [weightData, setWeightData] = useState(
    (updatingStayingTruck && updatingStayingTruck.weighing) ||
      (updatingMeasurementData && updatingMeasurementData.weighing) ||
      initialState,
  )
  const [weight, setWeight] = useState(0)

  // Declare things for modal Select Master data
  const [openModal, setOpenModal] = useState(false)
  const [printModal, setPrintModal] = useState(false)
  const [printData, setPrintData] = useState({})
  const [masterItem, setMasterItem] = useState('brand') // ===> This is a trick to prevent 404 not found error when load modal

  const [isUpdating, setIsUpdating] = useState(false) // ==> For update weightData when Truck Out
  const [isUpdatingStayingTruck, setIsUpdatingStayingTruck] = useState(false) // ==> For update item from Staying Truck List
  const [isUpdatingMeasurementData, setIsUpdatingMeasurementData] = useState(
    false,
  ) // ==> For update item from Measurement Data List

  // Declare settings
  // Naming label of the Master items input
  const itemOperation = useSelector(state => state.itemOperationSetting.payload)
  const weighingOperationSetting = useSelector(
    state => state.weighingOperationSetting.payload,
  )
  const slipNo = useSelector(state => state.weighing.maxSlipNo)
  const [disableWeighing, setDisableWeighing] = useState(false)
  const [forceWeighing, setForceWeighing] = useState(false)

  // Get other items when mount component
  useEffect(() => {
    if (updatingStayingTruck) {
      setIsUpdatingStayingTruck(true)
    } else if (updatingMeasurementData) {
      setIsUpdatingMeasurementData(true)
    }
  }, [updatingMeasurementData, updatingStayingTruck])

  // Get realtime OS time
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const hour = now.getHours()
      const min = now.getMinutes()

      setCurrentTime(
        `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`,
      )
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  // Get Staying trucks list from database
  useEffect(() => {
    dispatch(getItemsOperationSetting())
    dispatch(getMaxSlipNo())
    dispatch(getWeighingOperationSetting())
  }, [dispatch])

  socket.on('readWeight', data => {
    setWeight(Number(data.weight).toFixed(0))
  })

  // Read Weight value from indicator
  useEffect(() => {
    setDisableWeighing(
      weighingOperationSetting.weighingOperationSetting.weighingStartWeight >
        weight,
    )
  }, [
    weighingOperationSetting.weighingOperationSetting.weighingStartWeight,
    weight,
  ])

  // Handle onChange when change input value
  const handleChange = e => {
    const { name, value } = e.target
    setWeightData({ ...weightData, [name]: value })
  }

  // Handle onClick when click to input to select Master data
  const handleOnClick = item => {
    setMasterItem(item)
    setOpenModal(!openModal)
  }

  // Select item to popup modal when click to master data input
  const handleSelectItem = selectedItem => {
    const { code, name } = selectedItem
    const inputName = masterItem
    const inputCode = `${masterItem}Code`
    setWeightData({ ...weightData, [inputName]: name, [inputCode]: code })
  }

  // Handle button Cancel Weighing
  const handleCancelWeighing = () => {
    setDisableWeighing(
      weighingOperationSetting.weighingOperationSetting.weighingStartWeight >
        weight,
    )
    setForceWeighing(false)
    setIsUpdating(false)
    setWeightData(initialState)
    setIsUpdating(false)
    setIsUpdatingMeasurementData(false)
    setIsUpdatingStayingTruck(false)
  }

  // Handle event for button Start/Complete Weighing
  const handleCompleteWeighing = async e => {
    e.preventDefault()

    if (isUpdating) {
      Object.assign(weightData, {
        slipNo,
        numberingType: weighingOperationSetting.slipNoStart,
        emptyTime: currentTime,
        emptyWeight: weight,
        correctionNet: Number(
          Math.abs(weight - weightData.grossWeight),
        ).toFixed(0),
      })
      dispatch(updateWeighing(weightData))
      setIsUpdating(false)
      setPrintData(weightData)
      setPrintModal(!printModal)
    } else if (isUpdatingStayingTruck) {
      dispatch(updateStayingTruck(weightData))
      setIsUpdatingStayingTruck(false)
    } else if (isUpdatingMeasurementData) {
      Object.assign(weightData, {
        edited: true,
        correctionNet: Number(
          Math.abs(weightData.emptyWeight - weightData.grossWeight),
        ).toFixed(0),
      })
      dispatch(updateMeasurementDataList(weightData))
      setIsUpdatingMeasurementData(false)
    } else {
      Object.assign(weightData, {
        grossWeight: weight,
        grossTime: currentTime,
        emptyWeight: null,
      })
      dispatch(createStayingTrucks(weightData))
    }
    setWeightData(initialState)
  }
  return (
    <div>
      <Row>
        <Col sm={12} xl={6} className="mb-2">
          <Card>
            <CardHeader>
              <b>Weighing</b>
              <h5
                style={{ display: weightData.edited ? '' : 'none' }}
                className="float-right m-0"
              >
                <Badge color="warning">Edited</Badge>
              </h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleCompleteWeighing}>
                <fieldset disabled={disableWeighing && forceWeighing === false}>
                  <FormGroup
                    row
                    style={{
                      display: itemOperation.item1.display ? '' : 'none',
                    }}
                  >
                    <Label for="truckNumber" sm={4}>
                      {itemOperation.item1.name}:
                    </Label>
                    <Col sm={3}>
                      <Input
                        type="text"
                        name="truckNumber"
                        required={!!itemOperation.item1.require}
                        value={weightData.truckNumber}
                        onChange={e =>
                          autoCompleteTruckMasterData(
                            e,
                            weightData,
                            setWeightData,
                            initialState,
                          )
                        }
                      />
                    </Col>
                    <Label for="slipNo" sm={3}>
                      Slip No:
                    </Label>
                    <Col sm={2}>
                      <Input
                        type="text"
                        name="slipNo"
                        disabled={
                          !(isUpdatingMeasurementData || isUpdatingStayingTruck)
                        }
                        value={weightData.slipNo}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <MasterDataInput
                    display={itemOperation.item2.display || false}
                    required={itemOperation.item2.require || false}
                    labelName={itemOperation.item2.name || ''}
                    codeName="brandCode"
                    codeValue={weightData.brandCode}
                    dataName="brand"
                    dataValue={weightData.brand}
                    handleAutoComplete={e =>
                      autoCompleteMasterData(
                        e,
                        'brand',
                        weightData,
                        setWeightData,
                      )
                    }
                    handleOnclick={() => handleOnClick('brand')}
                    handleChange={handleChange}
                  />
                  <MasterDataInput
                    display={itemOperation.item3.display || false}
                    required={itemOperation.item3.require || false}
                    labelName={itemOperation.item3.name || ''}
                    codeName="vendorCode"
                    codeValue={weightData.vendorCode}
                    dataName="vendor"
                    dataValue={weightData.vendor}
                    handleAutoComplete={e =>
                      autoCompleteMasterData(
                        e,
                        'vendor',
                        weightData,
                        setWeightData,
                      )
                    }
                    handleOnclick={() => handleOnClick('vendor')}
                    handleChange={handleChange}
                  />
                  <MasterDataInput
                    display={itemOperation.item4.display || false}
                    required={itemOperation.item4.require || false}
                    labelName={itemOperation.item4.name || ''}
                    codeName="destinationCode"
                    codeValue={weightData.destinationCode}
                    dataName="destination"
                    dataValue={weightData.destination}
                    handleAutoComplete={e =>
                      autoCompleteMasterData(
                        e,
                        'destination',
                        weightData,
                        setWeightData,
                      )
                    }
                    handleOnclick={() => handleOnClick('destination')}
                    handleChange={handleChange}
                  />
                  <MasterDataInput
                    display={itemOperation.item5.display || false}
                    required={itemOperation.item5.require || false}
                    labelName={itemOperation.item5.name || ''}
                    codeName="otherCode"
                    codeValue={weightData.otherCode}
                    dataName="other"
                    dataValue={weightData.other}
                    handleAutoComplete={e =>
                      autoCompleteMasterData(
                        e,
                        'other',
                        weightData,
                        setWeightData,
                      )
                    }
                    handleOnclick={() => handleOnClick('other')}
                    handleChange={handleChange}
                  />
                  <FormGroup row>
                    <Label for="grossWeight" sm={4}>
                      Truck In:
                    </Label>
                    <Col xs={4} sm={3}>
                      <Input
                        type="text"
                        name="grossTime"
                        value={
                          isUpdating ||
                          isUpdatingStayingTruck ||
                          isUpdatingStayingTruck
                            ? weightData.grossTime
                            : currentTime
                        }
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs={8} sm={5}>
                      <Input
                        type="number"
                        name="grossWeight"
                        value={
                          isUpdating ||
                          isUpdatingStayingTruck ||
                          isUpdatingMeasurementData
                            ? weightData.grossWeight
                            : weight
                        }
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="emptyWeight" sm={4}>
                      Truck Out:
                    </Label>
                    <Col xs={4} sm={3}>
                      <Input
                        type="text"
                        name="emptyTime"
                        value={
                          (isUpdating && currentTime) ||
                          (isUpdatingStayingTruck && '') ||
                          (isUpdatingMeasurementData && weightData.emptyTime) ||
                          weightData.emptyTime
                        }
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs={8} sm={5}>
                      <Input
                        type="number"
                        name="emptyWeight"
                        value={
                          (isUpdating && weight) ||
                          (isUpdatingStayingTruck && 0) ||
                          (isUpdatingMeasurementData &&
                            weightData.emptyWeight) ||
                          0
                        }
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="correctionNet" sm={4}>
                      Net Weight:
                    </Label>
                    <Col sm={{ size: 5, offset: 3 }}>
                      <Input
                        type="number"
                        name="correctionNet"
                        value={
                          (isUpdating &&
                            Number(
                              Math.abs(weight - weightData.grossWeight),
                            ).toFixed(0)) ||
                          (isUpdatingStayingTruck && 0) ||
                          (isUpdatingMeasurementData &&
                            Number(
                              Math.abs(
                                weightData.emptyWeight - weightData.grossWeight,
                              ),
                            ).toFixed(0)) ||
                          0
                        }
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                </fieldset>
                <FormGroup row>
                  <Col md={{ size: 6, offset: 4 }} xl={{ size: 6, offset: 4 }}>
                    <Button
                      color="primary"
                      className="mr-2"
                      style={{
                        display:
                          disableWeighing && !forceWeighing ? '' : 'none',
                      }}
                      onClick={() => {
                        setDisableWeighing(false)
                        setForceWeighing(true)
                      }}
                    >
                      Force Weighing
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      className="mr-2"
                      style={{
                        display:
                          disableWeighing && !forceWeighing ? 'none' : '',
                      }}
                    >
                      {(isUpdating && 'Complete') ||
                        ((isUpdatingStayingTruck ||
                          isUpdatingMeasurementData) &&
                          'Update') ||
                        'Start'}
                    </Button>
                    <Button
                      color="primary"
                      className="mr-2"
                      style={{
                        display: isUpdatingMeasurementData ? '' : 'none',
                      }}
                      onClick={() => {
                        setPrintModal(!printModal)
                        setPrintData(weightData)
                      }}
                    >
                      Print
                    </Button>
                    <Button
                      color="secondary"
                      onClick={handleCancelWeighing}
                      style={{
                        display:
                          disableWeighing && !forceWeighing ? 'none' : '',
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
          <IndicatorStatus />
        </Col>

        <StayingTrucks
          disableWeighing={disableWeighing}
          forceWeighing={forceWeighing}
          setIsUpdating={setIsUpdating}
          updateWeighing={item => setWeightData(item)}
        />
      </Row>

      {/* Data modal */}
      <DataModal
        modal={openModal}
        toggle={() => setOpenModal(!openModal)}
        masterItem={masterItem}
        onSelect={handleSelectItem}
      />
      <PrintModal
        modal={printModal}
        toggle={() => setPrintModal(!printModal)}
        data={printData}
      />
    </div>
  )
}

Weighing.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    updatingStayingTruck: PropTypes.shape({
      weighing: PropTypes.shape(initialState),
    }),
    updatingMeasurementData: PropTypes.shape({
      weighing: PropTypes.shape(initialState),
    }),
  }).isRequired,
}

export default Weighing
