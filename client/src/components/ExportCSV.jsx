import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.csv'

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'csv', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }

  return (
    <Button color="success" className="mb-2" onClick={exportToCSV}>
      <FontAwesomeIcon icon={faDownload} /> Export CSV
    </Button>
  )
}

ExportCSV.propTypes = {
  csvData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: '',
      code: '',
      name: '',
    }),
  ).isRequired,
  fileName: PropTypes.string.isRequired,
}

export default ExportCSV
