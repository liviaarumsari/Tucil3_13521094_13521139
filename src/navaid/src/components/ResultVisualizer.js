import { useState, useEffect } from "react";
import GraphVisualizer from "./GraphVisualizer.js";
import Card from "./Card.js";
import aStarSearch from "../lib/AStar.js";
import ucs from "../lib/UCS.js";

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
      console.log(props.graph.adjMatrix)
      // Calculate path and total distance using UCS algorithm
      // ...
      const [prioqueue,count] = ucs(props.graph.adjMatrix,props.startNode,props.goalNode)

      setPath(/* UCS path */);
      setTotalDistance(count);
    } else if (props.algorithm === "A*") {
      const [pathRes, distRes] = aStarSearch(props.graph, props.startNode, props.goalNode);
      const pathEdgeID = pathToEdgeID(pathRes);
      setPath(pathEdgeID);
      setTotalDistance(distRes);
    }
  }, [props.startNode, props.goalNode]);

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
