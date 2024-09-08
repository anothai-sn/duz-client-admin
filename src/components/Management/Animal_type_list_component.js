import React from 'react';
import { Table, Button } from 'react-bootstrap';

const Animal_type_list_component = ({ data, onEdit, onDelete, onCreateClick }) => (
    <div>
        <h2>Animal Type List</h2>
        <Button variant="primary" onClick={onCreateClick}>Create New Type</Button>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.type}</td>
                        <td>
                            <Button variant="outline-primary" onClick={() => onEdit(item)}>Edit</Button>{' '}
                            <Button variant="outline-danger" onClick={() => onDelete(item.id)}>Delete</Button>{' '}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
);

export default Animal_type_list_component;
