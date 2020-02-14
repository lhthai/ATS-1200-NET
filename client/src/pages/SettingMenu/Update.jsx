import React, { useState, useEffect } from 'react'
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Progress,
  Jumbotron,
} from 'reactstrap'
import { toast } from 'react-toastify'
import socket from '../../helpers/socket'

const Update = () => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    socket.on('updateComplete', () => {
      socket.emit('restartServer')
      setTimeout(() => {
        setIsLoading(false)
        toast.success('Success! Please refresh browser to apply changes')
      }, 4000)
    })
    socket.on('updateError', () => {
      setIsLoading(false)
      toast.error('Something went wrong! Please contact IT support.')
    })
  }, [])

  const onUpdate = () => {
    setIsLoading(true)
    socket.emit('startUpdate')
  }

  return (
    <div>
      <Row>
        <Col lg={{ size: 8, offset: 2 }}>
          <Card>
            <CardBody>
              <CardTitle>
                <b>Software Update:</b>
              </CardTitle>
              <Jumbotron>
                <ul>
                  <li>
                    Click <b>Update</b> button to install latest update{' '}
                    <b>(Internet connection is required)</b>
                  </li>
                  <li>
                    Update process will took a few minutes. Do not refresh
                    browser until it complete.
                  </li>
                </ul>
              </Jumbotron>
              {isLoading ? (
                <div>
                  <Progress
                    animated
                    color="info"
                    value="100"
                    className="my-1"
                  />
                  <CardText>
                    <b>Updating...Please wait a few minutes!</b>
                  </CardText>
                </div>
              ) : (
                <Button color="primary" onClick={onUpdate}>
                  Update
                </Button>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Update
