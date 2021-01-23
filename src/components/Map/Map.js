import React, { useContext, useState } from 'react'
import "@reach/combobox/styles.css";
import Context from '../../Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faLocationArrow } from'@fortawesome/free-solid-svg-icons'
import {
    GoogleMap,
    useLoadScript,
    // MarkerClusterer,
    // Marker,
    // InfoWindow,
  } from "@react-google-maps/api";
  import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  //import { formatRelative } from "date-fns";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";




  //const libraries = ["places"];
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
    console.log(context)
    const [ libraries ] = useState(['places']);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries,
        });

  
    //const [selected, setSelected] = React.useState(null);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
        }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);
    // const onLoad = infoWindow => {
    //     console.log('infoWindow: ', infoWindow)
    //   }

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
             {/* {myLocations.map((loc)=>(
                 <InfoWindow position={loc} onLoad={onLoad}>
                 <div >
                 <h1>InfoWindow</h1>
                </div>
                </InfoWindow>

             )
             )} */}


        {/* {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
              <FontAwesomeIcon icon={faAppleAlt} />{" "}
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null} */}

            </GoogleMap>

        </div>
    )
}


function Locate({ panTo }) {
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
  
  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 38.574077, lng: () => -121.485096 },
        radius: 100 * 1000,
      },
      
    });
  
    const handleInput = (e) => {
      setValue(e.target.value);
    };
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        console.log(lat)
        console.log(results)
        console.log(address)
        panTo({ lat, lng });
      } catch (error) {
        console.log("😱 Error: ", error);
      }
    };
  
    return (
      <div className="search">
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search your location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }