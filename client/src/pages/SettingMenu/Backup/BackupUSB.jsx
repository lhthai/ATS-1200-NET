import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  CardText,
  Progress,
} from 'reactstrap'

const BackupUSB = ({
  handleSubmit,
  backupDestination,
  setBackupDestination,
  drives,
  isUSBLoading,
}) => {
  return (
    <Row>
      <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
        <Card>
          <CardBody>
            <CardTitle>
              <b>Backup data to USB drive</b>
            </CardTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Label for="backupDestination" sm={4} xl={3}>
                  Destination:
                </Label>
                <Col sm={8} xl={6}>
                  <Input
                    type="select"
                    value={backupDestination}
                    name="backupDestination"
                    onChange={e => setBackupDestination(e.target.value)}
                  >
                    <option>---- Select drive ----</option>
                    {drives.map(drive => {
                      return (
                        <option
                          key={drive.device}
                          value={drive.mountpoints[0].path}
                        >
                          {drive.description}
                        </option>
                      )
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={12} className="my-2">
                  <CardText>
                    <b>1. Select the backup drive in &quot;Destination&quot;</b>
                  </CardText>
                  <CardText>
                    Drives are removable storages such as USB flash drive
                  </CardText>
                  <CardText>
                    <b>2. Click the Backup to USB button to start backup</b>
                  </CardText>
                  <CardText>
                    The data to be backed up is weighing data, master data and
                    setting data
                  </CardText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={12}>
                  {isUSBLoading ? (
                    <div>
                      <Progress
                        animated
                        color="info"
                        value="100"
                        className="my-1"
                      />
                      <CardText>
                        <b>Backing up...Please wait a few seconds!</b>
                      </CardText>
                    </div>
                  ) : (
                    <Button type="submit" color="primary">
                      Backup to USB
                    </Button>
                  )}
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
BackupUSB.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  backupDestination: PropTypes.string.isRequired,
  setBackupDestination: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  drives: PropTypes.array.isRequired,
  isUSBLoading: PropTypes.bool.isRequired,
}
export default BackupUSB
