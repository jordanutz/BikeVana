import React from 'react';
import './BikeModule.css'

const BikeModule = (props) => {
  
  return (
    <div className="bike-module">
      <div className="bikesearch-image">
        <img src={props.image} alt="Searched Bike" />
      </div>
      <div className="bikedmodule-color">
        <h1>{props.name}</h1>
        <div className="bike-details">
          <h2>{props.brand}</h2>
          <h3>${props.price}</h3>
        </div>
      </div>
    </div>
  )
}

export default BikeModule;
