import React, { Component } from 'react';
import axios from 'axios';
import AnimalListComponent from './Animal_list_component';
import EditAnimalModal from './Animal_edit_component';
import CreateAnimalModal from './Animal_create_component';

export default class ManageAnimalComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      animalTypes: [],
      showEditModal: false,
      showCreateModal: false,
      selectedAnimal: null,
      newAnimalName: '',
      newPlace: '',
      newDescription: '',
      newTypeId: '',  // Changed from newType to newTypeId
      newImages: [],
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    document.title = "Animal";
    this.fetchAnimals();
    this.fetchAnimalTypes();
  }

  fetchAnimals = () => {
    this.setState({ loading: true, error: null });
    axios.get('http://127.0.0.1:5000/animals')
      .then((res) => {
        this.setState({
          data: res.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          error: "Data not found!",
          loading: false
        });
      });
  };

  fetchAnimalTypes = () => {
    axios.get('http://127.0.0.1:5000/animalTypes')
      .then((res) => {
        this.setState({
          animalTypes: res.data
        });
      })
      .catch(err => {
        this.setState({
          error: "Animal types not found!"
        });
      });
  };

  handleEditClick = (animal) => {
    this.setState({
      showEditModal: true,
      selectedAnimal: animal,
      newAnimalName: animal.animalName,
      newPlace: animal.place,
      newDescription: animal.description,
      newTypeId: animal.animalType ? animal.animalType.id : '',  // Use id
      newImages: animal.animalImages
    });
  };

  handleCreateClick = () => {
    this.setState({
      showCreateModal: true,
      newAnimalName: '',
      newPlace: '',
      newDescription: '',
      newTypeId: '',  // Use id
      newImages: []
    });
  };

  handleModalClose = () => {
    this.setState({ showEditModal: false, showCreateModal: false });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  handleTypeChange = (e) => {
    const value = parseInt(e.target.value, 10); // Convert the value to an integer
    this.setState({ newTypeId: isNaN(value) ? '' : value }); // Handle cases where the value might not be a number
  };


  handleImagesChange = (e) => {
    this.setState({ newImages: e.target.value.split(',').map(img => img.trim()) });
  };

  handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map(file => URL.createObjectURL(file));
    this.setState({ newImages: fileUrls });
  };

  handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map(file => URL.createObjectURL(file));
    this.setState({ newImages: fileUrls });
  };

  handleSaveEdit = () => {
    const { selectedAnimal, newAnimalName, newPlace, newDescription, newTypeId, newImages } = this.state;
    this.setState({ loading: true, error: null });
    // axios.put(`http://127.0.0.1:5000/animals/update/${selectedAnimal.id}`, {
    //   animalName: newAnimalName,
    //   place: newPlace,
    //   description: newDescription,
    //   animalTypeId: newTypeId,  // Use id
    // })
    //   .then(() => {
    //     this.fetchAnimals();
    //     this.handleModalClose();
    //   })
    //   .catch(err => {
    //     this.setState({ error: "Update failed!", loading: false });
    //   });

      axios.put(`http://127.0.0.1:5000/animalImages/update/${selectedAnimal.id}`, {
        image: newImages
      })
        .then(() => {
          this.fetchAnimals();
          this.handleModalClose();
        })
        .catch(err => {
          this.setState({ error: "Update failed!", loading: false });
        });
  };

  handleSaveCreate = () => {
    const { newAnimalName, newPlace, newDescription, newTypeId, newImages } = this.state;
    this.setState({ loading: true, error: null });

    axios.post('http://127.0.0.1:5000/animals/create', {
      animalName: newAnimalName,
      place: newPlace,
      description: newDescription,
      animalTypeId: newTypeId,  // เปลี่ยนตรงนี้
      animalImages: newImages
    })
      .then(() => {
        this.fetchAnimals();
        this.handleModalClose();
      })
      .catch(err => {
        this.setState({ error: "Creation failed!", loading: false });
      });

      // axios.post('http://127.0.0.1:5000/animalImages/create', {
      //   animalImages: newImages
      // })
      //   .then(() => {
      //     this.fetchAnimals();
      //     this.handleModalClose();
      //   })
      //   .catch(err => {
      //     this.setState({ error: "Creation failed!", loading: false });
      //   });
  };


  handleDeleteClick = (id) => {
    this.setState({ loading: true, error: null });
    axios.delete(`http://127.0.0.1:5000/animals/delete/${id}`)
      .then(() => {
        this.fetchAnimals();
      })
      .catch(err => {
        this.setState({ error: "Delete failed!", loading: false });
      });
  };

  render() {
    const { loading, error, data, animalTypes, showEditModal, showCreateModal, newAnimalName, newPlace, newDescription, newTypeId, newImages } = this.state;

    return (
      <div>
        {loading && <div>Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <AnimalListComponent
          animals={data}
          loading={loading}
          error={error}
          onEdit={this.handleEditClick}
          onDelete={this.handleDeleteClick}
          onCreateClick={this.handleCreateClick}
        />
        <CreateAnimalModal
          show={showCreateModal}
          onClose={this.handleModalClose}
          animalName={newAnimalName}
          place={newPlace}
          description={newDescription}
          typeId={newTypeId}
          images={newImages}
          animalTypes={animalTypes}
          onInputChange={this.handleInputChange}
          onTypeChange={this.handleTypeChange}
          onImagesChange={this.handleImagesChange}
          onFileChange={this.handleFileChange}  // ส่งฟังก์ชันใหม่
          onCreate={this.handleSaveCreate}
        />

        <EditAnimalModal
          show={showEditModal}
          onClose={this.handleModalClose}
          animalName={newAnimalName}
          place={newPlace}
          description={newDescription}
          typeId={newTypeId}
          images={newImages}
          animalTypes={animalTypes}
          onInputChange={this.handleInputChange}
          onTypeChange={this.handleTypeChange}
          onImagesChange={this.handleImagesChange}
          onFileChange={this.handleFileChange}  // ส่งฟังก์ชันใหม่
          onSave={this.handleSaveEdit}
        />

      </div>
    );
  }
}
