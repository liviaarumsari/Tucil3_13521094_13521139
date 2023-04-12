import React from "react";
import { useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const GoogleMaps = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCkEj30-VdzF1H9z1oGdkktZTrzDLrrl-Y",
    libraries: ["places"],
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [markers, setMarkers] = useState([]);
  const [fileName, setFileName] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: -6.914744,
    lng: 107.60981,
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const fileNameParts = file.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1];
    if (fileExtension !== "txt") {
      setErrorMessage("Invalid file type. Please upload a .txt file.");
    } else {
      setFileName(file.name);
      setErrorMessage("");
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        const lines = contents.split(/\r?\n/); // Split by new lines
        const size = parseInt(lines[0]);
        const nodePoints = [];
        for (let i = size + 1; i < lines.length; i++) {
          const lineParts = lines[i].split(":");
          const [x, y] = lineParts[1].split(" ").map((s) => parseFloat(s));
          nodePoints.push({ lat: x, lng: y });
        }
        let newMarkers = markers.concat(nodePoints)
        console.log(newMarkers)
        setMarkers(newMarkers)
        setCoordinates(nodePoints);
      };
      reader.readAsText(file);
    }
  };

  const [polylinePoints, setPolylinePoints] = useState([]);

  const onMapClick = (e) => {
    const newObj = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkers([...markers, newObj]);
    setPolylinePoints([...polylinePoints, newObj]);
  };
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload}></input>
      {errorMessage && <div>Error...</div>}
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
