import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./animal_table_cpnt.css"; // Adjust the filename as necessary
import "./animal_type_table_cpnt.css";
import Cookies from 'js-cookie';  
import axios from 'axios'; // Don't forget to import axios!
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import Eye Icons
import Fuse from 'fuse.js'; // Import Fuse.js
import './user_table_cpnt.css'

export default class UserTable extends Component {
  state = {
    data: [],  // Initialize data as an empty array
    visiblePasswords: {}, // Track which passwords are visible
    searchQuery: "", // Initialize search query
  };

  // Fetch user data
  fetchUser = () => {
    const username = Cookies.get('username');
    if (username) {
      axios.get(`http://127.0.0.1:5000/users/`)
        .then(res => {
          this.setState({
            data: Array.isArray(res.data) ? res.data : []  // Ensure data is an array
          });
        })
        .catch(err => {
          console.error(err);
          alert('Error fetching user data!');
        });
    }
  }

  // Handle delete action
  handleDelete = (username) => {
    const confirmed = window.confirm("คุณแน่ใจว่าต้องการลบผู้ใช้หรือไม่?");
    if (confirmed) {
      axios.delete(`http://127.0.0.1:5000/users/${username}`)
        .then(() => {
          // Remove the deleted item from the state
          this.setState((prevState) => ({
            data: prevState.data.filter(item => item.username !== username)
          }));
          alert('ลบผู้ใช้เรียบร้อยแล้ว!');
        })
        .catch(err => {
          console.error(err);
          alert('เกิดข้อผิดพลาดในการลบผู้ใช้!');
        });
    }
  }

  // Call fetchUser when the component mounts
  componentDidMount() {
    this.fetchUser();
  }

  // Toggle password visibility
  togglePasswordVisibility = (username) => {
    this.setState(prevState => ({
      visiblePasswords: {
        ...prevState.visiblePasswords,
        [username]: !prevState.visiblePasswords[username], // Toggle visibility
      }
    }));
  }

  // Handle search input change
  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  render() {
    const { data, visiblePasswords, searchQuery } = this.state;

    // Set up Fuse.js for fuzzy searching
    const fuse = new Fuse(data, {
      keys: ['username'], // Specify the fields to search
      includeScore: true,
      threshold: 0.3, // Lower is more strict (0.0 to 1.0)
    });

    // Filter the data based on the search query
    const filteredData = searchQuery ? fuse.search(searchQuery).map(result => result.item) : data;

    return (
      <div className="container mt-3 columz">
        <h2>ตารางข้อมูลบัญชีผู้ใช้</h2>

        {/* Search Input */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="ค้นหาจากชื่อผู้ใช้..."
          value={searchQuery}
          onChange={this.handleSearchChange}
        />

        {/* Button to create a new user */}
        <button 
          className="btn btn-primary mb-3" 
          onClick={this.handleCreateUser}
        >
          <a href='./users/create'>สร้างบัญชีผู้ใช้ใหม่</a>
        </button>
  
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th scope="col">ชื่อผู้ใช้</th>
              <th scope="col">รหัสผ่าน</th>
              <th scope="col">สิทธิ์ผู้ใช้</th>
              <th scope="col" style={{ width: "15%" }}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>
                    {/* Show password or asterisks based on visibility state */}
                    {visiblePasswords[item.username] ? item.password : '******'}
                    {/* Toggle visibility icon */}
                    <button
                      className="btn btn-link"
                      onClick={() => this.togglePasswordVisibility(item.username)}
                      style={{ padding: 0, marginLeft: '5px' }} // Adjust styles as necessary
                    >
                      <FontAwesomeIcon icon={visiblePasswords[item.username] ? faEyeSlash : faEye} />
                    </button>
                  </td>
                  <td>{item.role.role}</td>
                  <td>
                  <button
                      className="btn btn-warning btn-sm " 
                    >
                      <a href={`/users/${item.username}`} className="text-black">
                      แก้ไขข้อมูล
                    </a>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(item.username)}
                    >
                      ลบข้อมูล
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">ไม่มีข้อมูลผู้ใช้</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  } 
}
