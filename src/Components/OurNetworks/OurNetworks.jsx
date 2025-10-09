import React from 'react'

import map from "../../Assets/Images/UpdatedMap.png"
import './map.css'

export default function OurNetworks() {
  return (
    <>
    <div className='MapContainerSec py-5'>
        <div className='MapContainer'>
            {/* <div className='text-light NetworkTitle'>Our Networks</div> */}
            
      <img src={map} alt="map" className='MapImg' />
        </div>
    </div>
    </>
  )
}
