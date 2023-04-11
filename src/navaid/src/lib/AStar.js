import GraphMap from "./GraphMap.js";
import {QElement, PriorityQueue} from "./PriorityQueue.js";


export default function aStarSearch(graphMap, startNode, goalNode) {
  // Create a priority queue to store expanded nodes, sorted by f-score
  let openNodes = new PriorityQueue();
  openNodes.enqueue(new QElement(startNode, 0));
  console.log(openNodes);
  const nodeSize = graphMap.adjMatrix.length;

  const visited = new Set();
  const gScores = Array(nodeSize).fill(Infinity);
  const parents = Array(nodeSize).fill(undefined);
  let totalDistance = 0;

  // Loop until the priority enqueue is empty
  while (!openNodes.isEmpty()) {
    // Dequeue the node with the lowest f-score
    let currNode = openNodes.dequeue().element;

    // If we have reached the goal node, reconstruct and return the path
    if (currNode === goalNode) {
      const path = reconstructPath(parents, currNode);
      return [path, totalDistance];
    }

    console.log(currNode);

    // Loop through all adjacent nodes of the current node
    for (const adjNode of graphMap.getAdjacentNodes(currNode.element)) {
      console.log('adjNode:', adjNode);

      // Calculate the tentative g-score of the adjacent node
      const tentativeGScore =
        gScores[currNode] + graphMap.getEdgeDistance(currNode.element, adjNode);

      console.log(adjNode);
      console.log(goalNode);
      console.log(openNodes);

      if (tentativeGScore < gScores[adjNode]) {
        parents[adjNode] = currNode;
        gScores[adjNode] = tentativeGScore;
        const hScore = graphMap.getEuclideanDistance(adjNode.element, goalNode);
        if (openNodes.find(obj => obj.element === adjNode)) {
          openNodes.updates(adjNode, gScores[adjNode] + hScore);
        }
        else {
          openNodes.enqueue(new QElement(adjNode, gScores[adjNode] + hScore));
        }
      }
    }

    // Add the distance traveled along the edge to the total distance
    const parent = parents[currNode];
    if (parent !== undefined) {
      totalDistance += graphMap.getEdgeDistance(parent, currNode);
    }
  }

  // If we have exhausted all nodes without finding a path, return null
  return [null, null];
}

function reconstructPath(parents, currNode) {
  // Recursively reconstruct the path from the goal node to the start node
  if (parents[currNode] === undefined) {
    return [currNode];
  } else {
    const pathSoFar = reconstructPath(parents, parents[currNode]);
    pathSoFar.push(currNode);
    return pathSoFar;
  }
}
