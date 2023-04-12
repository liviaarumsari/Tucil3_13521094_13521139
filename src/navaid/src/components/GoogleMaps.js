import React, { useEffect } from "react";
import { useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const GoogleMaps = (props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCkEj30-VdzF1H9z1oGdkktZTrzDLrrl-Y",
    libraries: ["places"],
  });
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [clickedCoordinates, setClickedCoordinates] = useState([]);
  const [polylinePoints, setPolylinePoints] = useState([]);
  const [count,setCount] = useState(0)
  const [mapCenter, setMapCenter] = useState({
    lat: -6.914744,
    lng: 107.60981,
  });
  const fromText = props.fromInput;

  useEffect(() => {
    if ((props.adjMatrix, props.routes)) {
      const adjMatrix = props.adjMatrix;
      const size = parseInt(adjMatrix[0]);
      const lines = props.adjMatrix;
      const routes = props.routes;
      const nodePoints = [];
      for (let i = size + 1; i < lines.length; i++) {
        const lineParts = lines[i].split(":");
        const [x, y] = lineParts[1].split(" ").map((s) => parseFloat(s));
        nodePoints.push({ lat: x, lng: y });
      }
      let newMarkers = markers.concat(nodePoints);
      setMarkers(newMarkers);
      setMapCenter(newMarkers[0]);
      let points = [];

      for (let i = 0; i < routes.length; i++) {
        points.push(nodePoints[i]);
      }
      let newPoly = polylinePoints.concat(points);
      setPolylinePoints(newPoly);
    }
  }, []);

  const onMapClick = (e) => {
    console.log(fromText)
    if (!fromText) {
      const newObj = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setMarkers([...markers,newObj])
      setPolylinePoints([...polylinePoints, newObj]);
    }
  };
  const handleMarkerClicked = (e) => {
    const newObj = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    console.log("Masuk clicked");
    console.log(newObj);
    setPolylinePoints([...polylinePoints, newObj]);
  };
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div class="h-screen">
        <div class="h-full">
          <GoogleMap
            center={mapCenter}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onClick={onMapClick}
            onLoad={(map) => setMap(map)}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClicked}
              />
            ))}
            {polylinePoints.length > 1 && (
              <Polyline
                path={polylinePoints}
                options={{ strokeColor: "#000" }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default GoogleMaps;
