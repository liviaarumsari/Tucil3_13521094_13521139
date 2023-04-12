import React, { useState } from "react";
import GraphVisualizer from "./GraphVisualizer.js";
import Point from "../lib/Point.js";
import GraphMap from "../lib/GraphMap.js";
import Card from "./Card.js";

function GraphChooser(props) {
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showGraphVisualizer, setShowGraphVisualizer] = useState(false);

  const handleFileUpload = (event) => {
    if (!event.target.files.length) {
      setErrorMessage("No file selected.");
      return;
    }
    
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
        props.setContent(lines)
        const size = parseInt(lines[0]);
        const adjMatrix = [];
        for (let i = 1; i <= size; i++) {
          adjMatrix.push(
            lines[i]
              .trim()
              .split(" ")
              .map((x) => parseInt(x))
          );
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
       
        let mapInput = new GraphMap(adjMatrix, nodeNames, nodePoints);
        props.onFileUpload(mapInput);
        setFileContent(mapInput);
       
        setShowGraphVisualizer(true);
      };
      reader.readAsText(file);
    }
  };
  return (
    <Card>
      <div className="flex flex-col">
        <label className="text-lg font-semibold mb-2">Upload Files</label>
        <label className="text-sm font-light text-gray-500 mb-4">
          Choose a file to upload. Only .txt files are supported.
        </label>
      </div>
      <div className="mb-4">
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="hidden"
          id="fileInput"
        />
        <button
          onClick={() => document.getElementById("fileInput").click()}
          className="bg-main-primary hover:bg-main-secondary text-light-primary font-medium py-2 px-4 shadow-md rounded cursor-pointer"
        >
          Choose File
        </button>
        <div className="ml-4 inline-block">{fileName}</div>
      </div>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {showGraphVisualizer && (
        <div className="flex flew-row">
        <GraphVisualizer mapInput={fileContent} path={[]} />
        <div className="mx-8 w-48">
          <label className="block text-gray-700 font-bold mb-2">Nodes:</label>
          <ul className="list-disc list-inside flex flex-wrap">
            {fileContent.nodeNames.map((node, index) => (
              <li
                key={index}
                className="text-gray-700 text-sm list-none"
              >
                {index + 1}. {node}
              </li>
            ))}
          </ul>
        </div>
        </div>
      )}
    </Card>
  );
}

export default GraphChooser;
