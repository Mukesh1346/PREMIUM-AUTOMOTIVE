import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  // Prevent form from reloading page
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
  };

  // Optional: scroll to top when a footer link is clicked
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-row">

          {/* Company Info */}
          <div className="footer-col footerSec1">
            <h5 className="footer-title">Corporate Address</h5>
            <p>
               Sikand Standley Enterprises Private Limited <br />
              Plot No.- 33, Pocket - N, DSIIDC, <br />Sector -5,
              Industrial Area, Bawana, <br /> New Delhi - 110039
            </p>
            <p><strong>Phone:</strong> 011-47100197 / 98, 7838960232</p>
            <p><strong>Email:</strong> <a href="mailto:Info@sikandstandley.com">Info@sikandstandley.com</a></p>
          </div>

          {/* Quick Links */}
          <div className="footer-col quickLinksCol">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
              <li><Link to="/aboutus" onClick={handleLinkClick}>About Us</Link></li>
              <li><Link to="/our-networks" onClick={handleLinkClick}>Mission</Link></li>
              <li><Link to="/products" onClick={handleLinkClick}>Products</Link></li>
              <li><Link to="/services" onClick={handleLinkClick}>Services</Link></li>
              <li><Link to="/brands" onClick={handleLinkClick}>OEM Partnership</Link></li>
              <li><Link to="/our-networks" onClick={handleLinkClick}>Our Networks</Link></li>
              <li><Link to="/contactus" onClick={handleLinkClick}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col NewsLetterSec">
            <h5 className="footer-title">Newsletter</h5>
            <p>Subscribe to our newsletter to get latest updates</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>

        </div>

        <hr className="footer-hr" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p>©  Sikand Standley Enterprises Private Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
