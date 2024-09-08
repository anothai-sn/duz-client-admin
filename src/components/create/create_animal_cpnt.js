import React, { Component } from 'react';
import './create_animal_cpnt.css'; 

export default class CreateAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      animalName: '',
      animalImage: '',
      animalType: '',
      description: {
        behavior: '',
        habitat: '',
        breeding: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const [field, subfield] = name.split('.');

    if (subfield) {
      this.setState(prevState => ({
        [field]: {
          ...prevState[field],
          [subfield]: value
        }
      }));
    } else {
      this.setState({ [field]: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Form data submitted:', this.state);
    // Here you would typically send the data to a server
  }

  render() {
    return (
      <div className="form-container">
        <h1>Create Animal</h1>
        <form className="animal-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              ID:
              <input
                type="text"
                name="id"
                value={this.state.id}
                onChange={this.handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Animal Name:
              <input
                type="text"
                name="animalName"
                value={this.state.animalName}
                onChange={this.handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Animal Image URL:
              <input
                type="text"
                name="animalImage"
                value={this.state.animalImage}
                onChange={this.handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Animal Type:
              <input
                type="text"
                name="animalType"
                value={this.state.animalType}
                onChange={this.handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <h2>Description</h2>
            <label>
              Behavior:
              <input
                type="text"
                name="description.behavior"
                value={this.state.description.behavior}
                onChange={this.handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Habitat:
              <input
                type="text"
                name="description.habitat"
                value={this.state.description.habitat}
                onChange={this.handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Breeding:
              <input
                type="text"
                name="description.breeding"
                value={this.state.description.breeding}
                onChange={this.handleChange}
                className="form-control"
              />
            </label>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    );
  }
}
