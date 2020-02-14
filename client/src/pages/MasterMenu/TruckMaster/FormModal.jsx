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
import axios from "axios";

import DataModal from "./DataModal";

function FormModal(props) {
  const clearItem = {
    truckNumber: "",
    brandName: "",
    brandCode: "",
    vendor: "",
    vendorCode: "",
    destination: "",
    destinationCode: "",
    other: "",
    otherCode: "",
    emptyWeight: 0,
    maximumWeight: 0
  };
  const [item, setItem] = useState(props.currentItem);
  const [modal, setModal] = useState(false);
  const [itemName, setItemName] = useState("brand"); // This is a trick to prevent 404 not found error when load this modal
  const [inputName, setInputName] = useState("");
  const [inputCode, setInputCode] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (props.isEditing) {
      setItem(props.currentItem);
    } else {
      setItem(clearItem);
    }
  }, [props]);

  const validateForm = () => {
    return item.truckNumber.length > 0;
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

  const handleOnClick = async (e, item, code) => {
    setItemName(item);
    setInputName(e.target.name);
    setInputCode(code);
    toggle();
  };

  const handleSelectItem = selectedItem => {
    const { code, name } = selectedItem;
    setItem({ ...item, [inputName]: name, [inputCode]: code });
  };

  const handleKeypress = e => {
    if (e.key === "Enter") handleSubmit(e);
  };

  const handleAutocomplete = async (e, itemValue, itemName) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
    if (value === "") {
      setItem({ ...item, [name]: value, [itemName]: "" });
    } else {
      try {
        const { data } = await axios.get(`/${itemValue}/${value}`);
        if (data.length > 0) {
          setItem({ ...item, [name]: value, [itemName]: data[0].name });
        }
      } catch (error) {}
    }
  };

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>
          {props.isEditing ? "Update " : "Create New "}
          {props.itemName}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="truckNumber" sm={4}>
                Truck Number:
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="truckNumber"
                  value={item.truckNumber}
                  tabIndex={1}
                  onChange={handleChange}
                  onKeyPress={handleKeypress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="brandName" sm={4}>
                Brand Name:
              </Label>
              <Col xs={4} sm={3}>
                <Input
                  type="text"
                  name="brandCode"
                  value={item.brandCode}
                  maxLength="3"
                  tabIndex={2}
                  onChange={e => handleAutocomplete(e, "brand", "brandName")}
                  onKeyPress={handleKeypress}
                />
              </Col>
              <Col xs={8} sm={5}>
                <Input
                  type="text"
                  name="brandName"
                  value={item.brandName}
                  onClick={e => handleOnClick(e, "Brand", "brandCode")}
                  onChange={handleChange}
                  onKeyPress={handleKeypress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="vendor" sm={4}>
                Vendor:
              </Label>
              <Col xs={4} sm={3}>
                <Input
                  type="text"
                  name="vendorCode"
                  value={item.vendorCode}
                  maxLength="3"
                  tabIndex={3}
                  onChange={e => handleAutocomplete(e, "vendor", "vendor")}
                  onKeyPress={handleKeypress}
                />
              </Col>
              <Col xs={8} sm={5}>
                <Input
                  type="text"
                  name="vendor"
                  value={item.vendor}
                  onClick={e => handleOnClick(e, "Vendor", "vendorCode")}
                  onChange={handleChange}
                  onKeyPress={handleKeypress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="destination" sm={4}>
                Destination:
              </Label>
              <Col xs={4} sm={3}>
                <Input
                  type="text"
                  name="destinationCode"
                  maxLength="3"
                  value={item.destinationCode}
                  tabIndex={4}
                  onChange={e =>
                    handleAutocomplete(e, "destination", "destination")
                  }
                  onKeyPress={handleKeypress}
                />
              </Col>
              <Col xs={8} sm={5}>
                <Input
                  type="text"
                  name="destination"
                  value={item.destination}
                  onClick={e =>
                    handleOnClick(e, "Destination", "destinationCode")
                  }
                  onChange={handleChange}
                  onKeyPress={handleKeypress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="other" sm={4}>
                Other:
              </Label>
              <Col xs={4} sm={3}>
                <Input
                  type="text"
                  name="otherCode"
                  maxLength="3"
                  value={item.otherCode}
                  tabIndex={5}
                  onChange={e => handleAutocomplete(e, "other", "other")}
                  onKeyPress={handleKeypress}
                />
              </Col>
              <Col xs={8} sm={5}>
                <Input
                  type="text"
                  name="other"
                  value={item.other}
                  onClick={e => handleOnClick(e, "Other", "otherCode")}
                  onChange={handleChange}
                  onKeyPress={handleKeypress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="emptyWeight" sm={5}>
                Empty Weight:
              </Label>
              <Col sm={7}>
                <Input
                  type="number"
                  name="emptyWeight"
                  value={item.emptyWeight}
                  onChange={handleChange}
                  tabIndex={6}
                  onKeyPress={handleKeypress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="maximumWeight" sm={5}>
                Maximum Weight:
              </Label>
              <Col sm={7}>
                <Input
                  type="number"
                  name="maximumWeight"
                  value={item.maximumWeight}
                  onChange={handleChange}
                  tabIndex={7}
                  onKeyPress={handleKeypress}
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

      {/* Data modal */}
      <DataModal
        modal={modal}
        toggle={toggle}
        itemName={itemName}
        onSelect={handleSelectItem}
      />
    </div>
  );
}

export default FormModal;
