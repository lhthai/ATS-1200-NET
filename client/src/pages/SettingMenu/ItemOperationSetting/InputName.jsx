import React from 'react'
import PropTypes from 'prop-types'
import { Col, FormGroup, Label, Input } from 'reactstrap'

const InputName = ({ label, name, value, handleChange }) => {
  return (
    <FormGroup row>
      <Label for="item1" xs={5}>
        {label}
      </Label>
      <Col xs={7}>
        <Input type="text" name={name} value={value} onChange={handleChange} />
      </Col>
    </FormGroup>
  )
}
InputName.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}
export default InputName
