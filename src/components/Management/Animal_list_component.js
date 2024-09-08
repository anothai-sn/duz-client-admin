import React from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';

const AnimalListComponent = ({ animals, loading, error, onEdit, onDelete, onCreateClick }) => {
  return (
    <div>
      <h2>Animal List</h2>
      <Button variant="primary" onClick={onCreateClick}>Create New Animal</Button>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Place</th>
            <th>Description</th>
            <th>Type</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.animalName}</td>
              <td>{animal.place}</td>
              <td>{animal.description}</td>
              <td>{animal.animalType ? animal.animalType.type : 'Unknown'}</td>
              <td>
                {animal.animalImages.map((image, index) => (
                  <div key={index}>
                    <img src={image.url} alt="animal" />
                  </div>
                ))}
              </td>
              <td>
                <Button variant="outline-primary" onClick={() => onEdit(animal)}>Edit</Button>{' '}
                <Button variant="outline-danger" onClick={() => onDelete(animal.id)}>Delete</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AnimalListComponent;