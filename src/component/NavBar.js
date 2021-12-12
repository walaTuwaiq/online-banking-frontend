import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/NavBar.css"

export default function NavBar() {
    return (
        <div className='navbar-container'>
            <ul className='navbar-list'>
                <Link className='navbar-link'>
                    <li className='navbar-item'>LOGO</li>
                </Link>
                <Link to="/home" className='navbar-link'>
                    <li className='navbar-item'>Home</li>
                </Link>
                <Link to="about-us" className='navbar-link'>
                    <li className='navbar-item'>About</li>
                </Link>
                <Link to="/login" className='navbar-link'>
                    <li className='navbar-item'>Log in</li>
                </Link>
                <Link to="/signup" className='navbar-link'>
                    <li className='navbar-item'>Sign up</li>
                </Link>
            </ul>
        </div>
    )
}
