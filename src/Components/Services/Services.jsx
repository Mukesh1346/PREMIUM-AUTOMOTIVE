"use client";
import React, { useState } from "react";
import "./service.css";

export default function Product() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Paint Protection Film",
      answer: [
        "Lumishield Paint Protection Film - 5 Years",
        "Neoshield Paint Protection Film - 8 Years",
        "Eternashield Paint Protection Film - 10 Years",
      ],
    },
    {
      question: "Sunroof & Headlight Film",
      answer: [
        "Headlight Protection Film (250 Sq Ft)",
        "Sunroof Film Heat Resistance",
      ],
    },
    {
      question: "Ceramic Coating",
      answer: [
        "Ceramic Coating 9H",
        "Graphene Coating 10H",
        "Glass Coating",
      ],
    },
    {
      question: "Emblem / Chrome Cleaning",
      answer: ["Chrome & Metal Polish"],
    },
    {
      question: "Cabin Disinfectant",
      answer: ["Cabin Disinfectant", "Odor Neutralizer"],
    },
    {
      question: "Rodent Control Treatment",
      answer: ["Rat Repellent Spray", "Rat Repellent Paste"],
    },
    {
      question: "Paint Protection Coating",
      answer: ["Rubbing Polish", "Wax Polish"],
    },
    {
      question: "Premium Interior Cleaning",
      answer: [
        "Interior Wash",
        "Interior Foam Wash",
        "Leather Cleaning",
        "Door & Mat Cleaning",
      ],
    },
    {
      question: "UV Treatment",
      answer: ["Driwash 'n' Guard"],
    },
    {
      question: "Special Combo Package 1",
      answer: ["Paint Protection", "Premium Interior Cleaning"],
    },
    {
      question: "Special Combo Package 2",
      answer: [
        "Antirust Coating - Black",
        "Paint Protection",
        "Premium Interior Cleaning",
      ],
    },
    {
      question: "Service Lubrication",
      answer: [
        "Premium Multipurpose Grease",
        "Silicone Spray",
        "Battery Protectant",
      ],
    },
    {
      question: "Underbody & Internal Panel Protection",
      answer: [
        "Antirust Underbody Coating - Black",
        "Antirust Underbody Coating - Clear",
        "Cavity Protection Spray",
      ],
    },
    {
      question: "Alloy Wheel Cleaning",
      answer: ["Alloy Wheel Cleaner"],
    },
    {
      question: "Wheel Drum Paint",
      answer: ["Wheel Drum Paint"],
    },
  ];
  

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section className="ProductSection">
        {/* <div className="overlay"></div> */}

        <div className="ProductContent text-center mt-5">
          <h1>Services Offering</h1>

          <div className="faq-section container mt-5 mb-5">
            {/* <h2 className="faq-title">Product Offerings</h2> */}

            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeIndex === index ? "active" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    <span className="icon">
                      {activeIndex === index ? "–" : "+"}
                    </span>
                  </button>
                  <div
                    className="faq-answer"
                    style={{
                      maxHeight: activeIndex === index ? "500px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.5s ease, padding 0.3s ease",
                      padding: activeIndex === index ? "10px 0" : "0",
                    }}
                  >
                    <ul className="faq-list">
                      {faq.answer.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
