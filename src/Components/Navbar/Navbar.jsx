import React from "react";
import { Link } from "react-router-dom"; // Use 'next/link' for Next.js
import logo from '../../Assets/Images/LOGO.png';
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logoImg" />
        </Link>

        {/* Hamburger toggle for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mission">Mission</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands">OEM Partnership </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/our-networks">Our Networks </Link>
            </li>
          
            <li className="nav-item">
              <Link className="nav-link" to="/contactus">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
