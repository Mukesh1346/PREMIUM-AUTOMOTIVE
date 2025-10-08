import React from "react";
import "./brands.css";

export default function BrandsUs() {
  const brands = [
    { id: 1, name: "BAJAJ AUTO LIMITED" },
    { id: 2, name: "HELLA INDIA LIGHTING LIMITED" },
    { id: 3, name: "ISUZU MOTORS LIMITED" },
    { id: 4, name: "KTM INDIA" },
    { id: 5, name: "MARUTI SUZUKI INDIA LIMITED" },
    { id: 6, name: "TATA MOTORS LIMITED" },
    { id: 7, name: "TOYOTA KIRLOSKAR MOTOR" },
    { id: 8, name: "TRIUMPH MOTORCYCLES LTD" },
  ];

  return (
    <section className="BrandsSection">
      <div className="BrandsContent text-center">
        <h2 className="BrandsHeading mb-4">
          Our Esteemed <span className="HighlightText">OEM Partnerships</span>
        </h2>

        <ul className="BrandsList">
          {brands.map((brand) => (
            <li key={brand.id} className="BrandName">
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
