import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Input,
} from 'reactstrap'

import {
  getWeighingOperationSetting,
  updateWeighingOperationSetting,
} from '../../actions/setting/weighingOperationSettingActions'

const initialState = {
  _id: '',
  maintenanceDataUpload: {
    isEnabling: false,
    uploadInterval: 0,
  },
}
const MaintenanceDataUpload = () => {
  const opearationSetting = useSelector(
    state => state.weighingOperationSetting.payload,
  )
  const dispatch = useDispatch()
  const [item, setItem] = useState(initialState)

  useEffect(() => {
    dispatch(getWeighingOperationSetting())
  }, [dispatch])

  useEffect(() => {
    setItem(opearationSetting)
  }, [opearationSetting])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateWeighingOperationSetting(item))
  }

  return (
    <div>
      <Row>
        <Col xs={12} md={{ size: 8, offset: 2 }}>
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup row>
                  <Label xs={12} xl={6}>
                    <b>Maintenance Data Upload:</b>
                  </Label>
                  <Col xs={12} xl={6}>
                    <div className="d-flex mt-1">
                      <CustomInput
                        checked={item.maintenanceDataUpload.isEnabling === true}
                        type="radio"
                        id="rdButton1"
                        className="mr-3"
                        onChange={() =>
                          setItem({
                            ...item,
                            maintenanceDataUpload: {
                              ...item.maintenanceDataUpload,
                              isEnabling: true,
                            },
                          })
                        }
                        label="Enable"
                      />
                      <CustomInput
                        checked={
                          item.maintenanceDataUpload.isEnabling === false
                        }
                        type="radio"
                        id="rdButton2"
                        label="Disable"
                        onChange={() =>
                          setItem({
                            ...item,
                            maintenanceDataUpload: {
                              ...item.maintenanceDataUpload,
                              isEnabling: false,
                            },
                          })
                        }
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label xs={12} xl={6}>
                    <b>Upload interval:</b>
                  </Label>
                  <Col xs={12} xl={6}>
                    <div className="d-flex mt-1">
                      <Input
                        type="number"
                        max={60}
                        min={1}
                        className="mr-2 w-50"
                        value={item.maintenanceDataUpload.uploadInterval || 0}
                        disabled={!item.maintenanceDataUpload.isEnabling}
                        onChange={e =>
                          setItem({
                            ...item,
                            maintenanceDataUpload: {
                              ...item.maintenanceDataUpload,
                              uploadInterval: e.target.value,
                            },
                          })
                        }
                      />
                      <p className="mt-1">(1 ~ 60 min)</p>
                    </div>
                  </Col>
                </FormGroup>
                <Row>
                  <Col xs={12} xl={{ size: 6, offset: 6 }}>
                    <Button color="primary" type="submit">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default MaintenanceDataUpload
