import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditAnimalModal = ({
  show,
  onClose,
  animalName,
  place,
  description,
  typeId,
  animalTypes,
  onInputChange,
  onTypeChange,
  onFileChange,  // ฟังก์ชันใหม่สำหรับจัดการไฟล์
  onSave
}) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Animal</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formAnimalName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="newAnimalName"
            value={animalName}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPlace">
          <Form.Label>Place</Form.Label>
          <Form.Control
            type="text"
            name="newPlace"
            value={place}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="newDescription"
            value={description}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            value={typeId}
            onChange={onTypeChange}
          >
            <option value="">Select Type</option>
            {animalTypes.map(type => (
              <option key={type.id} value={type.id}>{type.type}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formImages">
          <Form.Label>Images (select multiple files)</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={onFileChange}  // ใช้ฟังก์ชันใหม่ในการจัดการไฟล์
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
      <Button variant="primary" onClick={onSave}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default EditAnimalModal;
