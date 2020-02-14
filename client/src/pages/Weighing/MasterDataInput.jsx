import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label, Col, Input } from 'reactstrap'

const MasterDataInput = ({
  display,
  required,
  labelName,
  codeName,
  codeValue,
  dataName,
  dataValue,
  handleAutoComplete,
  handleOnclick,
  handleChange,
}) => {
  return (
    <FormGroup
      row
      style={{
        display: display ? '' : 'none',
      }}
    >
      <Label for={dataName} sm={4}>
        {labelName}:
      </Label>
      <Col xs={4} sm={3}>
        <Input
          type="text"
          name={codeName}
          maxLength={3}
          value={codeValue}
          onChange={handleAutoComplete}
        />
      </Col>
      <Col xs={8} sm={5}>
        <Input
          type="text"
          name={dataName}
          required={!!required}
          value={dataValue}
          onClick={handleOnclick}
          onChange={handleChange}
        />
      </Col>
    </FormGroup>
  )
}

MasterDataInput.propTypes = {
  display: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  labelName: PropTypes.string.isRequired,
  codeName: PropTypes.string.isRequired,
  codeValue: PropTypes.string.isRequired,
  dataName: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
  handleAutoComplete: PropTypes.func.isRequired,
  handleOnclick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default MasterDataInput
