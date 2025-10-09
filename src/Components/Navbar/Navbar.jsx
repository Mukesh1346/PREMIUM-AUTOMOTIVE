import React from "react";
import { Link } from "react-router-dom"; // or 'next/link' for Next.js
import logo from '../../Assets/Images/LOGO.png';
import "./Navbar.css";

export default function Navbar() {

  const handleLinkClick = () => {
    // Get the collapse element
    const navbarCollapse = document.getElementById("navbarNav");

    // Only close if it is shown (Bootstrap adds 'show' class)
    if (navbarCollapse.classList.contains("show")) {
      // Remove the 'show' class to hide the menu
      navbarCollapse.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand text-center" to="/">
          <img src={logo} alt="Logo" className="logoImg" />
          <p className="logoText mt-2">PREMIUM AUTOCARE</p>
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
              <Link className="nav-link" to="/" onClick={handleLinkClick}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus" onClick={handleLinkClick}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mission" onClick={handleLinkClick}>Mission</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products" onClick={handleLinkClick}>Product Offerings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services" onClick={handleLinkClick}>Service Offerings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands" onClick={handleLinkClick}>OEM Partnership</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/our-networks" onClick={handleLinkClick}>Our Networks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactus" onClick={handleLinkClick}>Contact Us</Link>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
}
