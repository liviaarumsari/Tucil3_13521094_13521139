import { PriorityQueue } from "./PriorityQueue.js";

/**
 *
 * @param {GraphMap} graphMap
 * @param {Number} startNode
 * @param {Number} goalNode
 * @returns path and total distance found based on A* search
 */
export default function aStarSearch(graphMap, startNode, goalNode) {
  // Create a priority queue to store expanded nodes, sorted by f-score
  let openNodes = new PriorityQueue();
  openNodes.enqueue(startNode, 0);
  console.log(openNodes);
  const nodeSize = graphMap.adjMatrix.length;

  const gScores = Array(nodeSize).fill(Number.MAX_SAFE_INTEGER);
  const parents = Array(nodeSize).fill(undefined);

  gScores[startNode] = 0;

  // Loop until the priority enqueue is empty
  while (!openNodes.isEmpty()) {
    // Dequeue the node with the lowest f-score
    let currNode = openNodes.dequeue().element;

    // If we have reached the goal node, reconstruct and return the path
    if (currNode === goalNode) {
      const path = reconstructPath(parents, currNode);
      const totalDistance = countTotalDistance(path, graphMap);
      console.log(parents);
      console.log(path);
      console.log(totalDistance);
      return [path, totalDistance];
    }

    // Loop through all adjacent nodes of the current node
    for (const adjNode of graphMap.getAdjacentNodes(currNode)) {
      console.log("adjNode:", adjNode);

      // Calculate the tentative g-score of the adjacent node
      const tentativeGScore =
        gScores[currNode] + graphMap.getEdgeDistance(currNode, adjNode);

      if (tentativeGScore < gScores[adjNode]) {
        parents[adjNode] = currNode;
        gScores[adjNode] = tentativeGScore;
        const hScore = graphMap.getEuclideanDistance(adjNode, goalNode);
        if (openNodes.items.find((obj) => obj.element === adjNode)) {
          openNodes.updates(adjNode, gScores[adjNode] + hScore);
        } else {
          openNodes.enqueue(adjNode, gScores[adjNode] + hScore);
        }
      }
    }
  }

  // If we have exhausted all nodes without finding a path, return null
  return [null, null];
}

/**
 *
 * @param {Number[]} parents Array of parents every node
 * @param {Number} currNode
 * @returns Array of nodes to be visited to reach the current node
 */
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

/**
 *
 * @param {Number[]} path
 * @param {GraphMap} graphMap
 * @returns total distance from path
 */
function countTotalDistance(path, graphMap) {
  let distance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    distance += graphMap.getEdgeDistance(path[i], path[i + 1]);
  }
  return distance;
}
