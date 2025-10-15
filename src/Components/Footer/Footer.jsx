import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed successfully!");
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer mt-auto">
      <div className="container footer-container">
        <div className="row text-center text-md-start">
          {/* Quick Links */}
          <div className="col-12 col-md-4 mb-4">
           <div className=" quickColumn ">
           <h5 className="footer-title footerSec1">Quick Links</h5>
            <ul className="footer-links">
              {[
                { to: "/", text: "Home" },
                { to: "/aboutus", text: "About Us" },
                { to: "/Mission", text: "Mission" },
                { to: "/products", text: "Products" },
                { to: "/services", text: "Services" },
                { to: "/brands", text: "OEM Partnerships" },
                { to: "/our-networks", text: "Our Network" },
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
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-4 mb-4">
           <div className="NewsLetterColumn">
           <h5 className="footer-title newstitle">Newsletter</h5>
            <p>Subscribe to our newsletter to get the latest updates.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
           </div>
          </div>

          {/* Corporate Info */}
          <div className="col-12 col-md-4 mb-4">
           <div className="AddressColumn">
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
        </div>

        <hr className="footer-hr" />

        <div className="footer-bottom text-center">
          <p>
            © Sikand Standley Enterprises Private
            Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
