import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, CardText, Progress } from 'reactstrap';
import Message from '../../components/Message'

import socket from '../../socket'

function Backup() {
    const [backupDestination, setBackupDestination] = useState("")
    const [drives, setDrives] = useState([])
    const [isUSBLoading, setIsUSBLoading] = useState(false)
    const [isAWSLoading, setIsAWSLoading] = useState(false)
    const [message, setMessage] = useState({ type: "", show: false, content: "" })

    const getDrives = async () => {
        try {
            const { data } = await axios.get(`/setting/getusbdrives`)
            setDrives(data)
        } catch (error) {

        }
    }

    const showAlert = () => {
        setMessage({ ...message, show: true })
        setTimeout(() => {
            setMessage({ ...message, show: false })
        }, 3000);
    }


    useEffect(() => {
        getDrives()

        socket.on('backupComplete', () => {
            setIsUSBLoading(false)
            Object.assign(message, { type: "success", content: "Backup successfully!" })
            showAlert()
        })

        socket.on('backupError', () => {
            setIsUSBLoading(false)
            Object.assign(message, { type: "error", content: "Something went wrong! Please try again!" })
        })

        socket.on('uploadAWSDone', () => {
            setIsAWSLoading(false)
            Object.assign(message, { type: "success", content: "Uploading data to AWS successfully!" })
            showAlert()
        })

        socket.on('uploadAWSError', () => {
            setIsAWSLoading(false)
            Object.assign(message, { type: "error", content: "Something went wrong! Please try again!" })
        })
    }, [])


    const handleSubmit = e => {
        e.preventDefault();
        if (backupDestination !== '') {
            setIsUSBLoading(true)
            socket.emit("startBackup", backupDestination);
        } else {
            setMessage({ type: 'error', show: true, content: 'Please choose a USB drive!' })
        }
    }

    const handleUploadAWS = () => {
        setIsAWSLoading(true)
        socket.emit("startUploadAWS");
    }

    return (
        <div>
            <Row>
                <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }} className="mt-2">
                    <Message type={message.type} show={message.show} content={message.content} />
                </Col>

                <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardBody>
                            <CardTitle><b>Backup data to USB drive</b></CardTitle>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Label for="backupDestination" sm={4} xl={3}>Destination:</Label>
                                    <Col sm={8} xl={6}>
                                        <Input type="select" value={backupDestination} name="backupDestination"
                                            onChange={e => setBackupDestination(e.target.value)}>
                                            <option>---- Select drive ----</option>
                                            {drives.map((drive, index) => {
                                                return <option key={index} value={drive.mountpoints[0].path}>{drive.description}</option>
                                            })}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={12} className="my-2">
                                        <CardText><b>1. Select the backup drive in "Destination"</b></CardText>
                                        <CardText>Drives are removable storages such as USB flash drive</CardText>
                                        <CardText><b>2. Click the Backup to USB button to start backup</b></CardText>
                                        <CardText>The data to be backed up is weighing data, master data and setting data</CardText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={12}>
                                        {isUSBLoading ? <div><Progress animated color="info" value="100" className="my-1" />
                                            <CardText><b>Backing up...Please wait a few seconds!</b></CardText></div> :
                                            <Button type="submit" color="primary">Backup to USB</Button>}
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row className="my-3">
                <Col lg={{ size: 10, offset: 1 }} xl={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardBody>
                            <CardTitle><b>Backup data to AWS</b></CardTitle>
                            <Row>
                                <Col sm={12} className="my-2">
                                    <CardText>This option will backup your weighing data, master data and setting data to AWS</CardText>
                                    {isAWSLoading ? <div><Progress animated color="info" value="100" className="my-1" />
                                        <CardText><b>Uploading data to AWS...Please wait a few seconds!</b></CardText></div> :
                                        <Button color="primary" onClick={handleUploadAWS}>Backup to AWS</Button>}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Backup
