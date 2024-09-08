import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar_component';
import Manage_animal_component from './components/Management/Manage_animal_component';
import Manage_animal_type_component from './components/Management/Manage_animal_type_component';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path='/management/animal' element={<Manage_animal_component />} />
            <Route path='/management/animal-type' element={<Manage_animal_type_component />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
