import { useState, useEffect } from "react";
import GraphVisualizer from "./GraphVisualizer.js";
import Card from "./Card.js";
import aStarSearch from "../lib/aStar.js";

const ResultVisualizer = (props) => {
  const [path, setPath] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);

  const pathToEdgeID = (pathArr) => {
    return pathArr.reduce((acc, curr, index, arr) => {
      if (index === 0) {
        return acc;
      }

      const prev = arr[index - 1];
      const str = `${prev}-${curr}`;

      return [...acc, str];
    }, []);
  };

  useEffect(() => {
    if (props.algorithm === "UCS") {
      // Calculate path and total distance using UCS algorithm
      // ...
      setPath(/* UCS path */);
      setTotalDistance(/* UCS total distance */);
    } else if (props.algorithm === "A*") {
      const [pathRes, distRes] = aStarSearch(props.graph, props.startNode, props.goalNode);
      console.log(pathRes);
      console.log(distRes);
      setPath(pathToEdgeID(pathRes));
      setTotalDistance(distRes);
    }
  }, [props.algorithm, props.startNode, props.goalNode, props.graph]);

  return (
    <Card>
      <label className="block text-gray-700 font-bold mb-2">
        {props.algorithm} Result
      </label>
      <GraphVisualizer mapInput={props.graph} path={path} />
      <div className="text-center mt-4">
        <p className="text-gray-700 font-bold mb-2">
          Total distance: {totalDistance}
        </p>
      </div>
    </Card>
  );
};

export default ResultVisualizer;
