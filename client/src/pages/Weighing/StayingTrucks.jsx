import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Card, CardBody, CardHeader, Table, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { getStayingTrucks } from '../../actions/weighingActions'

const StayingTrucks = ({
  disableWeighing,
  forceWeighing,
  setIsUpdating,
  updateWeighing,
}) => {
  const stayingTrucks = useSelector(state => state.weighing.stayingTrucks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStayingTrucks())
  }, [dispatch])

  return (
    <Col sm={12} xl={6}>
      <Card>
        <CardHeader>
          <b>Staying trucks list</b>
        </CardHeader>
        <CardBody>
          <Table bordered hover responsive className="dataTable">
            <thead>
              <tr>
                <th>Truck Number</th>
                <th>Vendor</th>
                {/* <th>Weight (kg)</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stayingTrucks.map(item => {
                return (
                  <tr key={item._id}>
                    <td>{item.truckNumber}</td>
                    <td>
                      {item.vendorCode} - {item.vendor}
                    </td>
                    {/* <td>{item.grossWeight}</td> */}
                    <td style={{ minWidth: '110px' }}>
                      <Button
                        className="mr-2"
                        color="warning"
                        size="sm"
                        disabled={disableWeighing && !forceWeighing}
                        onClick={() => {
                          setIsUpdating(true)
                          updateWeighing(item)
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Select
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  )
}
StayingTrucks.propTypes = {
  disableWeighing: PropTypes.bool.isRequired,
  forceWeighing: PropTypes.bool.isRequired,
  setIsUpdating: PropTypes.func.isRequired,
  updateWeighing: PropTypes.func.isRequired,
}
export default StayingTrucks
