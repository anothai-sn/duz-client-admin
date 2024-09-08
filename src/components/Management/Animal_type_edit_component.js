import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Animal_type_edit_component = ({ show, onClose, newType, onInputChange, onSave }) => (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Animal Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type="text"
                        value={newType}
                        onChange={onInputChange}
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

export default Animal_type_edit_component;
