import React, { useContext, useState } from 'react'
import "@reach/combobox/styles.css";
import Context from '../../Context'
import Search from './Search'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {  faLocationArrow } from'@fortawesome/free-solid-svg-icons'
import Locate from './Locate'
import {
    GoogleMap,
    useLoadScript,
    // MarkerClusterer,
    //Marker,
    InfoWindow,
  } from "@react-google-maps/api";
  //import { formatRelative } from "date-fns";



  const mapContainerStyle = {
      height: "100vh",
      width: "50vw",
      };
  const options = {
      disableDefaultUI: true,
      zoomControl: true,
  };
  const center = {
      lat: 38.574077,
      lng: -121.485096,
  };

export default function Map(){
    const context = useContext(Context)
    const items = context.items

    const [ libraries ] = useState(['places']);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries,
        });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
        }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);
    const onLoad = infoWindow => {
      }
  
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";


    return(
        <div className='Map'>
            <h1>
                Find Produce{" "}
                <span role="img" aria-label="grapes">🍇</span>
                <span role="img" aria-label="lemon">🍋</span>
                <span role="img" aria-label="apple">🍎</span>
            </h1>

            <Locate panTo={panTo} />
            <Search panTo={panTo} />

            <GoogleMap 
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
                // onClick={onMapClick}
                onLoad={onMapLoad}
            >
            {items.map(i =>
                <InfoWindow
                    key = {i.lat}
                    onLoad={onLoad} 
                    position={{lat: i.lat, lng:i.lng}}
                >
                <div >
                <img  src={i.img_location} alt={i.name} width="40" height="40"/>
                    <h3>{i.name}</h3>
                </div>
                </InfoWindow>
            )}
            </GoogleMap>
        </div>
    )
}
