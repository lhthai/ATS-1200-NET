import React, { useState, useEffect } from 'react'
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
} from 'reactstrap'
import { getItemsOperationSetting } from '../actions/setting/itemOperationSettingActions'
import { createWeighing, getMaxSlipNo } from '../actions/weighingActions'
import {
  autoCompleteMasterData,
  autoCompleteTruckMasterData,
} from '../helpers/autoComplete'
import DataModal from './MasterMenu/TruckMaster/DataModal'

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
  emptyWeight: 0,
  emptyTime: '',
  grossWeight: 0,
  grossTime: '',
  correctionNet: 0,
}
const ManualWeighing = () => {
  const now = new Date()
  const [currentTime] = useState(`${now.getHours()}:${now.getMinutes()}`)
  const itemOperation = useSelector(state => state.itemOperationSetting.payload)
  const maxSlipNo = useSelector(state => state.weighing.maxSlipNo)
  const dispatch = useDispatch()
  const [weightData, setWeightData] = useState(initialState)

  // Declare things for openModal Select Master data
  const [openModal, setOpenModal] = useState(false)
  const [masterItem, setMasterItem] = useState('brand') // ===> This is a trick to prevent 404 not found error when load openModal

  useEffect(() => {
    dispatch(getItemsOperationSetting())
    dispatch(getMaxSlipNo())
  }, [dispatch])

  const handleChange = e => {
    const { name, value } = e.target
    setWeightData({ ...weightData, [name]: value })
  }

  // Handle onClick when click to input to select Master data
  const handleOnClick = item => {
    setMasterItem(item)
    setOpenModal(!openModal)
  }

  const handleSelectItem = selectedItem => {
    const { code, name } = selectedItem
    const inputName = masterItem
    const inputCode = `${masterItem}Code`
    setWeightData({ ...weightData, [inputName]: name, [inputCode]: code })
  }

  // Handle event for button Start/Complete Weighing
  const handleCompleteWeighing = async e => {
    e.preventDefault()
    if (weightData.emptyTime === '') {
      Object.assign(weightData, { emptyTime: currentTime })
    }
    const netWeight = Number(
      Math.abs(weightData.emptyWeight - weightData.grossWeight),
    ).toFixed(0)
    Object.assign(weightData, {
      correctionNet: netWeight,
      slipNo: maxSlipNo,
    })
    dispatch(createWeighing(weightData))
    setWeightData(initialState)
  }

  return (
    <div>
      <Row>
        <Col sm={12} xl={6}>
          <Card>
            <CardHeader>
              <b>Weighing</b>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleCompleteWeighing}>
                <fieldset>
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
                        value={weightData.slipNo}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup
                    row
                    style={{
                      display: itemOperation.item2.display ? '' : 'none',
                    }}
                  >
                    <Label for="brand" sm={4}>
                      {itemOperation.item2.name}:
                    </Label>
                    <Col xs={4} sm={3}>
                      <Input
                        type="text"
                        name="brandCode"
                        value={weightData.brandCode}
                        onChange={e =>
                          autoCompleteMasterData(
                            e,
                            'brand',
                            weightData,
                            setWeightData,
                          )
                        }
                      />
                    </Col>
                    <Col xs={8} sm={5}>
                      <Input
                        type="text"
                        name="brand"
                        required={!!itemOperation.item2.require}
                        value={weightData.brand}
                        onClick={() => handleOnClick('brand')}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup
                    row
                    style={{
                      display: itemOperation.item3.display ? '' : 'none',
                    }}
                  >
                    <Label for="vendor" sm={4}>
                      {itemOperation.item3.name}:
                    </Label>
                    <Col xs={4} sm={3}>
                      <Input
                        type="text"
                        name="vendorCode"
                        value={weightData.vendorCode}
                        onChange={e =>
                          autoCompleteMasterData(
                            e,
                            'vendor',
                            weightData,
                            setWeightData,
                          )
                        }
                      />
                    </Col>
                    <Col xs={8} sm={5}>
                      <Input
                        type="text"
                        name="vendor"
                        required={!!itemOperation.item3.require}
                        value={weightData.vendor}
                        onClick={() => handleOnClick('vendor')}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup
                    row
                    style={{
                      display: itemOperation.item4.display ? '' : 'none',
                    }}
                  >
                    <Label for="destination" sm={4}>
                      {itemOperation.item4.name}:
                    </Label>
                    <Col xs={4} sm={3}>
                      <Input
                        type="text"
                        name="destinationCode"
                        value={weightData.destinationCode}
                        onChange={e =>
                          autoCompleteMasterData(
                            e,
                            'destination',
                            weightData,
                            setWeightData,
                          )
                        }
                      />
                    </Col>
                    <Col xs={8} sm={5}>
                      <Input
                        type="text"
                        name="destination"
                        required={!!itemOperation.item4.require}
                        value={weightData.destination}
                        onClick={() => handleOnClick('destination')}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup
                    row
                    style={{
                      display: itemOperation.item5.display ? '' : 'none',
                    }}
                  >
                    <Label for="other" sm={4}>
                      {itemOperation.item5.name}:
                    </Label>
                    <Col xs={4} sm={3}>
                      <Input
                        type="text"
                        name="otherCode"
                        value={weightData.otherCode}
                        onChange={e =>
                          autoCompleteMasterData(
                            e,
                            'other',
                            weightData,
                            setWeightData,
                          )
                        }
                      />
                    </Col>
                    <Col xs={8} sm={5}>
                      <Input
                        type="text"
                        name="other"
                        required={!!itemOperation.item5.require}
                        value={weightData.other}
                        onClick={() => handleOnClick('other')}
                        onChange={handleChange}
                      />
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
                  <FormGroup row>
                    <Label for="grossWeight" sm={4}>
                      Truck In:
                    </Label>
                    <Col xs={4} sm={3}>
                      <Input
                        type="text"
                        name="grossTime"
                        value={weightData.grossTime}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs={8} sm={5}>
                      <Input
                        type="number"
                        name="grossWeight"
                        value={weightData.grossWeight}
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
                        value={weightData.emptyTime}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs={8} sm={5}>
                      <Input
                        type="number"
                        name="emptyWeight"
                        value={weightData.emptyWeight}
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
                        value={Number(
                          Math.abs(
                            weightData.emptyWeight - weightData.grossWeight,
                          ),
                        ).toFixed(0)}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                </fieldset>
                <Col sm={{ size: 7, offset: 4 }}>
                  <Button color="primary" type="submit">
                    Complete
                  </Button>
                  <Button
                    color="secondary"
                    className="ml-2"
                    onClick={() => setWeightData(initialState)}
                  >
                    Cancel
                  </Button>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* Data openModal */}
      <DataModal
        modal={openModal}
        toggle={() => setOpenModal(!openModal)}
        masterItem={masterItem}
        onSelect={handleSelectItem}
      />
    </div>
  )
}

export default ManualWeighing
