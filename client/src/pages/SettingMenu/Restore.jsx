import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Progress,
} from 'reactstrap';
import { toast } from 'react-toastify';
import { getUSBDrives } from '../../actions/setting/backupActions';

import socket from '../../helpers/socket';

const Restore = () => {
  const drives = useSelector(state => state.backup.payload);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [restoreDestination, setRestoreDestination] = useState('');
  const [restoreItem, setRestoreItem] = useState({
    setting: false,
    data: false,
  });

  useEffect(() => {
    dispatch(getUSBDrives());
  }, [dispatch]);

  useEffect(() => {
    socket.on('dataNotFound', () => {
      setIsLoading(false);
      toast.error('Cannot found data to restore!');
    });
    socket.on('restoreComplete', () => {
      setIsLoading(false);
      toast.success('Restore successfully!');
    });
    socket.on('restoreError', () => {
      setIsLoading(false);
      toast.error('Some thing went wrong! Please try again!');
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    socket.emit('startRestore', {
      path: restoreDestination,
      item: restoreItem,
    });
  };

  return (
    <div>
      <Row>
        <Col lg={{ size: 8, offset: 2 }} xl={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <CardTitle>
                <b>Restore</b>
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup row>
                  <Label for="restoreDestination" lg={4}>
                    Destination:
                  </Label>
                  <Col lg={8}>
                    <Input
                      type="select"
                      value={restoreDestination}
                      name="restoreDestination"
                      onChange={e => setRestoreDestination(e.target.value)}
                    >
                      <option>---- Select drive ----</option>
                      {drives.map(drive => {
                        return (
                          <option
                            key={drive.device}
                            value={`${drive.mountpoints[0].path}/ats-1200`}
                          >
                            {drive.description}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup tag="fieldset" row>
                  <Col lg={12} className="my-2">
                    <CardText>
                      <b>Restore items</b>
                    </CardText>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          onChange={e =>
                            setRestoreItem({
                              ...restoreItem,
                              data: e.target.checked,
                            })
                          }
                        />{' '}
                        Restore weighing data
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          onChange={e =>
                            setRestoreItem({
                              ...restoreItem,
                              setting: e.target.checked,
                            })
                          }
                        />{' '}
                        Restore settings
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col lg={12}>
                    {isLoading ? (
                      <div>
                        <Progress
                          animated
                          color="info"
                          value="100"
                          className="my-1"
                        />
                        <CardText>
                          <b>Restoring...Please wait a few seconds!</b>
                        </CardText>
                      </div>
                    ) : (
                      <Button type="submit" color="primary">
                        Start Restore
                      </Button>
                    )}
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Restore;
