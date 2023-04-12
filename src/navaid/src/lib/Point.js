class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  /**
   * Euclidean distance between two Points
   * @param {Point} otherPoint 
   * @returns 
   */
  distanceTo(otherPoint) {
    const dx = otherPoint.x - this.x;
    const dy = otherPoint.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

export default Point;