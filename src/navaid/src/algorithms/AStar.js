import Graph from "./Graph.js";

function aStarSearch(graph, startNode, goalNode) {
  // Create a priority queue to store expanded nodes, sorted by f-score
  const pq = new PriorityQueue((a, b) => a.fScore - b.fScore);

  const visited = new Set();
  const gScores = { [startNode]: 0 };
  const parents = {};

  // Add the starting node to the priority queue with an initial f-score of 0
  pq.enqueue({ node: startNode, fScore: 0 });

  // Loop until the priority queue is empty
  while (!pq.isEmpty()) {
    // Dequeue the node with the lowest f-score
    const { node: currNode } = pq.dequeue();

    // If we have reached the goal node, reconstruct and return the path
    if (currNode === goalNode) {
      return reconstructPath(parents, currNode);
    }

    // Add the current node to the set of visited nodes
    visited.add(currNode);

    // Loop through all adjacent nodes of the current node
    for (const adjNode of graph.getAdjacentNodes(currNode)) {
      // If the adjacent node has already been visited, skip it
      if (visited.has(adjNode)) {
        continue;
      }

      // Calculate the tentative g-score of the adjacent node
      const tentativeGScore = gScores[currNode] + graph.getEdgeDistance(currNode, adjNode);

      // If we have not seen this adjacent node before, add it to the priority queue
      if (!pq.contains({ node: adjNode })) {
        parents[adjNode] = currNode;
        gScores[adjNode] = tentativeGScore;
        const hScore = graph.getEuclideanDistance(adjNode, goalNode);
        pq.enqueue({ node: adjNode, fScore: tentativeGScore + hScore });
      } else if (tentativeGScore < gScores[adjNode]) {
        // If we have seen this adjacent node before, but this path has a lower g-score, update its f-score
        parents[adjNode] = currNode;
        gScores[adjNode] = tentativeGScore;
        const hScore = graph.getEuclideanDistance(adjNode, goalNode);
        pq.update({ node: adjNode, fScore: gScores[adjNode] + hScore });
      }
    }
  }

  // If we have exhausted all nodes without finding a path, return null
  return null;
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
