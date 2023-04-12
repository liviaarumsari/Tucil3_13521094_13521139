import { useState, useEffect } from "react";
import GraphVisualizer from "./GraphVisualizer.js";
import Card from "./Card.js";
import aStarSearch from "../lib/AStar.js";
import ucs from "../lib/UCS.js";
import GoogleMaps from "./GoogleMaps.js";

const ResultVisualizer = (props) => {
  const [path, setPath] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [isPathFound, setIsPathFound] = useState(false);
  const [maps, setMaps] = useState(false)
  const [routes,setRoutes] = useState([])
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
      const [prioqueue, count] = ucs(
        props.graph.adjMatrix,
        parseInt(props.startNode),
        parseInt(props.goalNode)
      );
      if (count !== -1) {
        const pathEdgeID = pathToEdgeID(prioqueue);
        setPath(pathEdgeID);
        setTotalDistance(count);
        setIsPathFound(true);
        setRoutes(prioqueue)
      }else{
        setIsPathFound(false)
      }
    } else if (props.algorithm === "A*") {
      const [pathRes, distRes] = aStarSearch(
        props.graph,
        parseInt(props.startNode),
        parseInt(props.goalNode)
      );
      if (pathRes !== null) {
        setIsPathFound(true);
        setRoutes(pathRes)
        const pathEdgeID = pathToEdgeID(pathRes);
        setPath(pathEdgeID);
        setTotalDistance(distRes);
      } else {
        setIsPathFound(false);
      }
    }
  }, [props.startNode, props.goalNode, props.algorithm,props.graph]);

  return (
    <Card>
      <label className="block text-gray-700 font-bold mb-2">
        {props.algorithm} Result
      </label>
      {isPathFound && (
        <>
          <GraphVisualizer mapInput={props.graph} path={path} />
          <div className="text-center mt-4">
            <p className="text-gray-700 font-bold mb-2">
              Total distance: {totalDistance}
            </p>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-main-primary hover:bg-main-secondary text-light-primary font-medium py-2 px-4 w-full shadow-md rounded cursor-pointer"
              onClick={() =>setMaps(true)}
            >
              Google Maps
            </button>
          </div>
        </>
      )}
      {!isPathFound &&  (
        <div className="text-center mt-4">
          <p className="text-gray-700 font-bold mb-2">There is no path found</p>
        </div>
      )}
      {maps && 
        <GoogleMaps startNode = {props.startNode} goalNode = {props.goalNode} adjMatrix = {props.content} routes={routes} />
      }

    </Card>
  );
};

export default ResultVisualizer
