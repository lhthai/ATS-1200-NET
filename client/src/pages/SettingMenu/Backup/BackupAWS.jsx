import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Progress,
} from 'reactstrap'

const BackupAWS = ({ isAWSLoading, handleUploadAWS }) => {
  return (
    <Row className="my-3">
      <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
        <Card>
          <CardBody>
            <CardTitle>
              <b>Backup data to AWS</b>
            </CardTitle>
            <Row>
              <Col sm={12} className="my-2">
                <CardText>
                  This option will backup your weighing data, master data and
                  setting data to AWS
                </CardText>
                {isAWSLoading ? (
                  <div>
                    <Progress
                      animated
                      color="info"
                      value="100"
                      className="my-1"
                    />
                    <CardText>
                      <b>Uploading data to AWS...Please wait a few seconds!</b>
                    </CardText>
                  </div>
                ) : (
                  <Button color="primary" onClick={handleUploadAWS}>
                    Backup to AWS
                  </Button>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

BackupAWS.propTypes = {
  isAWSLoading: PropTypes.bool.isRequired,
  handleUploadAWS: PropTypes.func.isRequired,
}

export default BackupAWS
