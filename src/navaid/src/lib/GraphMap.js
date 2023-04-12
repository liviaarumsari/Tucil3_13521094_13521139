/**
 * Class to represent map
 */
class GraphMap {
  /**
   *
   * @param {Number[][]} adjMatrix Adjacency matrix of graph
   * @param {string[]} nodeNames Array of node names
   * @param {Point} nodePoints Array of node coordinates
   */
  constructor(adjMatrix, nodeNames, nodePoints) {
    this.adjMatrix = adjMatrix;
    this.nodeNames = nodeNames;
    this.nodePoints = nodePoints;
  }

  getNodeName(nodeIndex) {
    return this.nodeNames[nodeIndex];
  }

  /**
   *
   * @param {Number} nodeIndex 
   * @returns Array of node index adjacent to nodeIndex
   */
  getAdjacentNodes(nodeIndex) {
    console.log(this.adjMatrix);
    console.log(nodeIndex);
    console.log(this.adjMatrix[nodeIndex]);
    const adjacentNodes = [];

    for (let i = 0; i < this.adjMatrix[nodeIndex].length; i++) {
      if (this.adjMatrix[nodeIndex][i] > 0) {
        adjacentNodes.push(i);
      }
    }

    return adjacentNodes;
  }
  /**
   * 
   * @param {Number} nodeIndex1 
   * @param {Number} nodeIndex2 
   * @returns edge weight between two node
   */
  getEdgeDistance(nodeIndex1, nodeIndex2) {
    return this.adjMatrix[nodeIndex1][nodeIndex2];
  }

  /**
   * 
   * @param {Number} nodeIndex1 
   * @param {Number} nodeIndex2 
   * @returns euclidean distance between two node
   */
  getEuclideanDistance(nodeIndex1, nodeIndex2) {
    return this.nodePoints[nodeIndex1].distanceTo(this.nodePoints[nodeIndex2]);
  }
}

export default GraphMap;
