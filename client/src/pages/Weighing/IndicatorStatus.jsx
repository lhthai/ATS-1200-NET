import React, { useEffect, useState } from 'react'
import { Alert } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'
import socket from '../../helpers/socket'

const IndicatorStatus = () => {
  const [indicatorReady, setIndicatorReady] = useState(false)
  const [printerReady, setPrinterReady] = useState(false)

  useEffect(() => {
    socket.on('readWeight', data => {
      if (data.weight) {
        setIndicatorReady(true)
      } else {
        setIndicatorReady(false)
      }
    })
    socket.on('printerReady', isReady => {
      if (isReady) {
        setPrinterReady(true)
      } else {
        setPrinterReady(false)
      }
    })
    socket.on('indicatorDisconnected', () => setIndicatorReady(false))
  }, [])

  return (
    <div>
      {indicatorReady ? (
        <Alert className="mt-2" color="success">
          <FontAwesomeIcon icon={faCheckCircle} /> Indicator is ready to use!
        </Alert>
      ) : (
        <Alert className="mt-2" color="danger">
          <FontAwesomeIcon icon={faExclamationCircle} /> Indicator is not ready.
          Please check again!
        </Alert>
      )}
      {printerReady ? (
        <Alert className="mt-2" color="success">
          <FontAwesomeIcon icon={faCheckCircle} /> Printer is ready to use!
        </Alert>
      ) : (
        <Alert className="mt-2" color="danger">
          <FontAwesomeIcon icon={faExclamationCircle} /> Printer is not ready.
          Please check again!
        </Alert>
      )}
    </div>
  )
}

export default IndicatorStatus
