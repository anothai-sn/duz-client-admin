import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Animal_type_create_component = ({ show, onClose, createType, onInputChange, onCreate }) => (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create Animal Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formCreateType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type="text"
                        value={createType}
                        onChange={onInputChange}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Close
            </Button>
            <Button variant="primary" onClick={onCreate}>
                Create
            </Button>
        </Modal.Footer>
    </Modal>
);

export default Animal_type_create_component;
