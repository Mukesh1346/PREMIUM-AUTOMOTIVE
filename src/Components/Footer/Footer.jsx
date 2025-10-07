import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-row">

          {/* Company Info */}
          <div className="footer-col">
            <h5 className="footer-title">Sikand Standley Enterprises</h5>
            <p>
              <strong>Office Address:</strong><br />
              Plot No.- 33, Pocket - N, DSIIDC, Sector -5,<br />
              Industrial Area, Bawana, New Delhi - 110039
            </p>
            <p><strong>Phone:</strong> 011-47100197 / 98, 7838960232</p>
            <p><strong>Email:</strong> <a href="mailto:Info@sikandstandley.com">Info@sikandstandley.com</a></p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Brands</a></li>
              <li><a href="#">Services</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h5 className="footer-title">Newsletter</h5>
            <p>Subscribe to our newsletter to get latest updates</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>

            {/* Social Media */}
            <div className="footer-social">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

        </div>

        <hr className="footer-hr" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2025 Sikand Standley Enterprises Private Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
