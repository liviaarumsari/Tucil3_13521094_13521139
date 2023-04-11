import React from "react";
import { useState } from "react";
import ucs from "./lib/UCS.js";
import Point from "./lib/Point.js";
import GraphMap from "./lib/GraphMap.js";
import GraphVisualizer from "./components/GraphVisualizer.js";
import Navbar from "./components/Navbar.js";
import GoogleMaps from "./components/GoogleMaps.js";

function App() {
  const [fileContent, setFileContent] = useState(null);
  const [mapInput, setMapInput] = useState(null);

  const path = ["0-1", "3-4"];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split(/\r?\n/); // Split by new lines
      const size = parseInt(lines[0]);
      const adjMatrix = [];
      for (let i = 1; i <= size; i++) {
        adjMatrix.push(lines[i].split(" ").map((x) => parseInt(x)));
      }
      const nodeNames = [];
      const nodePoints = [];
      for (let i = size + 1; i < lines.length; i++) {
        const lineParts = lines[i].split(":");
        const simpul = lineParts[0].trim();
        const [x, y] = lineParts[1].split(" ").map((s) => parseInt(s));
        nodeNames.push(simpul);
        nodePoints.push(new Point(x, y));
      }
      console.log(adjMatrix);
      console.log(nodeNames);
      console.log(nodePoints);
      let tempMap = new GraphMap(adjMatrix, nodeNames, nodePoints);
      setMapInput(tempMap);
      setFileContent(adjMatrix);
      let answer = ucs(adjMatrix, 0, 1);
      let routes = answer[0];
      if (answer[1] === -1) {
        setFileContent("Tidak ada lintasan yang menhubungkan");
      } else {
        setFileContent(
          "Jarak minum terdekat : " +
            answer[1] +
            "\nRute yang ditempuh : " +
            routes[0].nodes
        );
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-light-primary">
      <Navbar/>
      <input type="file" onChange={handleFileUpload} />
      {fileContent && (
        <div>
          <h3 class="font-sans text-dark-primary">File Contents:</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
      {mapInput && (
        <div style={{ width: "50vw", height: "50vh" }}>
          <GraphVisualizer mapInput={mapInput} path={path} />
        </div>
      )}
      <GoogleMaps />
    </div>
  );
}

export default App;
