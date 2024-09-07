import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/navbar_cpnt';

import AnimalTable from './components/table/animal_table_cpnt'
import AnimalTypeTable from './components/table/animal_type_table_cpnt'
import UserTable from './components/table/user_table_cpnt'

import Login from './components/login/login_cpnt';
import Logout from './components/login/logout_cpnt'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path='/animals' element={<AnimalTable />} />
            <Route path='/animal-types' element={<AnimalTypeTable />} />
            <Route path='/user' element={<UserTable />} />

            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
