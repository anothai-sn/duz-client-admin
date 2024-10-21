import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import logo from '../../imges/dusit-zoo-logo.png';
import './login_cpnt.css';
import axios from 'axios';
import Cookies from 'js-cookie';  // Import js-cookie

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    redirectToReferrer: false,
    isValidated: false, // Add a new state to control validation
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
  
    // Set validation state to true to trigger validation
    this.setState({ isValidated: true });

    // Check if the form is valid
    if (!username || !password) return;

    try {
      // ส่งคำขอไปยังเซิร์ฟเวอร์เพื่อทำการตรวจสอบข้อมูลล็อกอิน
      const response = await axios.post('http://127.0.0.1:5000/auth/login', { username, password });
  
      // ตรวจสอบ status จากคำตอบของเซิร์ฟเวอร์
      if (response.data.status === "Pass") {
        // ถ้า status 200 ให้บันทึกสถานะการล็อกอินใน localStorage และ redirect
        localStorage.setItem('isLoggedIn', 'true');
        
        // เก็บค่า username ไว้ในคุกกี้
        Cookies.set('username', username, { expires: 7 }); // Store for 7 days
        
        this.setState({ redirectToReferrer: true });
      } else {
        // ถ้าไม่สำเร็จ ให้แสดงข้อความผิดพลาด
        this.setState({ errorMessage: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }
    } catch (error) {
      // กรณีมีข้อผิดพลาด เช่น เซิร์ฟเวอร์ไม่ตอบกลับหรือข้อมูลผิดพลาด
      this.setState({ errorMessage: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  }

  render() {
    const { username, password, errorMessage, redirectToReferrer, isValidated } = this.state;

    if (redirectToReferrer) {
      return <Navigate to="/home" />;
    }

    return (
      <div className='wrapper d-flex align-items-center justify-content-center w-100'>
        <div className='login'>
          <img src={logo} alt="Dusit Logo" className='login-logo' />
          <form className={isValidated ? 'was-validated' : ''} onSubmit={this.handleSubmit}>
            <div className='form-group mb-1'>
              <label htmlFor="username" className='form-label'>ชื่อผู้ใช้</label>
              <input
                type="text"
                name="username"
                className='form-control'
                value={username}
                onChange={this.handleInputChange}
                required
              />
              <div className="invalid-feedback">
                กรุณากรอกชื่อผู้ใช้ของคุณ
              </div>
            </div>
            <div className='form-group mb-1'>
              <label htmlFor="password" className='form-label'>รหัสผ่าน</label>
              <input
                type="password"
                name="password"
                className='form-control'
                value={password}
                onChange={this.handleInputChange}
                required
              />
              <div className="invalid-feedback">
                กรุณากรอกรหัสผ่านของคุณ
              </div>
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type='submit' className='btn btn-success block w-100 mt-2'>เข้าสู่ระบบ</button>
          </form>
        </div>
      </div>
    );
  }
}
