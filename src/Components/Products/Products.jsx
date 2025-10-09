import React from "react";
import "./product.css";

export default function Product() {
  const ProductCar = [
    { id: 1, name: "Alloy Wheel Cleaner" },
    { id: 2, name: "Antirust Underbody Coating - Black" },
    { id: 3, name: "Antirust Underbody Coating - Transparent" },
    { id: 4, name: "Car Care Kit" },
    { id: 5, name: "Car Polish" },
    { id: 6, name: "Car Wax Kit" },
    { id: 7, name: "Ceramic Coating 9 H" },
    { id: 8, name: "Ceramic Details Spray" },
    { id: 9, name: "Dashboard Polish" },
    { id: 10, name: "D'greaser" },
    { id: 11, name: "Door Edge Guard" },
    { id: 12, name: "Driwash n Guard" },
    { id: 13, name: "Glass Cleaner" },
    { id: 14, name: "Graphene Coating 10 H" },
    { id: 15, name: "Graphene Details Spray" },
    { id: 16, name: "Head Light Protection Film (250 Sq Ft)" },
    { id: 17, name: "Head Light Protectactant" },
    { id: 18, name: "Interior Cleaner" },
    { id: 19, name: "Interior Wash" },
    { id: 20, name: "Multipurpose Shiner" },
    { id: 21, name: "Multipurpose Cleaner" },
    { id: 22, name: "Odor Nutrilizer" },
    { id: 23, name: "Professional Microfibre Towels" },
    { id: 24, name: "Seat Cover Non Wooven 3 Pcs" },
    { id: 25, name: "Spray n Wipe" },
    { id: 26, name: "Tire Shiner" },
    { id: 27, name: "Wash & Shine Shampoo" },
    { id: 28, name: "Windshield Washer" },
  ];


  const TechnicalProducts = [
    { id: 1, name: "Clean Plus - For Engines" },
    { id: 2, name: "Cooling System Flush" },
    { id: 3, name: "DC-5 - Fuel System Cleaner" },
    { id: 4, name: "DIC - Diesel Injector Cleaner" },
    { id: 5, name: "Diesel EISC" },
    { id: 6, name: "DISC - Diesel Injection System Cleaner" },
    { id: 7, name: "FR-VII - Premium Oil Treatment" },
    { id: 8, name: "Fuel System Tune UP" },
    { id: 9, name: "Gas UP - Fuel Injector Cleaner" },
    { id: 10, name: "Intake Air System Cleaner" },
  ];

  const AerosolProducts = [
    { id: 1, name: "All Purpose Shiner" },
    { id: 2, name: "Anti-Rust Underbody Coating - Black" },
    { id: 3, name: "Battery Terminal Protectant" },
    { id: 4, name: "Brake Parts Cleaner" },
    { id: 5, name: "Cabin Disinfectant" },
    { id: 6, name: "Chain Cleaner" },
    { id: 7, name: "Chain Lube" },
    { id: 8, name: "Electrical Contact Cleaner" },
    { id: 9, name: "Engine Lacquer Coating" },
    { id: 10, name: "Frigi Foam - AC Vent Cleaner" },
    { id: 11, name: "Instant Rust Off" },
    { id: 12, name: "Premium Multipurpose Grease" },
    { id: 13, name: "Silencer Coating - Black" },
    { id: 14, name: "Silencer Coating - Zinc" },
    { id: 15, name: "Silicone Spray" },
    { id: 16, name: "Throttle Body & Intake Cleaner" },
    { id: 17, name: "Upholstery Foam Cleaner" },
  ];
  



  return (
   <>
    <section className="ProductSection">
      
      <div className="ProductContent text-center">
           

        <div>
          <h2 className="ProductHeading mb-4">
            <span className="ProductText">  Car Care 
            </span>
          </h2>

          <ul className="ProductList">
            {ProductCar.map((brand) => (
              <li key={brand.id} className="ProductBrandName">
                {brand.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="ProductHeading mb-4">
            <span className="ProductText"> Technical 
            </span>
          </h2>

          <ul className="ProductList">
            {TechnicalProducts.map((brand) => (
              <li key={brand.id} className="ProductBrandName">
                {brand.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="ProductHeading mb-4">
            <span className="ProductText"> Aerosol 

            </span>
          </h2>

          <ul className="ProductList">
            {AerosolProducts.map((brand) => (
              <li key={brand.id} className="ProductBrandName">
                {brand.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
   </>
  );
}
