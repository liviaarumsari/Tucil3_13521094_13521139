import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar.js";
import GoogleMaps from "./components/GoogleMaps.js";
import GraphChooser from "./components/GraphChooser.js";
import AlgorithmChooser from "./components/AlgorithmChooser.js";

function App() {
  const [activePage, setActivePage] = useState("File Input");
  const [mapInput, setMapInput] = useState(null);
  const [content, setContent] = useState(null)

  const onChoosePageHandler = (page) => {
    setActivePage(page);
  }

  const fileUploadHandler = (newMap) => {
    setMapInput(newMap);
  }

  const fileContent = (newContent) =>{
    setContent(newContent)
  }

  return (
    <div className="bg-light-primary min-h-screen w-screen">
      <Navbar onChoosePage={onChoosePageHandler} />
      {activePage === "File Input" &&
        <>
          <GraphChooser onFileUpload={fileUploadHandler} setContent = {fileContent} />
          <AlgorithmChooser mapInput={mapInput} content = {content}/>
        </>
      }
      {activePage !== "File Input" &&
        <GoogleMaps fromInput={false} />
      }
    </div>
  );
}

export default App;
