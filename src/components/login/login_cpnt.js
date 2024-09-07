import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div className='wrapaper d-flex align-items-center justify-content-center w-100'>
        <div className="logo-dusit"><img src=""/></div>
        <div className='login'>
          <img src="src/assets/img/logo-dusit.png" alt="" /> 
            <form className='needs-validation'>
            <div className='form-group was-validated mb-1'>
              <label htmlFor="user" className='form-label'>Username</label>
              <input type="user" className='form-control' required></input >
              <div className="invalid-feedback">
                Please Enter your Username
              </div>
            </div>
            <div className='form-group was-validated mb-1'>
              <label htmlFor="password" className='form-label'>Password</label>
              <input type="password" className='form-control'required></input >
              <div className="invalid-feedback">
                Please Enter your Password
              </div>
            </div>
            <div className='form-group form-check mb-2'>
              <input type="checkbox" className='form-check-input'></input>
              <label htmlFor="check" className='form-check-label'>Remember me</label>
            </div>
            <button type='submit' className='btn btn-success block w-100 mt-2'>Sign in </button>
          </form>
        </div>
      </div>
    )
  }
}
