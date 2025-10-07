import React from 'react';
import './brands.css';
import brand1 from '../../Assets/Images/brand1.jpg'
import brand2 from '../../Assets/Images/brand2.jpg'
import brand3 from '../../Assets/Images/brand3.jpg'
import brand4 from '../../Assets/Images/brand4.jpg'
import brand5 from '../../Assets/Images/brand5.jpg'
import brand6 from '../../Assets/Images/brand6.png'
import brand7 from '../../Assets/Images/brand7.jpg'
import brand8 from '../../Assets/Images/brand8.jpg'
import brand9 from '../../Assets/Images/bajaj.png'
import brand10 from '../../Assets/Images/tata.jpeg'

export default function BrandsUs() {
  // Array of brands
  const brands = [
    { id: 1, name: "TOYOTA", image: brand1 },
    { id: 2, name: "MARUTI", image: brand4 },
    { id: 3, name: "KTM", image: brand3},
    { id: 4, name: "ISUZU", image: brand2 },
    { id: 5, name: "TRIUMPH", image:brand5 },
    { id: 6, name: "TATA MOTORS", image:brand10},
    { id: 7, name: "BAJAJ", image:brand9 },
    { id: 8, name: "HELLA", image:brand8 },
   
   
  ];

  return (
    <div className="d-flex">
      <div className="BrandsSection">
        <div className="w-100text-center">
          <h4 className="BrandsHeading mb-3">
            Our Esteemed OEM Partnerships
          </h4>

          {/* Brand images mapped dynamically */}
          <div className="BrandsImagesContainer">
            {brands.map((brand) => (
              <div key={brand.id} className="BrandCard">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="BrandImage"
                />
                <p className="BrandName">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
