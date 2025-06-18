import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import jsonLogo from '../../assets/images/json-image.png'; 
import './style.css'
import { getUserName } from '../../helper/localStorageHelper';

export default function Header() {
    const nav = useNavigate()
    const LogoutHandler = () => {
        localStorage.removeItem('user')
        nav('/login')
    }

    const username = getUserName()

    return (
        <header className="header">
            <div className="header__logo">
                <img src={jsonLogo} alt="JSON Placeholder Logo" />
            </div>

            <div className="header__user-info">
                <FaUserAlt />
                <span className="header__user-name">{username}</span>
            </div>

            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item">
                        <NavLink to="/home" className={({ isActive }) => isActive ? "active-link1" : ""}>Home</NavLink>
                    </li>
                    {/* <li className="header__nav-item">
                        <NavLink to="albums" className={({ isActive }) => isActive ? "active-link" : ""}>Albums</NavLink>
                    </li> */}
                    <li className="header__nav-item">
                        <NavLink to="posts" className={({ isActive }) => isActive ? "active-link" : ""}>Posts</NavLink>
                    </li>
                    <li className="header__nav-item">
                        <NavLink to="todos" className={({ isActive }) => isActive ? "active-link" : ""}>Todos</NavLink>
                    </li>
                    <li className="header__nav-item">
                        <NavLink to="info" className={({ isActive }) => isActive ? "active-link" : ""}>Info</NavLink>
                    </li>
                </ul>
                <button className="header__logout-btn" onClick={LogoutHandler}>Logout</button>
            </nav>
        </header>
    )
}