import React, { useContext, useState } from 'react'
import "@reach/combobox/styles.css";
import Context from '../../Context'
import SearchMap from './Search'
import { format } from "date-fns";
import Locate from './Locate'
import {
    GoogleMap,
    useLoadScript,
    InfoWindow,
  } from "@react-google-maps/api";

const mapContainerStyle = {
    height: "75vh",
    width: "70vh",
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
            <div className="flex-map-search">
                <Locate panTo={panTo} />
                <SearchMap panTo={panTo} />
            </div>
            <GoogleMap 
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
            {items.map(i =>
                <InfoWindow
                    key = {i.img_location}
                    onLoad={onLoad} 
                    position={{lat: parseFloat(i.lat), lng: parseFloat(i.lng)}}
                >
                <div >
                <img  src={i.img_location} alt={i.title} width="40" height="40"/>
                    <h3>{i.title}</h3>
                    <p>{format(Date.parse(i.date_modified), 'E MM/dd/yyyy')}</p>
                </div>
                </InfoWindow>
            )}
            </GoogleMap>
        </div>
    )
}


