import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Table, Spinner } from 'reactstrap';
import Message from '../../components/Message'

function ItemOperationSetting() {
    const initialState = {
        item1: {
            name: "",
            display: true,
            require: true
        },
        item2: {
            name: "",
            display: true,
            require: true
        },
        item3: {
            name: "",
            display: true,
            require: true
        },
        item4: {
            name: "",
            display: true,
            require: true
        },
        item5: {
            name: "",
            display: true,
            require: true
        },
        item6: {
            name: "",
            display: true,
            require: true
        },
    }
    const [signal, setSignal] = useState(true)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [itemOperation, setItemOperation] = useState(initialState)
    const [message, setMessage] = useState({ type: "", show: false, content: "" })

    useEffect(() => {
        getItemsName()

    }, [])

    const getItemsName = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(`/setting/itemoperationsetting`)
            if (signal) {
                setItemOperation(data[0])
                setIsLoading(false)
            }
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }

    const updateItemOperationSetting = async () => {
        try {
            const { data } = await axios.put(`/setting/itemoperationsetting/${itemOperation._id}`, itemOperation)
            setItemOperation(data)
            setMessage({ type: 'success', show: true, content: "Settings are updated successfully!" })
        } catch (error) {
            setError(error)
            setMessage({ type: 'error', show: true, content: "Something went wrong! Please try again!" })
        }
    }

    return (
        <div>
            {isLoading && !error ? (<div className="animated fadeIn pt-3 text-center"><Spinner color="secondary" /></div>)
                : error ? (<Message show={true} content="Failed to load data!" type="error" />)
                    : (<Row>
                        <Col lg={6} xl={6}>
                            <Card className="mb-2">
                                <CardBody>
                                    <CardTitle><b>Items name</b></CardTitle>
                                    <Form>
                                        <FormGroup row>
                                            <Label for="item1" xs={5}>Item 1 name:</Label>
                                            <Col xs={7}>
                                                <Input type="text" name="item1"
                                                    value={itemOperation.item1.name}
                                                    onChange={e => setItemOperation({ ...itemOperation, item1: { ...itemOperation.item1, name: e.target.value } })}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="item2" xs={5}>Item 2 name:</Label>
                                            <Col xs={7}>
                                                <Input type="text" name="item2"
                                                    value={itemOperation.item2.name}
                                                    onChange={e => setItemOperation({ ...itemOperation, item2: { ...itemOperation.item2, name: e.target.value } })}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="item3" xs={5}>Item 3 name:</Label>
                                            <Col xs={7}>
                                                <Input type="text" name="item3"
                                                    value={itemOperation.item3.name}
                                                    onChange={e => setItemOperation({ ...itemOperation, item3: { ...itemOperation.item3, name: e.target.value } })}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="item4" xs={5}>Item 4 name:</Label>
                                            <Col xs={7}>
                                                <Input type="text" name="item4"
                                                    value={itemOperation.item4.name}
                                                    onChange={e => setItemOperation({ ...itemOperation, item4: { ...itemOperation.item4, name: e.target.value } })}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="item5" xs={5}>Item 5 name:</Label>
                                            <Col xs={7}>
                                                <Input type="text" name="item5"
                                                    value={itemOperation.item5.name}
                                                    onChange={e => setItemOperation({ ...itemOperation, item5: { ...itemOperation.item5, name: e.target.value } })}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="item6" xs={5}>Item 6 name:</Label>
                                            <Col xs={7}>
                                                <Input type="text" name="item6"
                                                    value={itemOperation.item6.name}
                                                    onChange={e => setItemOperation({ ...itemOperation, item6: { ...itemOperation.item6, name: e.target.value } })}
                                                />
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={12} xl={10}>
                            <Message show={message.show} type={message.type} content={message.content} />
                            <Card>
                                <CardBody>
                                    <CardTitle><b>Item usage conditions</b></CardTitle>
                                    <Table bordered responsive>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>{itemOperation.item1.name}</th>
                                                <th>{itemOperation.item2.name}</th>
                                                <th>{itemOperation.item3.name}</th>
                                                <th>{itemOperation.item4.name}</th>
                                                <th>{itemOperation.item5.name}</th>
                                                <th>{itemOperation.item6.name}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Use this item</th>
                                                <td style={{ minWidth: '100px' }}>
                                                    <Input type="select" value={itemOperation.item1.display}
                                                        onChange={e => setItemOperation({ ...itemOperation, item1: { ...itemOperation.item1, display: e.target.value } })} >
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                                <td style={{ minWidth: '100px' }}>
                                                    <Input type="select" value={itemOperation.item2.display}
                                                        onChange={e => setItemOperation({ ...itemOperation, item2: { ...itemOperation.item2, display: e.target.value } })}>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                                <td style={{ minWidth: '100px' }}>
                                                    <Input type="select" value={itemOperation.item3.display}
                                                        onChange={e => setItemOperation({ ...itemOperation, item3: { ...itemOperation.item3, display: e.target.value } })}>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                                <td style={{ minWidth: '100px' }}>
                                                    <Input type="select" value={itemOperation.item4.display}
                                                        onChange={e => setItemOperation({ ...itemOperation, item4: { ...itemOperation.item4, display: e.target.value } })} >
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                                <td style={{ minWidth: '100px' }}>
                                                    <Input type="select" value={itemOperation.item5.display}
                                                        onChange={e => setItemOperation({ ...itemOperation, item5: { ...itemOperation.item5, display: e.target.value } })}>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                                <td style={{ minWidth: '100px' }}>
                                                    <Input type="select" value={itemOperation.item6.display}
                                                        onChange={e => setItemOperation({ ...itemOperation, item6: { ...itemOperation.item6, display: e.target.value } })}>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Required</th>
                                                <td>
                                                    <Input type="select" value={itemOperation.item1.require}
                                                        onChange={e => setItemOperation({ ...itemOperation, item1: { ...itemOperation.item1, require: e.target.value } })}>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                                <td>
                                                    <Input type="select" value={itemOperation.item2.require}
                                                        onChange={e => setItemOperation({ ...itemOperation, item2: { ...itemOperation.item2, require: e.target.value } })}>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                                <td>
                                                    <Input type="select" value={itemOperation.item3.require}
                                                        onChange={e => setItemOperation({ ...itemOperation, item3: { ...itemOperation.item3, require: e.target.value } })}>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                                <td>
                                                    <Input type="select" value={itemOperation.item4.require}
                                                        onChange={e => setItemOperation({ ...itemOperation, item4: { ...itemOperation.item4, require: e.target.value } })}>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                                <td>
                                                    <Input type="select" value={itemOperation.item5.require}
                                                        onChange={e => setItemOperation({ ...itemOperation, item5: { ...itemOperation.item5, require: e.target.value } })}>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                                <td>
                                                    <Input type="select" value={itemOperation.item6.require}
                                                        onChange={e => setItemOperation({ ...itemOperation, item6: { ...itemOperation.item6, require: e.target.value } })}>
                                                        <option value={true}>Yes</option>
                                                        <option value={false}>No</option>
                                                    </Input>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>)}

            <Row>
                <Col xs={12} lg="11" className="my-3">
                    <Button color="primary" onClick={updateItemOperationSetting}>Update</Button>
                </Col>
            </Row>
        </div>
    )
}

export default ItemOperationSetting
