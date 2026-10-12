import React, { useState } from "react";
import "./ContactUs.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    hp_website: "", // Honeypot field for bot protection
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    // Client-side quick validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          hp_website: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again later.",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus({
        type: "error",
        message: "Network error. Please check your internet connection or server status.",
      });
    } finally {
      setLoading(false);
    }
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
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field (hidden from legitimate humans, traps automated spam bots) */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input
                    type="text"
                    name="hp_website"
                    value={formData.hp_website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={100}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={100}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={20}
                    placeholder="+91 9876543210"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject (Optional)</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={120}
                    placeholder="Inquiry Subject"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    rows="5"
                    maxLength={3000}
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btnSend" disabled={loading}>
                  {loading ? "Sending securely..." : "Send Message"}
                </button>
              </form>

              {status.message && (
                <div
                  className={`status-message mt-3 p-3 rounded text-center ${
                    status.type === "success"
                      ? "alert alert-success bg-success text-white"
                      : "alert alert-danger bg-danger text-white"
                  }`}
                  role="alert"
                >
                  {status.type === "success" ? "✅ " : "❌ "}
                  {status.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
