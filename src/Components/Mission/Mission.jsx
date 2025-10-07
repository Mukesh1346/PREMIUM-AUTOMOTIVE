import React from 'react'
import './mission.css'

export default function Mission() {
  return (
    <div className=' d-flex '>
      <div className='MissionSection'>

        <div className='w-75 '>
          <h4 className='title  mb-3'>  Who We Are Today</h4>
          <h3 className='MissionHeading'>

            SSEPL is regarded as a preferred partner for
            OEMs and authorized workshops nationwide,
            offering a portfolio that is exclusively premium in
            both product and service standards. <br /> <br />





            {/* We are defined by: <br />
            • OEM Trust  Established relationships with
            leading manufacturers <br />
            • Nationwide Reach  Streamlined supply chain
            and service support across India  <br />
            • Premium Focus  Commitment to premium
            products, technologies, and services <br />
            • Excellence & Compliance  Adherence to OEM
            specifications and regulatory standards. <br /><br />
            Our Vision  <br />
            To remain India&apos;s most trusted partner in
            premium automotive care, setting benchmarks in
            quality, compliance, and innovation, while
            upholding a legacy of credibility and service. */}
          </h3>

          <b className='subheading'>We are defined by : </b>
          <ul className='ultext'>
            <li className='liText'>OEM Trust - Established relationships with leading manufacturers  </li>
            <li className='liText'>Nationwide Reach - Streamlined supply chain
            and service support across India </li>
            <li className='liText'>Premium Focus - Commitment to premium
            products, technologies, and services </li>
            <li className='liText'>Excellence & Compliance - Adherence to OEM
            specifications and regulatory standards. <br /><br />
            </li>
            
           
          </ul>
          <b className='subheading'>Our Vision </b>
            <p className='liText'> To remain India&apos;s most trusted partner in
            premium automotive care, setting benchmarks in
            quality, compliance, and innovation, while
            upholding a legacy of credibility and service.</p>

        </div>
      </div>

    </div>
  )
}
