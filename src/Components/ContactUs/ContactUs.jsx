import React, { useState } from "react";
import { sendForm } from "@emailjs/browser";
import "./ContactUs.css";

export default function ContactUs() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    sendForm(
      "YOUR_SERVICE_ID",    // Replace with your EmailJS Service ID
      "YOUR_TEMPLATE_ID",   // Replace with your EmailJS Template ID
      e.target,
      "YOUR_PUBLIC_KEY"     // Replace with your EmailJS Public Key
    )
      .then(() => {
        setStatus("✅ Message sent successfully!");
        e.target.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setStatus("❌ Failed to send message");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="contact-container">
      <div className="container">
        <div className="row">
          {/* Left Side: Company Details */}
          <div className="col-lg-5 col-md-6 mb-4">
            <div className="contact-left p-4 h-100 address shadow-sm rounded">
              <h2 className="mb-3">CONTACT US</h2>
              <p>
                <strong>Corporate Address:</strong> <br /> Sikand Standley Enterprises Private Limited, <br />
                Plot No.- 33, Pocket - N, DSIIDC, <br /> Sector -5, Industrial Area, Bawana,  <br />New Delhi - 110039
              </p>
              <p>
                <strong>Contact Number:</strong> 011-47100197 / 98, 7838960232
              </p>
              <p>
                <strong>Email ID:</strong> Info@sikandstandley.com
              </p>
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
                  <input type="text" name="name" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea name="message" className="form-control" rows="5" required></textarea>
                </div>
                <button type="submit" className="btnSend" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
              {status && <p className="status-message mt-3">{status}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
