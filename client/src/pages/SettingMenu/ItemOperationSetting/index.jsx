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
  Table,
  Spinner,
} from 'reactstrap'
import {
  getItemsOperationSetting,
  updateItemsOperationSetting,
} from '../../../actions/setting/itemOperationSettingActions'

import InputName from './InputName'
import SelectDisplay from './SelectDisplay'
import SelectRequired from './SelectRequired'

const initialState = {
  _id: '',
  item1: {
    name: '',
    display: true,
    require: true,
  },
  item2: {
    name: '',
    display: true,
    require: true,
  },
  item3: {
    name: '',
    display: true,
    require: true,
  },
  item4: {
    name: '',
    display: true,
    require: true,
  },
  item5: {
    name: '',
    display: true,
    require: true,
  },
  item6: {
    name: '',
    display: true,
    require: true,
  },
}
const ItemOperationSetting = () => {
  const isLoading = useSelector(state => state.itemOperationSetting.isLoading)
  const itemOperation = useSelector(state => state.itemOperationSetting.payload)
  const dispatch = useDispatch()
  const [item, setItem] = useState(initialState)

  useEffect(() => {
    dispatch(getItemsOperationSetting())
  }, [dispatch])

  useEffect(() => {
    setItem(itemOperation)
  }, [itemOperation])

  const handleChangeItemName = e => {
    const { name, value } = e.target
    setItem({
      ...item,
      [name]: {
        ...item[name],
        name: value,
      },
    })
  }

  const handleChangeItemDisplay = e => {
    const { name, value } = e.target
    setItem({
      ...item,
      [name]: {
        ...item[name],
        display: value,
      },
    })
  }

  const handleChangeItemRequired = e => {
    const { name, value } = e.target
    setItem({
      ...item,
      [name]: {
        ...item[name],
        require: value,
      },
    })
  }

  const renderSelectDisplay = []
  const renderSelectRequired = []
  const renderInputName = []
  for (let i = 1; i <= 6; i += 1) {
    renderInputName.push(
      <InputName
        key={i}
        label={`Item ${i} name:`}
        name={`item${i}`}
        value={item[`item${i}`].name || ''}
        handleChange={handleChangeItemName}
      />,
    )
    renderSelectDisplay.push(
      <SelectDisplay
        key={i}
        name={`item${i}`}
        value={item[`item${i}`].display || false}
        handleChange={handleChangeItemDisplay}
      />,
    )
    renderSelectRequired.push(
      <SelectRequired
        key={i}
        name={`item${i}`}
        value={item[`item${i}`].require || false}
        handleChange={handleChangeItemRequired}
      />,
    )
  }
  return (
    <div>
      {isLoading ? (
        <div className="animated fadeIn pt-3 text-center">
          <Spinner color="secondary" />
        </div>
      ) : (
        <Row>
          <Col lg={6} xl={6}>
            <Card className="mb-2">
              <CardBody>
                <CardTitle>
                  <b>Items name</b>
                </CardTitle>
                <Form>{renderInputName}</Form>
              </CardBody>
            </Card>
          </Col>
          <Col lg={12} xl={10}>
            <Card>
              <CardBody>
                <CardTitle>
                  <b>Item usage conditions</b>
                </CardTitle>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th />
                      <th>{item.item1.name}</th>
                      <th>{item.item2.name}</th>
                      <th>{item.item3.name}</th>
                      <th>{item.item4.name}</th>
                      <th>{item.item5.name}</th>
                      <th>{item.item6.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Use this item</th>
                      {renderSelectDisplay}
                    </tr>
                    <tr>
                      <th>Required</th>
                      {renderSelectRequired}
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      <Row>
        <Col xs={12} lg="11" className="my-3">
          <Button
            color="primary"
            onClick={() => dispatch(updateItemsOperationSetting(item))}
          >
            Update
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default ItemOperationSetting
