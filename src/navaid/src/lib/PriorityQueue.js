/**
 * Element class for PriorityQueue
 */
class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

/**
 * PriorityQueue class
 */
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  /**
   * Insert element to priority queue in the correct location based on priority
   * @param {Number} element
   * @param {Number} priority
   */
  enqueue(element, priority) {
    var qElement = new QElement(element, priority);
    var contain = false;

    // iterating through the entire item array to add element at the correct location of the Queue
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(qElement);
    }
  }

  /**
   * Return element with the lowest priority
   * @returns QElement of the first element
   */
  dequeue() {
    if (!this.isEmpty()) return this.items.shift();
  }

  /**
   * Change priority of objElmt to newPriority
   * @param {Number} objElmt
   * @param {Number} newPriority
   */
  updates(objElmt, newPriority) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].element === objElmt) {
        this.items.splice(i, 1);
        break;
      }
    }
    this.enqueue(objElmt, newPriority);
  }

  /**
   * Check if PriorityQueue is empty
   * @returns true if empty
   */
  isEmpty() {
    return this.items.length === 0;
  }
}

export { PriorityQueue };
