import React from 'react'
import "@reach/combobox/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faLocationArrow } from'@fortawesome/free-solid-svg-icons'


//set map to user location
export default function Locate({ panTo }) {
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
            
          );
        }}
      >
         Locate{" "}<FontAwesomeIcon icon={faLocationArrow} />
      </button>
    );
  }