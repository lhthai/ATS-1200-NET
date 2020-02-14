import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";

function FormModal(props) {
  const clearItem = { code: "", name: "" };
  const [item, setItem] = useState(props.currentItem);

  useEffect(() => {
    if (props.isEditing) {
      setItem(props.currentItem);
    } else {
      setItem(clearItem);
    }
  }, [props]);

  const validateForm = () => {
    return item.code.length > 0 && item.name.length > 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!props.isEditing) {
      props.addItem(item);
    } else {
      props.editItem(item._id, item);
      props.setIsEditing(false);
    }
    setItem(clearItem);
    props.toggle();
  };

  return (
    <Modal isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>
        {props.isEditing ? "Update " : "Create New "}
        {props.itemName}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup row>
            <Label for="code" sm={2}>
              Code:
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="code"
                maxLength={3}
                value={item.code}
                onChange={handleChange}
                placeholder="Code"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="name" sm={2}>
              Name:
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="name"
                value={item.name}
                onChange={handleChange}
                placeholder="Name"
                onKeyPress={e => {
                  if (e.key === "Enter") handleSubmit(e);
                }}
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="mr-2"
          onClick={handleSubmit}
          disabled={!validateForm()}
        >
          {props.isEditing ? "Update" : "Create"}
        </Button>
        <Button color="secondary" onClick={() => props.toggle()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default FormModal;
