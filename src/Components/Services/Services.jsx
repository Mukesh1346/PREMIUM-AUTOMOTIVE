import React from "react";
import "./service.css";

export default function Service() {
  const Service = [
    { id: 1, name: "AC Evaporator Cleaning" },
    { id: 2, name: "AC Vent Cleaning " },
    { id: 3, name: "Alloy Wheel Cleaning" },
    { id: 4, name: "Antirust Under body coating" },
    { id: 5, name: "Cabin Disinfectant" },
    { id: 6, name: "Ceramic Coating " },
    { id: 5, name: "	Emblem / Chrome Cleaning" },
    { id: 7, name: "Eternashield Paint Protection Film - 10 Years " },
    { id: 8, name: "Glass Polish / Coating" },
    { id: 9, name: "Graphene Coating 10 H " },
    { id: 10, name: "Internal Panel Protection" },
    { id: 11, name: "Lumishield Paint Protection Film - 5 Years " },
    { id: 12, name: "Neoshield Paint Protection Film - 8 Years" },
    { id: 13, name: "Paint Protection Coating" },
    { id: 13, name: "Premium Interior Cleaning" },
    { id: 14, name: "Rat Repellent" },
    { id: 15, name: "Service Lubrication " },
    { id: 16, name: "Special Combo Services" },
    { id: 17, name: "UV Treatment" },
    { id: 18, name: "Waterless Wash (Dri Wash)" },
    { id: 19, name: "Wheel Drum Paint" },
  ];



  return (
    <section className="ServiceSection">
      <div className="ServiceContent text-center">
        <h2 className="ServiceHeading mb-4">
        Available <span className="ServiceText"> Services </span>
        </h2>
          
        <ul className="ServiceList">
          {Service.map((brand) => (
            <li key={brand.id} className="ServiceBrandName">
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
