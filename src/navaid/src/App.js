import "./App.css";
import React from "react";
import { useState } from "react";

var prioqueue = [
  {
    nodes : [],
    count : 0
  }
]

function getLastElement(obj){
  console.log(obj)
  return obj.nodes[obj.nodes.length-1]
}

function newQueue(node,count){
  prioqueue[0].nodes = node;
  prioqueue[0].count = count;
}

function getNodes(adjMatrix){
  let temp = prioqueue.shift();
  let length = temp.nodes.length
  let node = temp.nodes[length-1];
  for(let i = 0; i < adjMatrix.length;i++){
    if(parseInt(adjMatrix[node][i]) !== -1 && parseInt(adjMatrix[node][i])!== 0 && !temp.nodes.includes(i)){
      let nodes = temp.nodes.concat([i])
      let count = temp.count + parseInt(adjMatrix[node][i])
      let newObj = {nodes,count}
      prioqueue.push(newObj)
    }
  }
  prioqueue.sort((a,b) => a.count - b.count)
}

function ucs(adjMatrix, startNode, targetNode) {
  // Banyaknya nodes
  const numNodes = adjMatrix.length;
  let start = [startNode];
  newQueue(start,0);
  getNodes(adjMatrix);
  while(getLastElement(prioqueue[0]) !== targetNode && prioqueue.length !== 0){
    getNodes(adjMatrix)
  }
  console.log("Minimum path : ",prioqueue[0].count)
  return -1; // Return -1 if no path found
}
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
      ucs(lines,0,4);
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
