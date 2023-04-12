import React, { useEffect } from "react";
import { useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import haversine from "haversine-distance";

const GoogleMaps = (props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCkEj30-VdzF1H9z1oGdkktZTrzDLrrl-Y",
    libraries: ["places"],
  });
  // Fungsi untuk mengatur map
  const [map, setMap] = useState(null);
  // Array of markers yang menandakan lokasi di map
  const [markers, setMarkers] = useState([]);
  // Array of polylinePoints yang menandakan rute mana yang akan dikunjungi
  const [polylinePoints, setPolylinePoints] = useState([]);
  // Menandakan jarak tempuh
  const [count, setCount] = useState(0);
  // Menandakan kemana map harus difokuskan
  const [mapCenter, setMapCenter] = useState({
    lat: -6.914744,
    lng: 107.60981,
  });
  // Bernilai true jika input berupa .txt
  const fromText = props.fromInput;
  useEffect(() => {
    if ((props.adjMatrix, props.routes)) {
      const adjMatrix = props.adjMatrix;
      const size = parseInt(adjMatrix[0]);
      const lines = props.adjMatrix;
      const routes = props.routes;
      const nodePoints = [];
      // Mencari titik koordinat - koordinat yang ada di .txt 
      for (let i = size + 1; i < lines.length; i++) {
        const lineParts = lines[i].split(":");
        const [x, y] = lineParts[1].split(" ").map((s) => parseFloat(s));
        nodePoints.push({ lat: x, lng: y });
      }
      // Menyatakan titik koordinat dalam bentuk Markers di GoogleMap
      let newMarkers = markers.concat(nodePoints);
      setMarkers(newMarkers);
      // Mengubah center map 
      setMapCenter(newMarkers[0]);
      let points = [];
      // Mencari rute yang dilalui
      for (let i = 0; i < routes.length; i++) {
        points.push(nodePoints[routes[i]]);
      }
      // Menandakan rute - rute yang sudah dilalui ke dalam polyline
      let newPoly = polylinePoints.concat(points);
      setPolylinePoints(newPoly);
    }
  }, []);

  const onMapClick = (e) => {
    // Map hanya bisa diclick jika input tidak dari .txt
    if (!fromText) {
      const newObj = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      // Kalau misalnya sudah ada minimal 1 titik, cari jaraknya 
      if (markers.length > 0) {
        let temp = markers[markers.length - 1];
        // Mencari jarak dengan menggunakan fungsi haversine
        let newCount = count + haversine(temp, newObj);
        // Set count atau jarak baru
        setCount(newCount);
      }
      // Menambahkan markers dan polyline
      setMarkers([...markers, newObj]);
      setPolylinePoints([...polylinePoints, newObj]);
    }
  };
  // Menandakan bahwa map masih diload
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!fromText && <p>Distance : {count} </p>}
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
