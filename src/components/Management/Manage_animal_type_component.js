import React, { Component } from 'react';
import axios from 'axios';
import Animal_type_list_component from './Animal_type_list_component';
import Animal_type_edit_component from './Animal_type_edit_component';
import Animal_type_create_component from './Animal_type_create_component';

class Manage_animal_type_component extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            showModal: false,
            showCreateModal: false,
            editItem: null,
            newType: '',
            createType: ''
        };
    }

    componentDidMount() {
        document.title = "AnimalTypes";
        this.fetchAnimalType();
    }

    fetchAnimalType = () => {
        axios.get('http://127.0.0.1:5000/animalTypes')
            .then((res) => {
                this.setState({ data: res.data });
            }).catch(err => {
                alert("Data not found!");
            });
    };

    handleEditClick = (item) => {
        this.setState({
            showModal: true,
            editItem: item,
            newType: item.type
        });
    };

    handleCreateClick = () => {
        this.setState({
            showCreateModal: true,
            createType: ''
        });
    };

    handleModalClose = () => {
        this.setState({ showModal: false, showCreateModal: false });
    };

    handleInputChange = (e) => {
        this.setState({ newType: e.target.value });
    };

    handleCreateInputChange = (e) => {
        this.setState({ createType: e.target.value });
    };

    handleSave = () => {
        const { editItem, newType } = this.state;
        axios.put(`http://127.0.0.1:5000/animalTypes/update/${editItem.id}`, { type: newType })
            .then(() => {
                this.fetchAnimalType();
                this.handleModalClose();
            })
            .catch(err => {
                alert("Update failed!");
            });
    };

    handleCreateSave = () => {
        const { createType } = this.state;
        axios.post('http://127.0.0.1:5000/animalTypes/create', { type: createType })
            .then(() => {
                this.fetchAnimalType(); // รีเฟรชข้อมูล
                this.handleModalClose();
            })
            .catch(err => {
                alert("Creation failed!");
            });
    };

    handleDeleteClick = (id) => {
        axios.delete(`http://127.0.0.1:5000/animalTypes/delete/${id}`)
            .then(() => {
                this.fetchAnimalType(); // รีเฟรชข้อมูล
            })
            .catch(err => {
                alert("Delete failed!");
            });
    };

    render() {
        return (
            <div>
                <Animal_type_list_component
                    data={this.state.data}
                    onEdit={this.handleEditClick}
                    onDelete={this.handleDeleteClick}
                    onCreateClick={this.handleCreateClick}
                />
                <Animal_type_edit_component
                    show={this.state.showModal}
                    onClose={this.handleModalClose}
                    newType={this.state.newType}
                    onInputChange={this.handleInputChange}
                    onSave={this.handleSave}
                />
                <Animal_type_create_component
                    show={this.state.showCreateModal}
                    onClose={this.handleModalClose}
                    createType={this.state.createType}
                    onInputChange={this.handleCreateInputChange}
                    onCreate={this.handleCreateSave}
                />
            </div>
        );
    }
}

export default Manage_animal_type_component;
