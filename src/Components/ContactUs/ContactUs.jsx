import React, { useState } from "react";
import "./ContactUs.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container ">
      <div className="container">
        <div className="row">
          {/* Left Side: Company Details */}
          <div className="col-lg-5 col-md-6 mb-4">
            <div className="contact-left p-4 h-100 address shadow-sm rounded">
              <h2 className="mb-3">CONTACT US</h2>
              <p>
                <strong>Office Address:</strong> Sikand Standley Enterprises Private Limited,
                Plot No.- 33, Pocket - N, DSIIDC, Sector -5, Industrial Area, Bawana, New Delhi - 110039
              </p>
              <p>
                <strong>Contact Number:</strong> 011-47100197 / 98, 7838960232
              </p>
              <p>
                <strong>Email ID:</strong> info@sik.com
              </p>
              <div className="social-icons mb-3">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaLinkedinIn /></a>
                <a href="#"><FaInstagram /></a>
              </div>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.1497700140003!2d77.07118997496313!3d28.804610376246615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d025798555555%3A0xb11be30bfce4c4e0!2sSikand%20Standley%20Enterprises%20Private%20Limited!5e0!3m2!1sen!2sin!4v1759839978901!5m2!1sen!2sin"
                  title="Google Map"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="col-lg-7 col-md-6">
            <div className="contact-right p-4 shadow-sm rounded">
              <h2 className="mb-4">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-send">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
