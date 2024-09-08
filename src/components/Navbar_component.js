import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar_component extends Component {
    render() {
        if (window.location.pathname.startsWith('/management')) {
            return (
                <div>
                    <div>Logo Dusit Zoo</div>
                    <div>
                        <div>Username</div>
                        <div>username role</div>
                    </div>
                    <div className='nav-bar'>
                        <ul>
                            <li>
                                <Link to='/management/animal-type'>Manage Animal Type</Link>
                            </li>
                            <li>
                                <Link to='/management/animal'>Manage Animal</Link>
                            </li>
                            <li>
                                <Link to='/'>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Navbar_component;
