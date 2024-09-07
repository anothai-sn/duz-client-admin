import React, { Component } from 'react'

import './navbar_cpnt.css'
import User from '../../imges/user.png'

export default class Navbar extends Component {
  render() {
    return (
      <div className="menu-nav">
        <div className="userstatus">
          <img src={User} alt="" />
          <h5>Username7456</h5>
          <p>Admin</p>
        </div>
        <hr className="hr" />
        <div className="menuEmployee">
          <ul>
            <li>
              <a href='/manage-user'>จัดการข้อมูลสัตว์</a>
            </li>
            <li>
            <a href='/manage-animal-type'>จัดการข้อมูลประเภทสัตว์</a>
            </li>
            <li>
            <a href='/manage-user'>จัดการข้อมูลผู้ใช้</a>
            </li>

            <li>
            <a href='/logout'>ออกจากระบบ</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
