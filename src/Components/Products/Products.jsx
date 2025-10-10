"use client";
import React, { useState } from "react";
import "./product.css";

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
        "Head Light Protection Film (250 Sq Ft)",
        "Sunroof Film Heat Resistance",
      ],
    },
    {
      question: "Ceramic Coating",
      answer: ["Ceramic Coating 9H", "Ceramic Details Spray", "Glass Coating"],
    },
    {
      question: "Graphene Coating",
      answer: ["Graphene Coating 10H", "Graphene Details Spray"],
    },
    {
      question: "Shampoos & Cleaner Solvents",
      answer: [
        "Wash & Shine Shampoo",
        "D'greaser",
        "Interior Cleaner",
        "Interior Wash",
        "Multipurpose Cleaner",
        "Spray & Wipe",
        "Alloy Wheel Cleaner",
      ],
    },
    {
      question: "Compound, Waxes and Polishes",
      answer: ["Car Polish", "Wax Polish", "Driwash ‘n’ Guard"],
    },
    {
      question: "Dressing & Glass Treatment",
      answer: [
        "Glass Cleaner",
        "Dashboard Polish",
        "Multipurpose Shiner",
        "Tyre Shiner",
        "Windshield Washer",
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
      question: "Odor Elimination",
      answer: ["Odor Neutralizer"],
    },
    {
      question: "Professional Kit",
      answer: [
        "Car Care Kit",
        "Car Wax Kit",
        "Head Light Restoration Kit",
      ],
    },
    {
      question: "Accessories",
      answer: [
        "Door Edge Guard",
        "Professional Microfibre Towel",
        "Seat Cover - Non Woven (3 Pcs)",
      ],
    },
    {
      question: "Technical Solutions",
      answer: [
        "Clean Plus - For Engines",
        "Cooling System Flush",
        "DC-5 - Fuel System Cleaner",
        "DIC - Diesel Injector Cleaner",
        "Diesel EISC",
        "DISC - Diesel Injection System Cleaner",
        "FR-VII - Premium Oil Treatment",
        "Fuel System Tune UP",
        "Gas UP - Fuel Injector Cleaner",
        "Intake Air System Cleaner",
        "Fuel Injection Tool - FIT",
        "Diesel Injection Tool - DIT",
        "Air Intake Cleaning Tool - 'S' Tool",
      ],
    },
    {
      question: "Aerosols",
      answer: [
        "All Purpose Shiner",
        "Anti-Rust Underbody Coating - Black",
        "Battery Terminal Protectant",
        "Brake Parts Cleaner",
        "Cabin Disinfectant",
        "Chain Cleaner",
        "Chain Lube",
        "Electrical Contact Cleaner",
        "Engine Lacquer Coating",
        "Frigi Foam - AC Vent Cleaner",
        "Instant Rust Off",
        "Premium Multipurpose Grease",
        "Silencer Coating - Black",
        "Silencer Coating - Zinc",
        "Silicone Spray",
        "Throttle Body & Intake Cleaner",
        "Upholstery Foam Cleaner",
        "Wheel Drum Paint",
        "Cavity Protection Spray",
      ],
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section className="ProductSection">
        <div className="overlay"></div>

        <div className="ProductContent text-center mt-5">
          <h1>Product Offering</h1>

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
