import "./App.css";
import React from "react";
import { useState } from "react";
import ucs from "./UCS";

function App() {
  
  const [fileContent, setFileContent] = useState(null);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split(/\r?\n/); // Split by new lines
      // const filteredLines = lines.filter(line => line.trim() !== " "); // Filter out empty lines
      for(let i = 0;i < lines.length;i++){
        let temp = lines[i].split(" ");
        lines[i] = temp
      }      
      setFileContent(lines);
      let answer = ucs(lines,0,1);
      let routes = answer[0]
      if(answer[1] === -1){
        setFileContent("Tidak ada lintasan yang menhubungkan")
      }else{
        setFileContent("Jarak minum terdekat : " + answer[1] + "\nRute yang ditempuh : " + routes[0].nodes)
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {fileContent && (
        <div>
          <h3>File Contents:</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
