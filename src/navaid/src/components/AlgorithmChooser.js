import React, { useState, useEffect } from "react";
import Card from "./Card.js";
import ResultVisualizer from "./ResultVisualizer.js";

const AlgorithmChooser = (props) => {
  const [isUCS, setIsUCS] = useState(false);
  const [isAStar, setIsAStar] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [startNode, setStartNode] = useState("");
  const [goalNode, setGoalNode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUCSChange = () => {
    setIsUCS(!isUCS);
  };

  const handleAStarChange = () => {
    setIsAStar(!isAStar);
  };

  const handleStartNodeChange = (event) => {
    setStartNode(event.target.value);
  };

  const handleGoalNodeChange = (event) => {
    setGoalNode(event.target.value);
  };

  const handleSearch = () => {
    setIsSearching(true);
  };

  useEffect(() => {
    if (isSearching) {
      if (!props.mapInput) {
        setErrorMessage("Please upload a map.");
      } else if (!isUCS && !isAStar) {
        setErrorMessage("Please select at least one algorithm.");
      } else if (!startNode) {
        setErrorMessage("Please enter a starting node.");
      } else if (!goalNode) {
        setErrorMessage("Please enter a goal node.");
      }
    } else {
      setErrorMessage("");
    }
  }, [isUCS, isAStar, props.mapInput, startNode, goalNode, isSearching]);

  return (
    <div>
      <Card>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Algorithms
          </label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isUCS}
                onChange={handleUCSChange}
              />
              <span className="ml-2">UCS</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isAStar}
                onChange={handleAStarChange}
              />
              <span className="ml-2">A*</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Choose nodes
          </label>
          <div className="flex flex-row">
            <div className="flex flex-col mr-8">
              <label htmlFor="startNode">Starting node</label>
              <select
                id="startNode"
                className="form-select rounded-l-md flex-1 mr-2 px-4 py-2"
                value={startNode}
                onChange={handleStartNodeChange}
              >
                {props.mapInput && props.mapInput.adjMatrix.map((row, rowIndex) => (
                  <option key={`startNode-${rowIndex}`} value={rowIndex}>
                    {rowIndex+1}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="goalNode">Goal node</label>
              <select
                id="goalNode"
                className="form-select rounded-r-md flex-1 ml-2 px-4 py-2"
                value={goalNode}
                onChange={handleGoalNodeChange}
              >
                {props.mapInput && props.mapInput.adjMatrix.map((row, rowIndex) => (
                  <option key={`startNode-${rowIndex}`} value={rowIndex}>
                    {rowIndex+1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          className="bg-main-primary hover:bg-main-secondary text-light-primary font-medium py-2 px-4 w-full shadow-md rounded cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
        {errorMessage && (
          <label className="text-red-500 mb-4 text-sm !important">
            {errorMessage}
          </label>
        )}
      </Card>
      {isSearching && isUCS && (
        <ResultVisualizer
          algorithm={"UCS"}
          startNode={startNode - 1}
          goalNode={goalNode - 1}
          graph={props.mapInput}
        />
      )}
      {isSearching && isAStar && (
        <ResultVisualizer
          algorithm={"A*"}
          startNode={startNode - 1}
          goalNode={goalNode - 1}
          graph={props.mapInput}
        />
      )}
    </div>
  );
};

export default AlgorithmChooser;
