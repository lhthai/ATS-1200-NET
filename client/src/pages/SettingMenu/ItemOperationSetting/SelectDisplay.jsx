import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

const SelectDisplay = ({ name, value, handleChange }) => {
  return (
    <td style={{ minWidth: '100px' }}>
      <Input type="select" name={name} value={value} onChange={handleChange}>
        <option value>Yes</option>
        <option value={false}>No</option>
      </Input>
    </td>
  )
}

SelectDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
}
export default SelectDisplay
