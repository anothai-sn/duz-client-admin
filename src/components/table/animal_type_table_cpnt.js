import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './animal_table_cpnt.css'; // Ensure this matches your CSS file name
import axios from 'axios';

export default class AnimalTypeTable extends Component {
  state = {
    data: [],  // Initialize data as an empty array
  };

  // Fetch animal type data
  fetchAnimalType = () => {
    axios.get(`http://127.0.0.1:5000/animalTypes/`)
      .then(res => {
        // Log the API response
        console.log(res.data);  
        this.setState({
          data: Array.isArray(res.data) ? res.data : []  // Ensure data is an array
        });
      })
      .catch(err => {
        console.error(err);
        alert('Error fetching animal type data!');
      });
  }

  // Handle delete action
  handleDelete = (item) => {
    const confirmed = window.confirm("คุณแน่ใจว่าต้องการลบข้อมูลประเภทสัตว์หรือไม่?");
    if (confirmed) {
      axios.delete(`http://127.0.0.1:5000/animalTypes/${item.id}`)
        .then(() => {
          // Update state to remove the deleted item
          this.setState((prevState) => ({
            data: prevState.data.filter(animal => animal.id !== item.id)
          }));
          alert('ลบข้อมูลเรียบร้อยแล้ว!');
        })
        .catch(err => {
          console.error(err);
          alert('เกิดข้อผิดพลาดในการลบข้อมูล!');
        });
    }
  }

  // Fetch data when the component mounts
  componentDidMount() {
    this.fetchAnimalType();
  }

  render() {
    const { data } = this.state; // Destructure the data from state
    return (
      <div className="container mt-3">
        <h2>ตารางข้อมูลประเภทสัตว์</h2>
        <button 
          className="btn btn-primary mb-3" 
        >
          <a href='./users/create' className="text-white">เพิ่มข้อมูลประเภทสัตว์</a>
        </button>
  
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th scope="col">ประเภทสัตว์</th>
              <th scope="col" style={{ width: "15%" }}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.type}</td>
                  <td>
                    <button className="btn btn-warning btn-sm text-black">
                      แก้ไขข้อมูล
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(item)}
                    >
                      ลบข้อมูล
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">ไม่มีข้อมูลประเภทสัตว์</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
