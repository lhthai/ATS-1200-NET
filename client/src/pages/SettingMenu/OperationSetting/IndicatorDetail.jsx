import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

const IndicatorDetail = ({
  showIndicator,
  baudRate,
  parity,
  dataBits,
  stopBits,
  handleChange,
}) => {
  return (
    <Col lg={4} xl={6}>
      <Card style={{ display: showIndicator ? '' : 'none' }}>
        <CardBody>
          <CardTitle>
            <b>Indicator settings</b>
          </CardTitle>
          <Form>
            <FormGroup row>
              <Label for="item1" xs={6} lg={12} xl={4}>
                Baud Rate:
              </Label>
              <Col xs={6} lg={12} xl={4}>
                <Input
                  type="select"
                  name="baudRate"
                  value={baudRate}
                  onChange={handleChange}
                >
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
              <Label for="item1" xs={6} lg={12} xl={4}>
                Parity:
              </Label>
              <Col xs={6} lg={12} xl={4}>
                <Input
                  type="select"
                  name="parity"
                  value={parity}
                  onChange={handleChange}
                >
                  <option value="none">None</option>
                  <option value="even">Even</option>
                  <option value="odd">Odd</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="item1" xs={6} lg={12} xl={4}>
                Data bits:
              </Label>
              <Col xs={6} lg={12} xl={4}>
                <Input
                  type="select"
                  name="dataBits"
                  value={dataBits}
                  onChange={handleChange}
                >
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="item1" xs={6} lg={12} xl={4}>
                Stop bits:
              </Label>
              <Col xs={6} lg={12} xl={4}>
                <Input
                  type="select"
                  name="stopBits"
                  value={stopBits}
                  onChange={handleChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </Input>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

IndicatorDetail.propTypes = {
  showIndicator: PropTypes.bool.isRequired,
  baudRate: PropTypes.number.isRequired,
  parity: PropTypes.string.isRequired,
  dataBits: PropTypes.number.isRequired,
  stopBits: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default IndicatorDetail
