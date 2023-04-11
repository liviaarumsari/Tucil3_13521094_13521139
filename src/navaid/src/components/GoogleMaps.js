import React from 'react'
import { useState, useRef } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  Polyline,
} from "@react-google-maps/api";

import  {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
const GoogleMaps = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCkEj30-VdzF1H9z1oGdkktZTrzDLrrl-Y",
        libraries: ["places"],
      });
      const [map, setMap] = useState(/** @type google.maps.Map */ (null));
      const [mapCenter, setMapCenter] = useState({
        lat: -6.914744,
        lng: 107.60981,
      });
      const [latLng, setLatLng] = useState({ lat: null, lng: null });
      const [endLatLng, setEndLatLng] = useState({ lat: null, lng: null });
      const originRef = useRef();
      const destiantionRef = useRef();
    
      if (!isLoaded) {
        return <div>Loading...</div>;
      }
    
      async function calculateRoute() {
        if (originRef.current.value === "" || destiantionRef.current.value === "") {
          return;
        }
        try {
          const results = await geocodeByAddress(originRef.current.value);
          const latLngOrigin = await getLatLng(results[0]);
          setLatLng(latLngOrigin)
          const results2 = await geocodeByAddress(destiantionRef.current.value)
          const latLngDest = await getLatLng(results2[0])
          setEndLatLng(latLngDest)
          setMapCenter(latLngOrigin)
        } catch (error) {
          console.error("Error fetching geolocation:", error);
        }
      }
      return (
        <div>
          <Autocomplete>
            <input
              type="text"
              placeholder="Origin"
              style={{ width: "100%" }}
              ref={originRef}
            />
          </Autocomplete>
          <Autocomplete>
            <input
              type="text"
              placeholder="Destination"
              style={{ width: "100%" }}
              ref={destiantionRef}
            />
          </Autocomplete>
          <button type="submit" onClick={calculateRoute}>
            Calculate
          </button>
          <div class="h-screen">
            <div class="h-full">
            <GoogleMap
              center={mapCenter}
              zoom={15}
              mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={map => setMap(map)}
            >
              <Marker position={latLng} />
              <Marker position={endLatLng} />
              <Polyline path={[latLng,endLatLng]} options={{
                strokeColor:"#000"
              }} />
            </GoogleMap>
            </div>
          </div>
        </div>
      );
}

export default GoogleMaps
