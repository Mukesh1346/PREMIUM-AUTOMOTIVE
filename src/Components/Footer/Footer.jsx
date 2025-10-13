import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-row">
          {/* Quick Links */}
          <div className="footer-col footer-links-col">
            <h5 className="footer-title foot12">Quick Links</h5>
            <ul className="footer-links foot12">
              {[
                { to: "/", text: "Home" },
                { to: "/aboutus", text: "About Us" },
                { to: "/Mission", text: "Mission" },
                { to: "/products", text: "Products" },
                { to: "/services", text: "Services" },
                { to: "/brands", text: "OEM Partnership" },
                { to: "/our-networks", text: "Our Networks" },
                { to: "/contactus", text: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} onClick={handleLinkClick}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col newsletter">
            <h5 className="footer-title">Newsletter</h5>
            <p>Subscribe to our newsletter to get the latest updates.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          {/* Company Info */}
          <div className="footer-col footer-info">
            <h5 className="footer-title">Corporate Address</h5>
            <p>
              Sikand Standley Enterprises Private Limited <br />
              Plot No. 33, Pocket N, DSIIDC, <br />
              Sector 5, Industrial Area, Bawana, <br />
              New Delhi - 110039
            </p>
            <p>
              <strong>Phone:</strong> 011-47100197 / 98, 7838960232
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:Info@sikandstandley.com">
                Info@sikandstandley.com
              </a>
            </p>
          </div>
        </div>

        <hr className="footer-hr" />

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Sikand Standley Enterprises Private Limited. 
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
