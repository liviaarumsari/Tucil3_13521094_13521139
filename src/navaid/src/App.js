import React from "react";
import { useState } from "react";
import ucs from "./lib/UCS.js";
import Point from "./lib/Point.js";
import GraphMap from "./lib/GraphMap.js";
import GraphVisualizer from "./components/GraphVisualizer.js";
import Navbar from "./components/Navbar.js";
import GoogleMaps from "./components/GoogleMaps.js";
import GraphChooser from "./components/GraphChooser.js";
import AlgorithmChooser from "./components/AlgorithmChooser.js";

function App() {
  const [mapInput, setMapInput] = useState(null);

  const path = ["0-1", "3-4"];

  const fileUploadHandler = (newMap) => {
    setMapInput(newMap);
  }

  // const handleFileUpload = (event) => {
  //     setFileContent(adjMatrix);
  //     let answer = ucs(adjMatrix, 0, 1);
  //     let routes = answer[0];
  //     if (answer[1] === -1) {
  //       setFileContent("Tidak ada lintasan yang menhubungkan");
  //     } else {
  //       setFileContent(
  //         "Jarak minum terdekat : " +
  //           answer[1] +
  //           "\nRute yang ditempuh : " +
  //           routes[0].nodes
  //       );
  //     }
  //   };
  //   reader.readAsText(file);
  // };

  return (
    <div className="bg-light-primary">
      <Navbar/>
      <GraphChooser onFileUpload={fileUploadHandler}/>
      {mapInput && <AlgorithmChooser mapInput={mapInput}/>}
      <GoogleMaps />
    </div>
  );
}

export default App;
