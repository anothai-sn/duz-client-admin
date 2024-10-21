import React, { Component } from 'react';
import './navbar_cpnt.css';
import Logo from '../../imges/dusit-zoo-logo.png';
import Cookies from 'js-cookie';  // Import js-cookie to handle cookies
import axios from 'axios';

export default class Navbar extends Component {
  state = {
    data: {}
  }

  // Fetch user data from the server
  fetchUser = () => {
    const username = Cookies.get('username');
    if (username) {
      axios.get(`http://127.0.0.1:5000/users/${username}`)  // Use username in the API request URL
        .then(res => {
          this.setState({
            data: res.data  // Set the fetched user data to the state
          });
        })
        .catch(err => {
          console.error(err);
          alert('Error fetching user data!');
        });
    }
  }

  // Use componentDidMount to call fetchUser when the component mounts
  componentDidMount() {
    this.fetchUser();
  }

  render() {
    const { data } = this.state;  // Destructure the data from the state

    // Determine role
    const userRole = data.role ? data.role.role : null;

    return (
      <div className="menu-nav">
        <div className="userstatus">
          <a href='/home_cpnt.js'>
            <img src={Logo} alt="Dusit Zoo Logo" />
          </a>
          <h5>{data.username || 'Guest'}</h5>  {/* Display the username or 'Guest' if not available */}
          <p>{userRole || 'Undefined'}</p>        {/* Display the role or 'Undefined' if not available */}
        </div>
        <hr className="hr" />
        <div className="menuEmployee">
          <ul>
            {/* Always show these two links */}
            <li>
              <a href='/animals'>จัดการข้อมูลสารานุกรมสัตว์</a>
            </li>
            <li>
              <a href='/animal-types'>จัดการข้อมูลประเภทสัตว์</a>
            </li>
            {/* Show additional links based on the user's role */}
            {userRole === 'admin' && (
              <>
                <li>
                  <a href='/users'>จัดการข้อมูลผู้ใช้</a>
                </li>
              </>
            )}
            <li>
              <a href='/logout'>ออกจากระบบ</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
